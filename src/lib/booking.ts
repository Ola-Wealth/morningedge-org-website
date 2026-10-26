/** Shared booking configuration: price, duration and the slot grammar. */

export const CONSULTATION = {
  minutes: 60,
  amountNaira: 100_000,
  /**
   * Indicative rate for the dollar figure shown beside the naira price.
   * The naira amount is what is charged; this is only a guide for visitors
   * who think in dollars. Update it when the rate moves.
   * Last set 26 October 2026.
   */
  nairaPerUsd: 1_334,
};

export function approxUsd(naira = CONSULTATION.amountNaira, rate = CONSULTATION.nairaPerUsd) {
  return Math.round(naira / rate);
}

export function formatNaira(naira: number) {
  return `₦${naira.toLocaleString("en-NG")}`;
}

/**
 * The account consultation fees are paid into.
 *
 * Fill these in and the account block appears on the booking page and in the
 * confirmation email. While `number` is empty the block stays hidden and the
 * page tells the visitor the details will be emailed, so nothing incorrect is
 * ever shown.
 */
export const BANK = {
  name: "",          // e.g. "Guaranty Trust Bank"
  accountName: "",   // e.g. "MorningEdge Dynamic Systems Limited"
  number: "",        // e.g. "0123456789"
};

export const bankPublished = Boolean(BANK.number && BANK.accountName && BANK.name);

/**
 * A short payment reference the client quotes on the transfer, so a credit
 * alert can be matched to a booking. Short enough to type into a narration.
 */
export function makeReference(now = new Date()) {
  const stamp = now.toISOString().slice(2, 10).replace(/-/g, "");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no look-alikes
  let tail = "";
  for (let i = 0; i < 4; i++) {
    tail += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `ME-${stamp}-${tail}`;
}

/** Weekday evening slots, Lagos time. */
export const SLOTS = ["5:00pm", "5:30pm", "6:00pm", "6:30pm", "7:00pm", "7:30pm"] as const;

/** "5:30pm" to "17:30:00", the shape Zoom wants alongside a timezone. */
export function slotTo24h(slot: string): string | null {
  const m = /^(\d{1,2}):(\d{2})(am|pm)$/i.exec(slot.trim());
  if (!m) return null;
  let hour = Number(m[1]) % 12;
  if (m[3].toLowerCase() === "pm") hour += 12;
  return `${String(hour).padStart(2, "0")}:${m[2]}:00`;
}

export function isWeekendDate(value: string) {
  const p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!p) return false;
  const day = new Date(Date.UTC(+p[1], +p[2] - 1, +p[3])).getUTCDay();
  return day === 0 || day === 6;
}

/** "2026-10-27" and "5:00pm" to "Tuesday, 27 October 2026 at 5:00pm WAT". */
export function describeSlot(date: string, time: string) {
  const p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!p) return `${date} at ${time} WAT`;
  const d = new Date(Date.UTC(+p[1], +p[2] - 1, +p[3]));
  const pretty = d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${pretty} at ${time} WAT`;
}
