import { NextResponse } from "next/server";
import { CONSULTATION, isWeekendDate, slotTo24h } from "@/lib/booking";

/**
 * Starts a Paystack transaction for a consultation and hands back the hosted
 * checkout URL. Every booking detail travels in the transaction metadata, so
 * the confirmation step can rebuild the booking from the reference alone
 * without this site holding a database.
 */

const SECRET = process.env.PAYSTACK_SECRET_KEY ?? "";

export async function POST(request: Request) {
  if (!SECRET) {
    return NextResponse.json(
      { result: "error", error: "Payments are not connected yet." },
      { status: 500 }
    );
  }

  let body: Record<string, string>;
  try {
    body = (await request.json()) as Record<string, string>;
  } catch {
    return NextResponse.json({ result: "error", error: "Invalid request." }, { status: 400 });
  }

  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ result: "error", error: "Rejected." }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const company = (body.company || "").trim();
  const reason = (body.reason || "").trim();
  const date = (body.date || "").trim();
  const time = (body.time || "").trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !company || !reason || !emailOk) {
    return NextResponse.json(
      { result: "error", error: "Please complete the required fields with a valid email." },
      { status: 422 }
    );
  }
  if (!slotTo24h(time) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { result: "error", error: "Please choose a date and a time." },
      { status: 422 }
    );
  }
  if (isWeekendDate(date)) {
    return NextResponse.json(
      { result: "error", error: "Consultations run Monday to Friday. Please pick a weekday." },
      { status: 422 }
    );
  }

  const origin = new URL(request.url).origin;

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${SECRET}`, "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      email,
      amount: CONSULTATION.amountNaira * 100, // kobo
      currency: "NGN",
      channels: ["card", "bank", "bank_transfer", "ussd"],
      callback_url: `${origin}/book/confirmed`,
      metadata: {
        name,
        company,
        role: (body.role || "").trim(),
        attendees: (body.attendees || "").trim(),
        attendeeRoles: (body.attendeeRoles || "").trim(),
        format: (body.format || "").trim(),
        date,
        time,
        reason,
        outcome: (body.outcome || "").trim(),
        custom_fields: [
          { display_name: "Booking", variable_name: "booking", value: `Consultation ${date} ${time}` },
        ],
      },
    }),
  });

  const json = (await res.json().catch(() => ({}))) as {
    status?: boolean;
    data?: { authorization_url?: string; reference?: string };
  };

  if (!res.ok || !json.status || !json.data?.authorization_url) {
    return NextResponse.json(
      { result: "error", error: "We could not start the payment. Please email directly." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    result: "success",
    url: json.data.authorization_url,
    reference: json.data.reference,
  });
}
