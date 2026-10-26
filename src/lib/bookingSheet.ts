/**
 * The bookings log: a Google Sheet behind an Apps Script web app, separate
 * from the contact-form sheet. Set BOOKINGS_SHEET_WEBHOOK_URL to the
 * deployed script URL.
 *
 * The script is idempotent on `reference`, so a refreshed confirmation page
 * returns the booking already recorded instead of writing it twice.
 */

const URL_ = process.env.BOOKINGS_SHEET_WEBHOOK_URL ?? "";

export const sheetConfigured = Boolean(URL_);

export type BookingRow = {
  reference: string;
  name: string;
  email: string;
  company: string;
  role: string;
  attendees: string;
  attendeeRoles: string;
  format: string;
  date: string;
  time: string;
  reason: string;
  outcome: string;
  amountNaira: number;
  /** "Awaiting payment" until the transfer is confirmed by hand. */
  status: string;
};

async function call(payload: Record<string, unknown>) {
  const res = await fetch(URL_, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    redirect: "follow",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Bookings sheet responded ${res.status}`);
  return (await res.json()) as { result?: string; found?: boolean; row?: Partial<BookingRow> };
}

export async function record(row: BookingRow) {
  if (!sheetConfigured) return false;
  try {
    const out = await call({ action: "record", ...row });
    return out.result === "success";
  } catch {
    return false;
  }
}
