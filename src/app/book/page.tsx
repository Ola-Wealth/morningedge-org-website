"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowRight, Check, Users, MessageSquare } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container } from "@/components/primitives";
import { site } from "@/lib/site";
import { BANK, CONSULTATION, SLOTS, approxUsd, bankPublished, formatNaira } from "@/lib/booking";

type Confirmation = { reference: string; when: string; amountNaira: number };

const field =
  "w-full rounded-md border border-(--line) bg-(--surface) px-4 py-3 text-[15px] text-(--ink) placeholder:text-(--ink-faint) focus:border-(--navy-text) focus:outline-none focus:ring-2 focus:ring-(--navy-text)/20 transition-colors";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-(--ink-soft)";

type BookingType = "" | "Training" | "Consultation";

const TYPES: { value: Exclude<BookingType, "">; icon: typeof Users; title: string; blurb: string; price: string }[] = [
  {
    value: "Training",
    icon: Users,
    title: "A training",
    blurb: "A session for a team or a function, built around the work they actually do.",
    price: "Quoted after we scope it",
  },
  {
    value: "Consultation",
    icon: MessageSquare,
    title: "A consultation",
    blurb: "One hour on one decision you are carrying. Weekday evenings.",
    price: `${formatNaira(CONSULTATION.amountNaira)} for the hour`,
  },
];

function isWeekend(value: string) {
  const parts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!parts) return false;
  const day = new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3])).getUTCDay();
  return day === 0 || day === 6;
}

function BookingForm() {
  const [type, setType] = useState<BookingType>("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [minDate, setMinDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  // Resolved after mount so the server and client render the same markup.
  useEffect(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    setMinDate(d.toISOString().slice(0, 10));
  }, []);

  function handleDate(e: React.ChangeEvent<HTMLInputElement>) {
    setDateError(isWeekend(e.target.value) ? "Consultations run Monday to Friday. Please pick a weekday." : "");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (dateError) return;
    setStatus("loading");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok || result.result !== "success") {
        throw new Error(result.error || "The request did not go through.");
      }
      if (result.reference) {
        setConfirmation({
          reference: result.reference,
          when: result.when ?? "",
          amountNaira: result.amountNaira ?? CONSULTATION.amountNaira,
        });
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message
          ? `${err.message} You can also email ${site.email}.`
          : `Something went wrong. Please email directly at ${site.email}.`
      );
    }
  }

  if (status === "sent") {
    return (
      <div className="card-sheen rounded-2xl border border-(--line) bg-(--surface) p-10 shadow-soft lg:p-14">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--navy-text)/10 text-(--navy-text)">
          <Check size={22} />
        </div>

        {confirmation ? (
          <>
            <h2 className="mt-6 text-2xl">Slot held. One step left.</h2>
            <p className="measure mt-3 text-[15px] leading-relaxed text-(--ink-soft)">
              {confirmation.when} is pencilled in. It is confirmed once the fee lands, so please
              transfer {formatNaira(confirmation.amountNaira)} quoting the reference below. The
              meeting link follows by email.
            </p>

            <div className="mt-8 rounded-xl border border-(--line) bg-(--panel) p-5">
              <p className={labelClass}>Your reference</p>
              <p className="mt-2 font-mono text-lg tracking-wide text-(--ink)">{confirmation.reference}</p>
              <p className="mt-2 text-[13px] text-(--ink-faint)">
                Put this in the transfer narration. It is how your payment is matched to this booking.
              </p>
            </div>

            {bankPublished ? (
              <div className="mt-4 rounded-xl border border-(--line) bg-(--panel) p-5">
                <p className={labelClass}>Pay into</p>
                <dl className="mt-3 flex flex-col gap-2 text-[15px]">
                  <div className="flex flex-wrap gap-x-3">
                    <dt className="w-28 flex-shrink-0 text-(--ink-faint)">Bank</dt>
                    <dd className="text-(--ink)">{BANK.name}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-3">
                    <dt className="w-28 flex-shrink-0 text-(--ink-faint)">Account name</dt>
                    <dd className="text-(--ink)">{BANK.accountName}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-3">
                    <dt className="w-28 flex-shrink-0 text-(--ink-faint)">Account number</dt>
                    <dd className="font-mono text-(--ink)">{BANK.number}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-3">
                    <dt className="w-28 flex-shrink-0 text-(--ink-faint)">Amount</dt>
                    <dd className="text-(--ink)">{formatNaira(confirmation.amountNaira)}</dd>
                  </div>
                </dl>
              </div>
            ) : (
              <p className="measure mt-4 text-[15px] leading-relaxed text-(--ink-soft)">
                The account details are on their way to you by email.
              </p>
            )}

            <p className="measure mt-6 text-[15px] leading-relaxed text-(--ink-soft)">
              A copy of all of this has been emailed to you. If you need a different time, reply to it.
            </p>
          </>
        ) : (
          <>
            <h2 className="mt-6 text-2xl">Request received.</h2>
            <p className="measure mt-3 text-[15px] leading-relaxed text-(--ink-soft)">
              Olamilekan reads these himself and replies within two business days to scope the session
              and quote it. If what you need is not a fit, you will be told that plainly.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>Your name</label>
          <input id="name" name="name" type="text" required placeholder="Full name" className={field} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" name="email" type="email" required placeholder="you@company.com" className={field} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className={labelClass}>Firm</label>
          <input id="company" name="company" type="text" required placeholder="Company or organisation" className={field} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className={labelClass}>Your role</label>
          <input id="role" name="role" type="text" placeholder="e.g. Managing Director" className={field} />
        </div>
      </div>

      {/* Booking type: the rest of the form depends on this answer. */}
      <fieldset className="mt-2 flex flex-col gap-3">
        <legend className={`${labelClass} mb-3`}>What are you booking</legend>
        <input type="hidden" name="bookingType" value={type} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TYPES.map(({ value, icon: Icon, title, blurb, price }) => {
            const active = type === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => { setType(value); setDateError(""); }}
                aria-pressed={active}
                className={`pressable flex h-full flex-col gap-2 rounded-xl border p-5 text-left transition-colors ${
                  active
                    ? "border-(--navy-text) bg-(--navy-text)/8 shadow-soft"
                    : "border-(--line) bg-(--surface) hover:border-(--ink)/30"
                }`}
              >
                <span className={active ? "text-(--navy-text)" : "text-(--ink-faint)"}>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="text-[15px] font-medium text-(--ink)">{title}</span>
                <span className="text-[13.5px] leading-relaxed text-(--ink-soft)">{blurb}</span>
                <span className="mt-1 text-[13px] font-medium text-(--ink-faint)">{price}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {type && (
        <div className="flex flex-col gap-5 border-t border-(--line) pt-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="attendees" className={labelClass}>
                {type === "Training" ? "How many attend" : "Who joins the call"}
              </label>
              {type === "Training" ? (
                <select id="attendees" name="attendees" required className={`${field} cursor-pointer`} defaultValue="">
                  <option value="" disabled>Select</option>
                  <option>Under 10</option>
                  <option>10 to 25</option>
                  <option>26 to 50</option>
                  <option>Over 50</option>
                </select>
              ) : (
                <input
                  id="attendees"
                  name="attendees"
                  type="text"
                  required
                  placeholder="Just me, or names of others joining"
                  className={field}
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="attendeeRoles" className={labelClass}>
                {type === "Training" ? "Which function" : "Their roles"}
              </label>
              <input
                id="attendeeRoles"
                name="attendeeRoles"
                type="text"
                placeholder={type === "Training" ? "e.g. Finance, HR, Sales" : "e.g. Finance Director"}
                className={field}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="format" className={labelClass}>Format</label>
              <select id="format" name="format" className={`${field} cursor-pointer`} defaultValue="">
                <option value="" disabled>Select</option>
                <option>Virtual</option>
                <option>In person, Lagos</option>
                <option>In person, elsewhere in Nigeria</option>
              </select>
            </div>

            {type === "Training" ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="timing" className={labelClass}>Preferred timing</label>
                <input
                  id="timing"
                  name="timing"
                  type="text"
                  placeholder="e.g. a weekend in November"
                  className={field}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <label htmlFor="time" className={labelClass}>Time, WAT</label>
                <select id="time" name="time" required className={`${field} cursor-pointer`} defaultValue="">
                  <option value="" disabled>Select</option>
                  {SLOTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            )}
          </div>

          {type === "Consultation" && (
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className={labelClass}>Date</label>
              <input
                id="date"
                name="date"
                type="date"
                required
                min={minDate || undefined}
                onChange={handleDate}
                className={`${field} cursor-pointer`}
              />
              <p className="text-[13px] text-(--ink-faint)">
                Monday to Friday, from 5pm Lagos time.
              </p>
              {dateError && <p className="text-[13px] text-(--accent)">{dateError}</p>}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="reason" className={labelClass}>
              {type === "Training" ? "Why this training, and for what" : "What do you want to work through"}
            </label>
            <textarea
              id="reason"
              name="reason"
              rows={5}
              required
              placeholder={
                type === "Training"
                  ? "What are people doing by hand today, and what should change?"
                  : "Describe the decision in front of you and what is making it hard."
              }
              className={`${field} resize-none`}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="outcome" className={labelClass}>What should be true afterwards</label>
            <input
              id="outcome"
              name="outcome"
              type="text"
              placeholder="The one thing that tells you it worked"
              className={field}
            />
          </div>
        </div>
      )}

      {status === "error" && (
        <p className="rounded-md border border-(--accent)/40 bg-(--accent)/10 px-4 py-3 text-sm text-(--accent)">
          {errorMsg}
        </p>
      )}

      {type === "Consultation" && (
        <div className="rounded-xl border border-(--line) bg-(--panel) p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <span className="text-[15px] font-medium text-(--ink)">
              One hour, {formatNaira(CONSULTATION.amountNaira)}
            </span>
            <span className="text-[13px] text-(--ink-faint)">
              {`about US$${approxUsd()} at today’s rate`}
            </span>
          </div>
          <p className="mt-2 text-[13.5px] leading-relaxed text-(--ink-soft)">
            Paid by transfer into the MorningEdge account. You get the account details and a payment
            reference on the next screen. The slot is confirmed, and the meeting link sent, once the
            transfer lands.
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !type}
        className="mt-1 inline-flex items-center justify-center gap-2 self-start rounded-md bg-(--navy) px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-(--navy-dark) disabled:opacity-50"
      >
        {status === "loading"
          ? <><Loader2 size={16} className="animate-spin" /> Sending</>
          : <>
              {type === "Training" ? "Request this training" : "Hold this slot"}
              <ArrowRight size={16} />
            </>}
      </button>
    </form>
  );
}

export default function BookPage() {
  return (
    <>
      <section className="border-b border-(--line)">
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-4xl">
            <h1 className="text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Book Olamilekan.
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-(--ink-soft)">
              Two reasons people book. Either you want a session run for your people, or you want an hour
              on one decision you are carrying. Say which, tell us who is in the room, and be specific
              about what you want to be different afterwards.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="section-glow">
        <Container className="py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            <Reveal className="lg:col-span-2">
              <BookingForm />
            </Reveal>

            <Reveal delay={100}>
              <div className="card-sheen flex flex-col gap-8 rounded-2xl border border-(--line) bg-(--surface) p-8 shadow-soft">
                <div>
                  <p className={labelClass}>Consultation hours</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-(--ink-soft)">
                    Monday to Friday, from 5pm Lagos time. One hour,{" "}
                    {formatNaira(CONSULTATION.amountNaira)}, paid up front. Trainings are scheduled
                    separately and quoted after we scope them.
                  </p>
                </div>
                <div className="border-t border-(--line) pt-8">
                  <p className={labelClass}>Who you get</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-(--ink-soft)">
                    Olamilekan leads every engagement personally. The person you book is the person who
                    runs the room.
                  </p>
                </div>
                <div className="border-t border-(--line) pt-8">
                  <p className={labelClass}>Direct</p>
                  <div className="mt-3 flex flex-col gap-1.5 text-[15px]">
                    <a href={`mailto:${site.email}`} className="text-(--navy-text) hover:underline">{site.email}</a>
                    <a href={site.phoneHref} className="text-(--ink) hover:text-(--navy-text)">{site.phone}</a>
                    <span className="text-(--ink-soft)">{site.location}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
