import { NextResponse } from "next/server";
import { CONSULTATION, describeSlot, formatNaira, slotTo24h } from "@/lib/booking";
import { createMeeting, zoomConfigured } from "@/lib/zoom";
import { mailConfigured, sendMail } from "@/lib/mailer";
import { lookup, record } from "@/lib/bookingSheet";
import { site } from "@/lib/site";

/**
 * Runs once the visitor returns from Paystack.
 *
 * Confirms the payment, then creates the Zoom meeting, logs the booking and
 * sends both emails. The sheet is consulted first by reference, so
 * reloading the confirmation page returns the existing booking rather than
 * creating a second meeting.
 */

const SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";

type Meta = Record<string, string>;

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference")?.trim() ?? "";
  if (!reference) {
    return NextResponse.json({ result: "error", error: "No payment reference." }, { status: 400 });
  }
  if (!SECRET) {
    return NextResponse.json({ result: "error", error: "Payments are not connected yet." }, { status: 500 });
  }

  // Already recorded? Return it and do nothing else.
  const existing = await lookup(reference);
  if (existing) {
    return NextResponse.json({
      result: "success",
      alreadyRecorded: true,
      joinUrl: existing.joinUrl ?? "",
      when: describeSlot(String(existing.date ?? ""), String(existing.time ?? "")),
      email: existing.email ?? "",
    });
  }

  const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${SECRET}` },
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as {
    status?: boolean;
    data?: { status?: string; amount?: number; customer?: { email?: string }; metadata?: Meta };
  };

  if (!res.ok || !json.status || json.data?.status !== "success") {
    return NextResponse.json(
      { result: "error", error: "That payment has not been confirmed. If you were charged, email us." },
      { status: 402 }
    );
  }

  // Trust the amount Paystack reports, never a number from the browser.
  if ((json.data.amount ?? 0) < CONSULTATION.amountNaira * 100) {
    return NextResponse.json(
      { result: "error", error: "The amount paid does not cover a consultation." },
      { status: 402 }
    );
  }

  const m = json.data.metadata ?? {};
  const email = json.data.customer?.email ?? m.email ?? "";
  const date = m.date ?? "";
  const time = m.time ?? "";
  const when = describeSlot(date, time);
  const time24 = slotTo24h(time);

  let meetingId = "";
  let joinUrl = "";
  let startUrl = "";
  let passcode = "";
  let meetingError = "";

  if (zoomConfigured && time24 && date) {
    try {
      const meeting = await createMeeting({
        topic: `MorningEdge consultation: ${m.name ?? ""} (${m.company ?? ""})`.trim(),
        agenda: m.reason ?? "",
        date,
        time24,
        minutes: CONSULTATION.minutes,
      });
      meetingId = meeting.id;
      joinUrl = meeting.joinUrl;
      startUrl = meeting.startUrl;
      passcode = meeting.passcode;
    } catch (err) {
      meetingError = err instanceof Error ? err.message : "Zoom meeting could not be created";
    }
  } else if (!zoomConfigured) {
    meetingError = "Zoom is not connected";
  }

  await record({
    reference,
    name: m.name ?? "",
    email,
    company: m.company ?? "",
    role: m.role ?? "",
    attendees: m.attendees ?? "",
    attendeeRoles: m.attendeeRoles ?? "",
    format: m.format ?? "",
    date,
    time,
    reason: m.reason ?? "",
    outcome: m.outcome ?? "",
    amountNaira: Math.round((json.data.amount ?? 0) / 100),
    meetingId,
    joinUrl,
    passcode,
  });

  if (mailConfigured) {
    const lines = [
      `Consultation booked and paid.`,
      ``,
      `When:      ${when}`,
      `Who:       ${m.name ?? ""}${m.role ? `, ${m.role}` : ""}`,
      `Firm:      ${m.company ?? ""}`,
      `Email:     ${email}`,
      `Joining:   ${m.attendees ?? "Not provided"}`,
      `Roles:     ${m.attendeeRoles ?? "Not provided"}`,
      `Format:    ${m.format ?? "Not provided"}`,
      `Paid:      ${formatNaira(Math.round((json.data.amount ?? 0) / 100))}`,
      `Reference: ${reference}`,
      ``,
      `What they want to work through:`,
      m.reason ?? "",
      ``,
      `What should be true afterwards:`,
      m.outcome || "Not provided",
      ``,
      meetingError
        ? `ZOOM WAS NOT CREATED: ${meetingError}. Create the meeting manually and send the link.`
        : `Start the meeting: ${startUrl}\nJoin link to share: ${joinUrl}\nPasscode: ${passcode || "none"}`,
    ].join("\n");

    try {
      await sendMail({
        to: site.email,
        subject: `Consultation booked: ${m.name ?? "Unknown"} (${m.company ?? ""}) ${when}`,
        text: lines,
        replyTo: email,
      });
    } catch {
      /* The booking stands even when the notification fails. */
    }

    if (email && joinUrl) {
      const client = [
        `Hello ${m.name ?? ""},`,
        ``,
        `Your consultation is confirmed for ${when}. It runs for ${CONSULTATION.minutes} minutes.`,
        ``,
        `Join: ${joinUrl}`,
        passcode ? `Passcode: ${passcode}` : ``,
        ``,
        `Come with the decision you are carrying and whatever numbers sit behind it. If you need to move the time, reply to this message.`,
        ``,
        `Olamilekan Ekundayo`,
        `MorningEdge Systems`,
        site.phone,
      ]
        .filter(Boolean)
        .join("\n");

      try {
        await sendMail({
          to: email,
          subject: `Your MorningEdge consultation, ${when}`,
          text: client,
          replyTo: site.email,
        });
      } catch {
        /* Shown on screen regardless. */
      }
    }
  }

  return NextResponse.json({
    result: "success",
    joinUrl,
    when,
    email,
    meetingPending: Boolean(meetingError),
  });
}
