"use client";

import { useState } from "react";
import { Loader2, ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Eyebrow } from "@/components/primitives";
import { site } from "@/lib/site";

const field =
  "w-full rounded-md border border-[#E4DED0] bg-white px-4 py-3 text-[15px] text-[#17150F] placeholder:text-[#B0AA9C] focus:border-[#1A1AB5] focus:outline-none focus:ring-2 focus:ring-[#1A1AB5]/20 transition-colors";
const labelClass = "text-xs font-semibold uppercase tracking-wide text-[#4A463C]";

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok || result.result !== "success") {
        throw new Error(result.error || "The form did not go through.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        `Something went wrong. Please email us directly at ${site.email}.`
      );
      void err;
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-[#E4DED0] bg-white p-10 shadow-soft lg:p-14">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1A1AB5]/10 text-[#1A1AB5]">
          <Check size={22} />
        </div>
        <h2 className="mt-6 text-2xl">Received.</h2>
        <p className="mt-3 measure text-[15px] leading-relaxed text-[#4A463C]">
          We read every enquiry ourselves and reply within two business days. If it is a fit, the next step
          is a diagnostic. If it is not, we will tell you that too.
        </p>
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
          <label htmlFor="company" className={labelClass}>Company</label>
          <input id="company" name="company" type="text" required placeholder="Company name" className={field} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="role" className={labelClass}>Your role</label>
          <input id="role" name="role" type="text" required placeholder="e.g. Managing Director" className={field} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="employees" className={labelClass}>Number of staff</label>
          <select id="employees" name="employees" className={`${field} cursor-pointer`} defaultValue="">
            <option value="" disabled>Select</option>
            <option>Under 50</option>
            <option>50 to 200</option>
            <option>201 to 500</option>
            <option>Over 500</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="entities" className={labelClass}>Number of entities or locations</label>
          <select id="entities" name="entities" className={`${field} cursor-pointer`} defaultValue="">
            <option value="" disabled>Select</option>
            <option>One</option>
            <option>Two to five</option>
            <option>Six or more</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="systems" className={labelClass}>Current systems in use</label>
        <input id="systems" name="systems" type="text" placeholder="e.g. Excel, Sage, QuickBooks, in-house tools" className={field} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="pillar" className={labelClass}>What are you here for</label>
        <select id="pillar" name="pillar" className={`${field} cursor-pointer`} defaultValue="">
          <option value="" disabled>Select</option>
          <option>The AI Edge: enabling my people</option>
          <option>The Operations Core: ERP on one system</option>
          <option>The Operations Core: AI Integration</option>
          <option>Not sure yet</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="breaking" className={labelClass}>What is breaking</label>
        <textarea
          id="breaking"
          name="breaking"
          rows={5}
          required
          placeholder="Describe what is not working, and what it is costing you."
          className={`${field} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-1 inline-flex items-center justify-center gap-2 self-start rounded-md bg-[#1A1AB5] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#14149A] disabled:opacity-60"
      >
        {status === "loading" ? <><Loader2 size={16} className="animate-spin" /> Sending</> : <>Book a diagnostic <ArrowRight size={16} /></>}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-4xl">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Tell us what is breaking.
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-[#4A463C]">
              This is a qualifying form, not a mailbox. The more precise you are about the problem, the
              faster we can tell you whether we are the right firm for it. Not every enquiry becomes an
              engagement, and we will say so plainly.
            </p>
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
            <Reveal className="lg:col-span-2">
              <ContactForm />
            </Reveal>

            <Reveal delay={100}>
              <div className="flex flex-col gap-8 rounded-2xl border border-[#E4DED0] bg-white p-8 shadow-soft">
                <div>
                  <p className={labelClass}>Direct</p>
                  <div className="mt-3 flex flex-col gap-1.5 text-[15px]">
                    <a href={`mailto:${site.email}`} className="text-[#1A1AB5] hover:underline">{site.email}</a>
                    <a href={site.phoneHref} className="text-[#17150F] hover:text-[#1A1AB5]">{site.phone}</a>
                    <span className="text-[#4A463C]">{site.location}</span>
                  </div>
                </div>
                <div className="border-t border-[#E4DED0] pt-8">
                  <p className={labelClass}>Response time</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#4A463C]">
                    We read every enquiry ourselves and reply within two business days. For anything urgent,
                    call directly.
                  </p>
                </div>
                <div className="border-t border-[#E4DED0] pt-8">
                  <p className={labelClass}>Best fit</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#4A463C]">
                    Companies of 50 to 500 staff, two or more entities, closing books in spreadsheets, or a
                    function ready to get real work out of the tools it already pays for.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
