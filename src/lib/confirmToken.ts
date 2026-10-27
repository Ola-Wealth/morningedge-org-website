import { createHmac, timingSafeEqual } from "crypto";

/**
 * Signs the "confirm payment" links that go into the notification email.
 *
 * Without a signature anyone could guess a reference and mark a booking paid,
 * which would send a stranger the meeting link. The token is an HMAC of the
 * reference, so only links this server generated are accepted.
 */

const SECRET = process.env.BOOKING_CONFIRM_SECRET ?? "";

export const confirmConfigured = Boolean(SECRET);

export function signReference(reference: string): string {
  if (!SECRET) throw new Error("BOOKING_CONFIRM_SECRET is not set");
  return createHmac("sha256", SECRET).update(reference).digest("hex").slice(0, 32);
}

export function verifyReference(reference: string, token: string): boolean {
  if (!SECRET || !reference || !token) return false;
  let expected: string;
  try {
    expected = signReference(reference);
  } catch {
    return false;
  }
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  // Lengths must match before a constant-time compare is meaningful.
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
