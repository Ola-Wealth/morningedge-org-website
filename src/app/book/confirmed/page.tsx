"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Loader2, AlertCircle, Video } from "lucide-react";
import { Container } from "@/components/primitives";
import { site } from "@/lib/site";

type State =
  | { phase: "checking" }
  | { phase: "done"; joinUrl: string; when: string; email: string; meetingPending: boolean }
  | { phase: "failed"; message: string };

function Confirmation() {
  const reference = useSearchParams().get("reference") ?? "";
  const [state, setState] = useState<State>({ phase: "checking" });

  useEffect(() => {
    if (!reference) {
      setState({ phase: "failed", message: "This page was opened without a payment reference." });
      return;
    }
    let live = true;
    (async () => {
      try {
        const res = await fetch(`/api/book/verify?reference=${encodeURIComponent(reference)}`);
        const json = await res.json();
        if (!live) return;
        if (!res.ok || json.result !== "success") {
          setState({ phase: "failed", message: json.error || "We could not confirm that payment." });
          return;
        }
        setState({
          phase: "done",
          joinUrl: json.joinUrl ?? "",
          when: json.when ?? "",
          email: json.email ?? "",
          meetingPending: Boolean(json.meetingPending),
        });
      } catch {
        if (live) setState({ phase: "failed", message: "We could not reach the server to confirm payment." });
      }
    })();
    return () => {
      live = false;
    };
  }, [reference]);

  if (state.phase === "checking") {
    return (
      <div className="flex items-center gap-3 text-(--ink-soft)">
        <Loader2 size={18} className="animate-spin" />
        <p className="text-[15px]">Confirming your payment and setting up the meeting.</p>
      </div>
    );
  }

  if (state.phase === "failed") {
    return (
      <div className="card-sheen rounded-2xl border border-(--line) bg-(--surface) p-10 shadow-soft lg:p-12">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--accent)/12 text-(--accent)">
          <AlertCircle size={22} />
        </div>
        <h2 className="mt-6 text-2xl">We could not confirm this yet.</h2>
        <p className="measure mt-3 text-[15px] leading-relaxed text-(--ink-soft)">{state.message}</p>
        <p className="measure mt-4 text-[15px] leading-relaxed text-(--ink-soft)">
          If money has left your account, nothing is lost. Email{" "}
          <a href={`mailto:${site.email}`} className="text-(--navy-text) underline underline-offset-2">
            {site.email}
          </a>{" "}
          with your payment reference and the slot will be held.
        </p>
        {reference && (
          <p className="mt-4 text-[13px] text-(--ink-faint)">
            Reference: <span className="font-mono">{reference}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="card-sheen rounded-2xl border border-(--line) bg-(--surface) p-10 shadow-soft lg:p-12">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--navy-text)/10 text-(--navy-text)">
        <Check size={22} />
      </div>
      <h2 className="mt-6 text-2xl">You are booked.</h2>
      <p className="measure mt-3 text-[15px] leading-relaxed text-(--ink-soft)">
        {state.when}. One hour with Olamilekan.
        {state.email ? ` A confirmation is on its way to ${state.email}.` : ""}
      </p>

      {state.joinUrl ? (
        <div className="mt-8 rounded-xl border border-(--line) bg-(--panel) p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-(--ink-soft)">Your Zoom link</p>
          <a
            href={state.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-[15px] text-(--navy-text) underline underline-offset-2"
          >
            <Video size={16} /> Join the meeting
          </a>
          <p className="mt-3 break-all text-[13px] text-(--ink-faint)">{state.joinUrl}</p>
        </div>
      ) : state.meetingPending ? (
        <p className="measure mt-6 text-[15px] leading-relaxed text-(--ink-soft)">
          Your payment is confirmed and the slot is held. The meeting link is being set up by hand and
          will reach you by email shortly.
        </p>
      ) : null}

      <p className="mt-8 text-[15px]">
        <Link href="/" className="text-(--navy-text) underline underline-offset-2">
          Back to the site
        </Link>
      </p>
    </div>
  );
}

export default function ConfirmedPage() {
  return (
    <section className="section-glow">
      <Container className="py-20 lg:py-28">
        <div className="max-w-2xl">
          <h1 className="text-balance text-4xl leading-[1.08] sm:text-5xl">Consultation</h1>
          <div className="mt-10">
            <Suspense
              fallback={
                <div className="flex items-center gap-3 text-(--ink-soft)">
                  <Loader2 size={18} className="animate-spin" />
                  <p className="text-[15px]">Loading.</p>
                </div>
              }
            >
              <Confirmation />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
