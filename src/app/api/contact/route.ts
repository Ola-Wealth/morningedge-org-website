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
  const breaking = (body.breaking || "").trim();

  // Server-side validation.
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !company || !breaking || !emailOk) {
    return NextResponse.json(
      { result: "error", error: "Please complete the required fields with a valid email." },
      { status: 422 }
    );
  }

  if (!WEBHOOK_URL) {
    return NextResponse.json(
      { result: "error", error: "The form backend is not configured." },
      { status: 500 }
    );
  }

  const role = (body.role || "").trim();
  const employees = (body.employees || "").trim();
  const entities = (body.entities || "").trim();
  const systems = (body.systems || "").trim();
  const pillar = (body.pillar || "").trim();
  const timestamp = new Date().toISOString();

  // Compose a full detail block so the current sheet/notification captures
  // every field even before the sheet columns are expanded.
  const message = [
    `Role: ${role || "Not provided"}`,
    `Staff: ${employees || "Not provided"}`,
    `Entities: ${entities || "Not provided"}`,
    `Current systems: ${systems || "Not provided"}`,
    `Here for: ${pillar || "Not provided"}`,
    "",
    `What is breaking:`,
    breaking,
  ].join("\n");

  const record = {
    timestamp,
    name,
    email,
    organization: company,
    service_area: pillar,
    challenge: role,
    message,
    // discrete fields for an expanded sheet
    role,
    employees,
    entities,
    systems,
    pillar,
    breaking,
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
      { result: "error", error: "We could not deliver your message. Please email us directly." },
      { status: 502 }
    );
  }
}
