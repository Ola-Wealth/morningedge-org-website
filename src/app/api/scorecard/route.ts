import { NextResponse } from "next/server";
import { mailConfigured, sendMail } from "@/lib/mailer";
import { site } from "@/lib/site";
import {
  AREAS,
  ROLES,
  SIZES,
  WEAKEST_ACTION,
  capacity,
  formatNaira,
  qualifiesForRoom,
  score,
} from "@/lib/scorecard";

// Same sheet as the contact form. Server-side only, never NEXT_PUBLIC.
const WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL ?? "";

type Payload = {
  website?: string;
  name?: string;
  title?: string;
  org?: string;
  email?: string;
  whatsapp?: string;
  role?: string;
  size?: string;
  staff?: number;
  salary?: number;
  hours?: number;
  answers?: unknown;
};

const num = (v: unknown, min: number, max: number) => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.min(Math.max(n, min), max) : min;
};

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
  const title = (body.title || "").trim();
  const org = (body.org || "").trim();
  const email = (body.email || "").trim();
  const whatsapp = (body.whatsapp || "").trim();
  const role = (body.role || "").trim();
  const size = (body.size || "").trim();
  const result = score(body.answers);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !org || !emailOk || !result) {
    return NextResponse.json(
      { result: "error", error: "Please complete the required fields with a valid email." },
      { status: 422 }
    );
  }

  const staff = num(body.staff, 1, 100000);
  const salary = num(body.salary, 0, 100000000);
  const hours = num(body.hours, 0, 20);
  const cap = capacity(staff, salary, hours);
  const qualified = qualifiesForRoom(role, size);
  const roleLabel = ROLES.find((r) => r.value === role)?.label ?? "Not provided";
  const sizeLabel = SIZES.find((s) => s.value === size)?.label ?? "Not provided";
  const weakest = AREAS[result.weakest];
  const areaLine = AREAS.map((a, k) => `${a} ${result.areas[k]}/9`).join(" · ");

  const summary = [
    `Copilot Adoption Scorecard: ${result.total}/36, ${result.band.name}`,
    `Areas: ${areaLine}`,
    `Weakest: ${weakest}`,
    `Route: ${qualified ? "The Room" : "AI Edge Live Cohort"}`,
    "",
    `Title: ${title || "Not provided"}`,
    `Role: ${roleLabel}`,
    `Headcount: ${sizeLabel}`,
    `WhatsApp: ${whatsapp || "Not provided"}`,
    "",
    `Team on M365: ${staff} · salary ${formatNaira(salary)}/month · ${hours} h/week estimated`,
    `Estimate: ${Math.round(cap.monthlyHours)} hours a month, ${formatNaira(cap.monthlyValue)} in salary time`,
  ].join("\n");

  let stored = false;
  if (WEBHOOK_URL) {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name,
          email,
          organization: org,
          service_area: "Copilot Adoption Scorecard",
          challenge: roleLabel,
          message: summary,
          role: roleLabel,
          employees: sizeLabel,
          pillar: "The AI Edge: Copilot Adoption Scorecard",
          breaking: summary,
          // The results email below replaces the contact form's generic reply.
          autoresponse: false,
        }),
        redirect: "follow",
      });
      const out = await res.json().catch(() => ({ result: "success" }));
      stored = res.ok && (!out.result || out.result === "success");
    } catch {
      /* Checked below. */
    }
  }

  let notified = false;
  if (mailConfigured) {
    try {
      await sendMail({
        to: site.email,
        subject: `Scorecard: ${name} (${org}) ${result.total}/36, ${result.band.name}`,
        text: [`${name}, ${title} at ${org}`, `Email: ${email}`, "", summary].join("\n"),
        replyTo: email,
      });
      notified = true;
    } catch {
      /* Checked below. */
    }

    const toLead = [
      `Hello ${name},`,
      "",
      "Thank you for completing the Copilot Adoption Scorecard. Your results are below.",
      "",
      `Score: ${result.total} out of 36`,
      `Band: ${result.band.name}`,
      "",
      result.band.text,
      "",
      result.band.cost,
      "",
      `Your four areas: ${areaLine}`,
      "",
      WEAKEST_ACTION[result.weakest],
      "",
      `On your own figures, ${staff} staff at ${hours} hours a week comes to about ${Math.round(
        cap.monthlyHours
      ).toLocaleString("en-NG")} working hours a month, or ${formatNaira(
        cap.monthlyValue
      )} in salary time. Treat it as an estimate of capacity and a starting baseline, rather than a promise of savings.`,
      "",
      qualified
        ? [
            "Your next step is The Room: one hour with the Lead Consultant. You bring one real piece of work your team produces, and we build a working version of it in Copilot, live, on your own document. There is no fee. It is by application.",
            "",
            `Reply to this email, or message us on WhatsApp: https://wa.me/${site.whatsapp}`,
          ].join("\n")
        : [
            "The AI Edge Live Cohort teaches professionals to use Copilot inside the apps they already work in, on their own work.",
            "",
            `Details: ${site.cohortUrl}`,
          ].join("\n"),
      "",
      "Olamilekan Ekundayo",
      "MorningEdge Systems",
      site.phone,
    ].join("\n");

    try {
      await sendMail({
        to: email,
        subject: `Your Copilot Adoption Score: ${result.total}/36, ${result.band.name}`,
        text: toLead,
        replyTo: site.email,
      });
    } catch {
      /* The results are on screen regardless. */
    }
  }

  // A lead that reached neither the sheet nor the inbox has not been captured.
  if (!stored && !notified) {
    return NextResponse.json(
      { result: "error", error: "We could not record your results." },
      { status: 502 }
    );
  }

  return NextResponse.json({ result: "success" });
}
