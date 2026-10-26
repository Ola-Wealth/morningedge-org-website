/**
 * Outbound mail through Resend, the same service the AI Edge site uses.
 *
 * Needs RESEND_API_KEY, and EMAIL_FROM set to an address on a domain that is
 * verified in the Resend dashboard. Resend rejects any other sender, so the
 * from-address and the verified domain have to agree.
 *
 * Nothing here touches the mailbox itself, so moving hello@ from Zoho to
 * Microsoft 365 does not affect sending. Replies land in whichever mailbox
 * the MX records point at.
 */

const API_KEY = process.env.RESEND_API_KEY ?? "";
const FROM = process.env.EMAIL_FROM ?? "MorningEdge Systems <hello@morningedgesystems.com>";

export const mailConfigured = Boolean(API_KEY);

export async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}) {
  if (!mailConfigured) throw new Error("RESEND_API_KEY is not set");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({
      from: FROM,
      to: [opts.to],
      subject: opts.subject,
      text: opts.text,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`);
  }
}
