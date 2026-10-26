import nodemailer from "nodemailer";

/**
 * Outbound mail from hello@morningedgesystems.com.
 *
 * Configured against Zoho today. Because the host, port and credentials are
 * all environment values, moving the mailbox to Microsoft 365 later is a
 * change of settings rather than a change of code:
 *   Zoho       SMTP_HOST=smtp.zoho.com        SMTP_PORT=465
 *   Microsoft  SMTP_HOST=smtp.office365.com   SMTP_PORT=587
 *
 * Zoho has two-factor enabled, so SMTP_PASS must be an application-specific
 * password generated in the Zoho account security settings, never the
 * account password.
 */

const HOST = process.env.SMTP_HOST ?? "smtp.zoho.com";
const PORT = Number(process.env.SMTP_PORT ?? 465);
const USER = process.env.SMTP_USER ?? "";
const PASS = process.env.SMTP_PASS ?? "";
const FROM = process.env.SMTP_FROM ?? USER;

export const mailConfigured = Boolean(USER && PASS);

export async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}) {
  if (!mailConfigured) throw new Error("SMTP is not configured");

  const transport = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    // 465 is implicit TLS; 587 upgrades with STARTTLS.
    secure: PORT === 465,
    auth: { user: USER, pass: PASS },
  });

  await transport.sendMail({
    from: `MorningEdge Systems <${FROM}>`,
    to: opts.to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    text: opts.text,
  });
}
