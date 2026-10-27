import { NextResponse } from "next/server";
import { CONSULTATION, describeSlot, normaliseDate, normaliseTime } from "@/lib/booking";
import { lookup, markPaid } from "@/lib/bookingSheet";
import { mailConfigured, sendMail } from "@/lib/mailer";
import { verifyReference } from "@/lib/confirmToken";
import { site } from "@/lib/site";

/**
 * The one-click confirmation behind the button in the notification email.
 *
 * GET returns the booking so the confirmation page can show who is about to
 * be sent the link. POST does the work. Keeping the action on POST means a
 * mail client or security scanner that fetches the link in the background
 * cannot confirm a booking by accident.
 */

const MEETING_URL = process.env.ZOOM_MEETING_URL ?? "";

function check(request: Request) {
  const params = new URL(request.url).searchParams;
  const reference = params.get("ref")?.trim() ?? "";
  const token = params.get("t")?.trim() ?? "";
  return { reference, ok: verifyReference(reference, token) };
}

export async function GET(request: Request) {
  const { reference, ok } = check(request);
  if (!ok) {
    return NextResponse.json({ result: "error", error: "This link is not valid." }, { status: 403 });
  }

  const row = await lookup(reference);
  if (!row) {
    return NextResponse.json({ result: "error", error: "No booking with that reference." }, { status: 404 });
  }

  return NextResponse.json({
    result: "success",
    reference,
    name: row.name ?? "",
    email: row.email ?? "",
    company: row.company ?? "",
    when: describeSlot(normaliseDate(String(row.date ?? "")), normaliseTime(String(row.time ?? ""))),
    status: row.status ?? "",
    alreadyPaid: String(row.status ?? "").toLowerCase().startsWith("paid"),
  });
}

export async function POST(request: Request) {
  const { reference, ok } = check(request);
  if (!ok) {
    return NextResponse.json({ result: "error", error: "This link is not valid." }, { status: 403 });
  }
  if (!MEETING_URL) {
    return NextResponse.json(
      { result: "error", error: "No meeting room is configured, so no link can be sent." },
      { status: 500 }
    );
  }

  const row = await lookup(reference);
  if (!row) {
    return NextResponse.json({ result: "error", error: "No booking with that reference." }, { status: 404 });
  }

  const email = String(row.email ?? "");
  const name = String(row.name ?? "");
  const when = describeSlot(normaliseDate(String(row.date ?? "")), normaliseTime(String(row.time ?? "")));

  if (!email) {
    return NextResponse.json(
      { result: "error", error: "That booking has no email address on it." },
      { status: 422 }
    );
  }
  if (!mailConfigured) {
    return NextResponse.json({ result: "error", error: "Email is not connected." }, { status: 500 });
  }

  const text = [
    `Hello ${name},`,
    "",
    `Your payment has been received, so ${when} is confirmed. It runs for ${CONSULTATION.minutes} minutes.`,
    "",
    "Join here:",
    "",
    `    ${MEETING_URL}`,
    "",
    "Come with the decision you are carrying and whatever numbers sit behind it.",
    "If you need to move the time, reply to this message.",
    "",
    "Olamilekan Ekundayo",
    "MorningEdge Systems",
    site.phone,
  ].join("\n");

  try {
    await sendMail({
      to: email,
      subject: `Confirmed: your consultation, ${when}`,
      text,
      replyTo: site.email,
    });
  } catch (err) {
    return NextResponse.json(
      {
        result: "error",
        error: `The link could not be emailed: ${err instanceof Error ? err.message : "unknown"}`,
      },
      { status: 502 }
    );
  }

  // The client has the link either way, so a sheet failure is reported but
  // does not undo the send.
  const logged = await markPaid(reference, MEETING_URL);

  return NextResponse.json({ result: "success", name, email, when, logged });
}
