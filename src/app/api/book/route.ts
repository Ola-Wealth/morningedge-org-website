import { NextResponse } from "next/server";
import {
  BANK,
  CONSULTATION,
  bankPublished,
  describeSlot,
  formatNaira,
  isWeekendDate,
  makeReference,
  slotTo24h,
} from "@/lib/booking";
import { mailConfigured, sendMail } from "@/lib/mailer";
import { record } from "@/lib/bookingSheet";
import { site } from "@/lib/site";

/**
 * Booking requests.
 *
 * A training is an enquiry: it goes to the same sheet as the contact form and
 * is quoted after scoping.
 *
 * A consultation is held against a payment reference. The slot is reserved,
 * the client transfers the fee into the MorningEdge account quoting that
 * reference, and the meeting link is sent by hand once the credit lands.
 */

const CONTACT_WEBHOOK =
  process.env.GOOGLE_SHEET_WEBHOOK_URL ??
  process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL ??
  "";

type Payload = Record<string, string>;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ result: "error", error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ result: "success" });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const company = (body.company || "").trim();
  const bookingType = (body.bookingType || "").trim();
  const reason = (body.reason || "").trim();
  const role = (body.role || "").trim();
  const attendees = (body.attendees || "").trim();
  const attendeeRoles = (body.attendeeRoles || "").trim();
  const format = (body.format || "").trim();
  const outcome = (body.outcome || "").trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const typeOk = bookingType === "Training" || bookingType === "Consultation";
  if (!name || !company || !reason || !emailOk || !typeOk) {
    return NextResponse.json(
      { result: "error", error: "Please complete the required fields with a valid email." },
      { status: 422 }
    );
  }

  if (bookingType === "Consultation") {
    return consultation({
      name, email, company, role, attendees, attendeeRoles, format, reason, outcome,
      date: (body.date || "").trim(),
      time: (body.time || "").trim(),
    });
  }

  return training({
    name, email, company, role, attendees, attendeeRoles, format, reason, outcome,
    timing: (body.timing || "").trim(),
  });
}

type Common = {
  name: string; email: string; company: string; role: string;
  attendees: string; attendeeRoles: string; format: string;
  reason: string; outcome: string;
};

async function consultation(d: Common & { date: string; time: string }) {
  if (!slotTo24h(d.time) || !/^\d{4}-\d{2}-\d{2}$/.test(d.date)) {
    return NextResponse.json(
      { result: "error", error: "Please choose a date and a time." },
      { status: 422 }
    );
  }
  if (isWeekendDate(d.date)) {
    return NextResponse.json(
      { result: "error", error: "Consultations run Monday to Friday. Please pick a weekday." },
      { status: 422 }
    );
  }

  const reference = makeReference();
  const when = describeSlot(d.date, d.time);
  const amount = CONSULTATION.amountNaira;

  await record({
    reference,
    name: d.name,
    email: d.email,
    company: d.company,
    role: d.role,
    attendees: d.attendees,
    attendeeRoles: d.attendeeRoles,
    format: d.format,
    date: d.date,
    time: d.time,
    reason: d.reason,
    outcome: d.outcome,
    amountNaira: amount,
    status: "Awaiting payment",
  });

  if (mailConfigured) {
    const toOla = [
      "Consultation slot requested. Payment not yet confirmed.",
      "",
      `When:      ${when}`,
      `Who:       ${d.name}${d.role ? `, ${d.role}` : ""}`,
      `Firm:      ${d.company}`,
      `Email:     ${d.email}`,
      `Joining:   ${d.attendees || "Not provided"}`,
      `Roles:     ${d.attendeeRoles || "Not provided"}`,
      `Format:    ${d.format || "Not provided"}`,
      `Fee:       ${formatNaira(amount)}`,
      `Reference: ${reference}`,
      "",
      "What they want to work through:",
      d.reason,
      "",
      "What should be true afterwards:",
      d.outcome || "Not provided",
      "",
      "Next: confirm the transfer, create the meeting, and send them the link.",
    ].join("\n");

    try {
      await sendMail({
        to: site.email,
        subject: `Consultation requested: ${d.name} (${d.company}) ${when}`,
        text: toOla,
        replyTo: d.email,
      });
    } catch {
      /* The request stands even when the notification fails. */
    }

    const toClient = [
      `Hello ${d.name},`,
      "",
      `Your consultation is pencilled in for ${when}, for ${CONSULTATION.minutes} minutes.`,
      "",
      `To confirm it, transfer ${formatNaira(amount)} quoting this reference:`,
      "",
      `    ${reference}`,
      "",
      bankPublished
        ? [`    ${BANK.name}`, `    ${BANK.accountName}`, `    ${BANK.number}`].join("\n")
        : "    Account details follow in a separate message.",
      "",
      "The reference is how the payment is matched to your booking, so please include it.",
      "Once the transfer lands, the meeting link comes back to you by email.",
      "",
      "If you need a different time, reply to this message.",
      "",
      "Olamilekan Ekundayo",
      "MorningEdge Systems",
      site.phone,
    ].join("\n");

    try {
      await sendMail({
        to: d.email,
        subject: `Your consultation, ${when}. Reference ${reference}`,
        text: toClient,
        replyTo: site.email,
      });
    } catch {
      /* Shown on screen regardless. */
    }
  }

  return NextResponse.json({
    result: "success",
    reference,
    when,
    amountNaira: amount,
    bank: bankPublished ? BANK : null,
  });
}

async function training(d: Common & { timing: string }) {
  if (!CONTACT_WEBHOOK) {
    return NextResponse.json(
      { result: "error", error: "The booking form is not connected yet." },
      { status: 500 }
    );
  }

  const message = [
    "Booking type: Training",
    `Requested by: ${d.name}${d.role ? `, ${d.role}` : ""}`,
    `Organisation: ${d.company}`,
    "",
    `How many attend: ${d.attendees || "Not provided"}`,
    `Which function: ${d.attendeeRoles || "Not provided"}`,
    `Format: ${d.format || "Not provided"}`,
    `Preferred timing: ${d.timing || "Not provided"}`,
    `What should be true afterwards: ${d.outcome || "Not provided"}`,
    "",
    "Why this training:",
    d.reason,
  ].join("\n");

  const payload = {
    timestamp: new Date().toISOString(),
    form: "booking",
    name: d.name,
    email: d.email,
    organization: d.company,
    service_area: "Training",
    challenge: d.role,
    message,
    role: d.role,
    bookingType: "Training",
    attendees: d.attendees,
    attendeeRoles: d.attendeeRoles,
    format: d.format,
    timing: d.timing,
    outcome: d.outcome,
    reason: d.reason,
    autoresponse: true,
  };

  try {
    const res = await fetch(CONTACT_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    const result = await res.json().catch(() => ({ result: "success" }));
    if (!res.ok || (result.result && result.result !== "success")) {
      throw new Error("Webhook did not confirm success");
    }
    return NextResponse.json({ result: "success" });
  } catch {
    return NextResponse.json(
      { result: "error", error: "We could not send your request. Please email directly." },
      { status: 502 }
    );
  }
}
