"use client";

import { useState } from "react";
import { ArrowRight, ArrowLeft, Loader2, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, ButtonLink } from "@/components/primitives";
import { site } from "@/lib/site";
import {
  AREAS,
  QUESTIONS,
  ROLES,
  SIZES,
  WEAKEST_ACTION,
  capacity,
  formatNaira,
  qualifiesForRoom,
  score,
  type Result,
} from "@/lib/scorecard";

const field =
  "w-full rounded-md border border-(--line) bg-(--surface) px-4 py-3 text-[15px] text-(--ink) placeholder:text-(--ink-faint) focus:border-(--navy-text) focus:outline-none focus:ring-2 focus:ring-(--navy-text)/20 transition-colors";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-(--ink-soft)";
const card = "card-sheen rounded-2xl border border-(--line) bg-(--surface) p-6 shadow-soft sm:p-8 lg:p-10";

const toneClass = {
  risk: "bg-red-700 text-white",
  warn: "bg-amber-600 text-white",
  navy: "bg-(--navy) text-white",
  good: "bg-emerald-700 text-white",
};

type Stage = "intro" | "quiz" | "details" | "results";

type Lead = {
  name: string;
  title: string;
  org: string;
  email: string;
  whatsapp: string;
  role: string;
  size: string;
  staff: number;
  salary: number;
  hours: number;
};

export default function ScorecardPage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => QUESTIONS.map(() => null));
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [lead, setLead] = useState<Lead | null>(null);
  const [saved, setSaved] = useState(true);

  const go = (s: Stage) => {
    setStage(s);
    window.scrollTo({ top: 0 });
  };

  function choose(k: number) {
    const next = [...answers];
    next[i] = k;
    setAnswers(next);
    setTimeout(() => {
      if (i < QUESTIONS.length - 1) setI(i + 1);
      else go("details");
    }, 180);
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const l: Lead = {
      name: get("name"),
      title: get("title"),
      org: get("org"),
      email: get("email"),
      whatsapp: get("whatsapp"),
      role: get("role"),
      size: get("size"),
      staff: Number(get("staff")),
      salary: Number(get("salary")),
      hours: Number(get("hours")),
    };
    const r = score(answers);
    if (!r) return;

    setStatus("loading");
    let ok = false;
    try {
      const res = await fetch("/api/scorecard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...l, answers, website: get("website") }),
      });
      const out = await res.json();
      ok = res.ok && out.result === "success";
    } catch {
      ok = false;
    }
    // The visitor still sees their results if recording failed; they are told how to reach us.
    setSaved(ok);
    setLead(l);
    setResult(r);
    setStatus("idle");
    go("results");
  }

  return (
    <>
      <section className="border-b border-(--line)">
        <Container className="py-16 lg:py-24">
          {stage === "intro" && (
            <Reveal className="max-w-4xl">
              <p className={labelClass}>The AI Edge · Free scorecard</p>
              <h1 className="mt-5 text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
                Your staff already have the tool. Find out how many have opened it.
              </h1>
              <p className="measure mt-8 text-lg leading-relaxed text-(--ink-soft)">
                Microsoft 365 Copilot sits inside Word, Excel, Outlook and Teams on most work accounts today.
                Twelve questions show how much of it your organisation actually uses, where the risk sits, and
                the one area to fix first.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {[
                  "Your adoption score across Access, Use, Safety and Measurement",
                  "An estimate of the working hours your licence could already be giving back",
                  "The single weakest area, and what to do about it this month",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-(--ink)">
                    <Check size={18} className="mt-0.5 flex-shrink-0 text-(--navy-text)" /> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-(--ink-faint)">
                About four minutes. Answer for the team or function you are responsible for.
              </p>
              <noscript>
                <p className="mt-6 rounded-md border border-(--line) bg-(--surface) px-4 py-3 text-sm text-(--ink-soft)">
                  The scorecard needs JavaScript to calculate your results. You can also write to us at{" "}
                  {site.email} and we will take you through it.
                </p>
              </noscript>
              <button
                onClick={() => go("quiz")}
                className="pressable mt-8 inline-flex items-center gap-2 rounded-lg bg-(--navy) px-7 py-4 text-[15px] font-medium text-white shadow-[0_8px_22px_-8px_rgba(26,26,181,0.55)] hover:bg-(--navy-dark)"
              >
                Start the scorecard <ArrowRight size={17} />
              </button>
            </Reveal>
          )}

          {stage === "quiz" && (
            <div className="mx-auto max-w-3xl">
              <div className="flex items-center justify-between text-sm text-(--ink-soft)">
                <span>Question {i + 1} of {QUESTIONS.length}</span>
                <span className="font-medium text-(--navy-text)">{AREAS[QUESTIONS[i].area]}</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-(--line)">
                <div className="h-full rounded-full bg-(--navy) transition-all" style={{ width: `${(i / QUESTIONS.length) * 100}%` }} />
              </div>
              <div className={`${card} mt-8`}>
                <h2 className="text-2xl leading-snug sm:text-3xl">{QUESTIONS[i].q}</h2>
                <div className="mt-8 flex flex-col gap-3">
                  {QUESTIONS[i].options.map(([label], k) => (
                    <button
                      key={label}
                      onClick={() => choose(k)}
                      className={`rounded-lg border px-5 py-4 text-left text-[15px] transition-colors ${
                        answers[i] === k
                          ? "border-(--navy-text) bg-(--navy-text)/8 text-(--ink)"
                          : "border-(--line) bg-(--surface) text-(--ink) hover:border-(--navy-text)/60"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {i > 0 && (
                  <button
                    onClick={() => setI(i - 1)}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-(--navy-text)"
                  >
                    <ArrowLeft size={15} /> Back
                  </button>
                )}
              </div>
            </div>
          )}

          {stage === "details" && (
            <div className="mx-auto max-w-3xl">
              <h1 className="text-balance text-3xl leading-tight sm:text-4xl">Two more steps, then your results.</h1>
              <p className="mt-4 text-lg leading-relaxed text-(--ink-soft)">
                The calculator turns your answers into working hours. Your details let us send you the full report.
              </p>
              <form onSubmit={submit} className={`${card} mt-8 flex flex-col gap-5`}>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                <h2 className="text-xl">Your team</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="staff" className={labelClass}>Staff on Microsoft 365 in your team</label>
                    <input id="staff" name="staff" type="number" min={1} defaultValue={25} required className={field} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="salary" className={labelClass}>Average monthly salary per person (₦)</label>
                    <input id="salary" name="salary" type="number" min={0} step={1000} defaultValue={450000} required className={field} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="hours" className={labelClass}>Hours per person per week AI could take off routine work</label>
                  <input id="hours" name="hours" type="number" min={0} max={20} step={0.5} defaultValue={2} required className={field} />
                  <p className="text-sm text-(--ink-faint)">Use your own judgement. A cautious figure gives a more useful answer.</p>
                </div>

                <h2 className="mt-4 text-xl">About you</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {[
                    ["name", "Full name", "text", "name"],
                    ["title", "Job title", "text", "organization-title"],
                    ["org", "Organisation", "text", "organization"],
                    ["email", "Work email", "email", "email"],
                    ["whatsapp", "WhatsApp number", "tel", "tel"],
                  ].map(([id, label, type, ac]) => (
                    <div key={id} className="flex flex-col gap-2">
                      <label htmlFor={id} className={labelClass}>{label}</label>
                      <input id={id} name={id} type={type} autoComplete={ac} required className={field} />
                    </div>
                  ))}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="role" className={labelClass}>Your role</label>
                    <select id="role" name="role" required defaultValue="" className={`${field} cursor-pointer`}>
                      <option value="" disabled>Select</option>
                      {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="size" className={labelClass}>Total headcount of your organisation</label>
                  <select id="size" name="size" required defaultValue="" className={`${field} cursor-pointer`}>
                    <option value="" disabled>Select</option>
                    {SIZES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                </div>
                <label className="flex items-start gap-3 text-sm leading-relaxed text-(--ink-soft)">
                  <input type="checkbox" required className="mt-1" />
                  MorningEdge Systems may contact me by email and WhatsApp about my results. My details are handled
                  under the Nigeria Data Protection Act 2023 and are never sold or shared.
                </label>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="mt-1 inline-flex items-center justify-center gap-2 self-start rounded-md bg-(--navy) px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-(--navy-dark) disabled:opacity-60"
                >
                  {status === "loading" ? <><Loader2 size={16} className="animate-spin" /> Calculating</> : <>Show my results <ArrowRight size={16} /></>}
                </button>
              </form>
            </div>
          )}

          {stage === "results" && result && lead && (
            <Results result={result} lead={lead} saved={saved} />
          )}
        </Container>
      </section>
    </>
  );
}

function Results({ result, lead, saved }: { result: Result; lead: Lead; saved: boolean }) {
  const cap = capacity(lead.staff, lead.salary, lead.hours);
  const room = qualifiesForRoom(lead.role, lead.size);
  const weakest = AREAS[result.weakest];
  const text = room
    ? `Good day. I completed the Copilot Adoption Scorecard and scored ${result.total}/36 (${result.band.name}). My weakest area is ${weakest}. I would like to apply for The Room.`
    : `Good day. I completed the Copilot Adoption Scorecard and scored ${result.total}/36. I would like details of the next AI Edge Live Cohort.`;
  const wa = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <p className={labelClass}>Your Copilot Adoption Score</p>

      <div className={card}>
        <p className="text-6xl leading-none" style={{ fontFamily: "var(--font-serif)" }}>
          {result.total}<span className="text-2xl text-(--ink-faint)"> / 36</span>
        </p>
        <span className={`mt-5 inline-block rounded-full px-3 py-1 text-xs font-semibold ${toneClass[result.band.tone]}`}>
          {result.band.name}
        </span>
        <p className="mt-5 text-[15px] leading-relaxed text-(--ink)">{result.band.text}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-(--ink-soft)">{result.band.cost}</p>
      </div>

      <div className={card}>
        <h2 className="text-2xl">Your four areas</h2>
        <div className="mt-6 flex flex-col gap-4">
          {AREAS.map((a, k) => (
            <div key={a}>
              <div className="flex justify-between text-sm">
                <span className={k === result.weakest ? "font-medium text-(--navy-text)" : "text-(--ink)"}>{a}</span>
                <span className="text-(--ink-soft)">{result.areas[k]} / 9</span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-(--line)">
                <div
                  className={`h-full rounded-full ${k === result.weakest ? "bg-(--navy)" : "bg-(--ink)/25"}`}
                  style={{ width: `${(result.areas[k] / 9) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 border-l-2 border-(--navy-text) pl-5 text-[15px] leading-relaxed text-(--ink)">
          {WEAKEST_ACTION[result.weakest]}
        </p>
      </div>

      <div className={card}>
        <h2 className="text-2xl">Capacity your licence could already be giving back</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-3xl font-medium text-(--navy-text)">{Math.round(cap.monthlyHours).toLocaleString("en-NG")}</p>
            <p className="text-sm text-(--ink-soft)">working hours a month</p>
          </div>
          <div>
            <p className="text-3xl font-medium text-(--navy-text)">{formatNaira(cap.monthlyValue)}</p>
            <p className="text-sm text-(--ink-soft)">in salary time a month</p>
          </div>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-(--ink-faint)">
          Based on your own figures: {lead.staff} staff × {lead.hours} hours a week × 4.33 weeks, at an hourly cost of{" "}
          {formatNaira(cap.hourlyCost)} (monthly salary ÷ 173 hours). Treat it as an estimate of capacity and a
          starting baseline, rather than a promise of savings.
        </p>
      </div>

      <div className="section-glow rounded-2xl border border-(--line) p-6 sm:p-8 lg:p-10">
        {room ? (
          <>
            <h2 className="text-2xl sm:text-3xl">Your next step: The Room.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-(--ink-soft)">
              One hour with the Lead Consultant. You bring one real piece of work your team produces, and we build
              a working version of it in Copilot, live, on your own document. You leave with the build and a short
              map of where AI fits in your function. There is no fee. The Room is by application, so every session
              is run personally.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={wa} external size="lg">Apply for The Room on WhatsApp <ArrowRight size={17} /></ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">Use the contact form</ButtonLink>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl sm:text-3xl">Your next step.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-(--ink-soft)">
              The AI Edge Live Cohort teaches professionals to use Copilot inside the apps they already work in, on
              their own work, with a group of peers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={wa} external size="lg">Ask about the next cohort <ArrowRight size={17} /></ButtonLink>
              <ButtonLink href={site.cohortUrl} external variant="secondary" size="lg">Visit the cohort site</ButtonLink>
            </div>
          </>
        )}
      </div>

      <p className="text-sm text-(--ink-faint)">
        {saved
          ? "A copy of this report is on its way to your inbox. Ola or a member of the team will be in touch on WhatsApp."
          : `Your results could not be recorded on our side. Send them to us on WhatsApp or at ${site.email} and we will pick it up from there.`}
      </p>
    </div>
  );
}
