/**
 * Zoom meeting creation through a Server-to-Server OAuth app.
 *
 * Create the app at marketplace.zoom.us (Develop, Build App,
 * Server-to-Server OAuth) with the scope `meeting:write:admin`, then set
 * ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID and ZOOM_CLIENT_SECRET.
 */

const ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID ?? "";
const CLIENT_ID = process.env.ZOOM_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET ?? "";

export const zoomConfigured = Boolean(ACCOUNT_ID && CLIENT_ID && CLIENT_SECRET);

export type ZoomMeeting = {
  id: string;
  joinUrl: string;
  startUrl: string;
  passcode: string;
};

async function accessToken(): Promise<string> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(ACCOUNT_ID)}`,
    { method: "POST", headers: { Authorization: `Basic ${basic}` }, cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Zoom token request failed (${res.status})`);
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("Zoom returned no access token");
  return json.access_token;
}

export async function createMeeting(opts: {
  topic: string;
  agenda: string;
  /** "2026-10-27" */
  date: string;
  /** "17:00:00", local to the timezone below */
  time24: string;
  minutes: number;
}): Promise<ZoomMeeting> {
  const token = await accessToken();
  const res = await fetch("https://api.zoom.us/v2/users/me/meetings", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      topic: opts.topic.slice(0, 200),
      type: 2, // scheduled
      start_time: `${opts.date}T${opts.time24}`,
      duration: opts.minutes,
      timezone: "Africa/Lagos",
      agenda: opts.agenda.slice(0, 2000),
      settings: {
        join_before_host: false,
        waiting_room: true,
        host_video: true,
        participant_video: true,
        auto_recording: "none",
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Zoom meeting creation failed (${res.status}) ${detail.slice(0, 200)}`);
  }

  const m = (await res.json()) as {
    id?: number | string;
    join_url?: string;
    start_url?: string;
    password?: string;
  };

  return {
    id: String(m.id ?? ""),
    joinUrl: m.join_url ?? "",
    startUrl: m.start_url ?? "",
    passcode: m.password ?? "",
  };
}
