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
