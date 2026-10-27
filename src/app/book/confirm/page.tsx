"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Loader2, AlertCircle, Send } from "lucide-react";
import { Container } from "@/components/primitives";

type Booking = {
  reference: string;
  name: string;
  email: string;
  company: string;
  when: string;
  status: string;
  alreadyPaid: boolean;
};

type State =
  | { phase: "loading" }
  | { phase: "ready"; booking: Booking }
  | { phase: "sending"; booking: Booking }
  | { phase: "sent"; booking: Booking; logged: boolean }
  | { phase: "error"; message: string };

const labelClass = "text-xs font-semibold uppercase tracking-wide text-(--ink-soft)";

function Panel() {
  const params = useSearchParams();
  const ref = params.get("ref") ?? "";
  const token = params.get("t") ?? "";
  const [state, setState] = useState<State>({ phase: "loading" });

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const res = await fetch(`/api/book/confirm?ref=${encodeURIComponent(ref)}&t=${encodeURIComponent(token)}`);
        const json = await res.json();
        if (!live) return;
        if (!res.ok || json.result !== "success") {
          setState({ phase: "error", message: json.error || "That link could not be opened." });
          return;
        }
        setState({ phase: "ready", booking: json as Booking });
      } catch {
        if (live) setState({ phase: "error", message: "Could not reach the server." });
      }
    })();
    return () => {
      live = false;
    };
  }, [ref, token]);

  async function send(booking: Booking) {
    setState({ phase: "sending", booking });
    try {
      const res = await fetch(`/api/book/confirm?ref=${encodeURIComponent(ref)}&t=${encodeURIComponent(token)}`, {
        method: "POST",
      });
      const json = await res.json();
      if (!res.ok || json.result !== "success") {
        setState({ phase: "error", message: json.error || "The link was not sent." });
        return;
      }
      setState({ phase: "sent", booking, logged: Boolean(json.logged) });
    } catch {
      setState({ phase: "error", message: "Could not reach the server." });
    }
  }

  if (state.phase === "loading") {
    return (
      <div className="flex items-center gap-3 text-(--ink-soft)">
        <Loader2 size={18} className="animate-spin" />
        <p className="text-[15px]">Loading the booking.</p>
      </div>
    );
  }

  if (state.phase === "error") {
    return (
      <div className="card-sheen rounded-2xl border border-(--line) bg-(--surface) p-10 shadow-soft">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--accent)/12 text-(--accent)">
          <AlertCircle size={22} />
        </div>
        <h2 className="mt-6 text-2xl">That did not work.</h2>
        <p className="measure mt-3 text-[15px] leading-relaxed text-(--ink-soft)">{state.message}</p>
      </div>
    );
  }

  if (state.phase === "sent") {
    return (
      <div className="card-sheen rounded-2xl border border-(--line) bg-(--surface) p-10 shadow-soft">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--navy-text)/10 text-(--navy-text)">
          <Check size={22} />
        </div>
        <h2 className="mt-6 text-2xl">Link sent.</h2>
        <p className="measure mt-3 text-[15px] leading-relaxed text-(--ink-soft)">
          {state.booking.name} has the meeting link for {state.booking.when}, at {state.booking.email}.
        </p>
        <p className="measure mt-3 text-[15px] leading-relaxed text-(--ink-soft)">
          {state.logged
            ? "The booking is marked paid in the sheet."
            : "The sheet could not be updated, so mark that row paid by hand."}
        </p>
      </div>
    );
  }

  const { booking } = state;
  const sending = state.phase === "sending";

  return (
    <div className="card-sheen rounded-2xl border border-(--line) bg-(--surface) p-10 shadow-soft">
      <h2 className="text-2xl">Confirm this payment?</h2>
      <p className="measure mt-3 text-[15px] leading-relaxed text-(--ink-soft)">
        This sends the meeting link and marks the booking paid. Check the name and the slot first.
      </p>

      <dl className="mt-8 flex flex-col gap-3 rounded-xl border border-(--line) bg-(--panel) p-5 text-[15px]">
        <div className="flex flex-wrap gap-x-3">
          <dt className="w-24 flex-shrink-0 text-(--ink-faint)">Who</dt>
          <dd className="text-(--ink)">{booking.name || "Not recorded"}</dd>
        </div>
        <div className="flex flex-wrap gap-x-3">
          <dt className="w-24 flex-shrink-0 text-(--ink-faint)">Firm</dt>
          <dd className="text-(--ink)">{booking.company || "Not recorded"}</dd>
        </div>
        <div className="flex flex-wrap gap-x-3">
          <dt className="w-24 flex-shrink-0 text-(--ink-faint)">Email</dt>
          <dd className="break-all text-(--ink)">{booking.email || "Not recorded"}</dd>
        </div>
        <div className="flex flex-wrap gap-x-3">
          <dt className="w-24 flex-shrink-0 text-(--ink-faint)">Slot</dt>
          <dd className="text-(--ink)">{booking.when}</dd>
        </div>
        <div className="flex flex-wrap gap-x-3">
          <dt className="w-24 flex-shrink-0 text-(--ink-faint)">Reference</dt>
          <dd className="font-mono text-(--ink)">{booking.reference}</dd>
        </div>
      </dl>

      {booking.alreadyPaid && (
        <p className="mt-4 text-[13.5px] text-(--accent)">
          This booking is already marked paid. Sending again will email the link a second time.
        </p>
      )}

      <button
        type="button"
        onClick={() => send(booking)}
        disabled={sending}
        className="pressable mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-(--navy) px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-(--navy-dark) disabled:opacity-50"
      >
        {sending ? (
          <><Loader2 size={16} className="animate-spin" /> Sending</>
        ) : (
          <><Send size={16} /> Send the link</>
        )}
      </button>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <section className="section-glow">
      <Container className="py-20 lg:py-28">
        <div className="max-w-2xl">
          <p className={labelClass}>Payment confirmation</p>
          <h1 className="mt-4 text-balance text-4xl leading-[1.08] sm:text-5xl">Send the meeting link</h1>
          <div className="mt-10">
            <Suspense
              fallback={
                <div className="flex items-center gap-3 text-(--ink-soft)">
                  <Loader2 size={18} className="animate-spin" />
                  <p className="text-[15px]">Loading.</p>
                </div>
              }
            >
              <Panel />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
