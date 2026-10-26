import { NextResponse } from "next/server";

const WEBHOOK_URL =
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

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const typeOk = bookingType === "Training" || bookingType === "Consultation";
  if (!name || !company || !reason || !emailOk || !typeOk) {
    return NextResponse.json(
      { result: "error", error: "Please complete the required fields with a valid email." },
      { status: 422 }
    );
  }

  const date = (body.date || "").trim();
  const time = (body.time || "").trim();

  // Consultations run on a weekday evening, so the slot is checked here too
  // and not only in the browser.
  if (bookingType === "Consultation") {
    const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!parts || !time) {
      return NextResponse.json(
        { result: "error", error: "Please choose a date and a time for the consultation." },
        { status: 422 }
      );
    }
    const day = new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3])).getUTCDay();
    if (day === 0 || day === 6) {
      return NextResponse.json(
        { result: "error", error: "Consultations run Monday to Friday. Please pick a weekday." },
        { status: 422 }
      );
    }
  }

  if (!WEBHOOK_URL) {
    return NextResponse.json(
      { result: "error", error: "The booking form is not connected yet." },
      { status: 500 }
    );
  }

  const role = (body.role || "").trim();
  const attendees = (body.attendees || "").trim();
  const attendeeRoles = (body.attendeeRoles || "").trim();
  const format = (body.format || "").trim();
  const timing = (body.timing || "").trim();
  const outcome = (body.outcome || "").trim();
  const timestamp = new Date().toISOString();

  // One readable block, so the existing sheet and notification carry every
  // answer even before the booking columns are added.
  const message = [
    `Booking type: ${bookingType}`,
    `Requested by: ${name}${role ? `, ${role}` : ""}`,
    `Organisation: ${company}`,
    "",
    `Who attends: ${attendees || "Not provided"}`,
    `Roles or functions: ${attendeeRoles || "Not provided"}`,
    `Format: ${format || "Not provided"}`,
    bookingType === "Consultation"
      ? `Requested slot: ${date} at ${time} WAT`
      : `Preferred timing: ${timing || "Not provided"}`,
    `What should be true afterwards: ${outcome || "Not provided"}`,
    "",
    "Why they are booking:",
    reason,
  ].join("\n");

  const record = {
    timestamp,
    form: "booking",
    name,
    email,
    organization: company,
    service_area: bookingType,
    challenge: role,
    message,
    // discrete fields for an expanded sheet
    role,
    bookingType,
    attendees,
    attendeeRoles,
    format,
    timing,
    date,
    time,
    outcome,
    reason,
    autoresponse: true,
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
      // Apps Script 302-redirects to a googleusercontent URL; follow it.
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
