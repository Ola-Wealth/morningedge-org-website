"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const COOKIE = "me_consent";
const ONE_YEAR = 60 * 60 * 24 * 365;

export type Consent = "all" | "essential";

function readConsent(): Consent | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=(all|essential)`));
  return match ? (match[1] as Consent) : null;
}

function writeConsent(value: Consent) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${value}; Max-Age=${ONE_YEAR}; Path=/; SameSite=Lax${secure}`;
  // Expose the choice for any future analytics to gate on.
  window.dispatchEvent(new CustomEvent("me:consent", { detail: value }));
}

export default function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
  }, []);

  if (!open) return null;

  function choose(value: Consent) {
    writeConsent(value);
    setOpen(false);
  }

  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className="card-sheen fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-2xl border border-(--line) bg-(--surface) p-5 shadow-soft-lg sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-(--navy-text)/10 text-(--navy-text)">
            <Cookie size={17} aria-hidden="true" />
          </span>
          <p className="text-sm leading-relaxed text-(--ink-soft)">
            <span className="font-medium text-(--ink)">This site uses cookies.</span> One essential
            cookie remembers your choice here. We set no advertising trackers. Read the{" "}
            <Link href="/legal/privacy" className="text-(--navy-text) underline underline-offset-2">
              privacy notice
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-shrink-0 gap-2 sm:ml-auto">
          <button
            type="button"
            onClick={() => choose("essential")}
            className="pressable rounded-lg border border-(--ink)/20 bg-(--surface) px-4 py-2.5 text-sm font-medium text-(--ink) hover:border-(--ink)/45"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => choose("all")}
            className="pressable rounded-lg bg-(--navy) px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_22px_-8px_rgba(26,26,181,0.55)] hover:bg-(--navy-dark)"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
