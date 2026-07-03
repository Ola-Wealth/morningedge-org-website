"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import PillBadge from "@/components/PillBadge";
import { Mail, Phone, MapPin, Loader2, ArrowRight } from "lucide-react";

const SHEET_WEBHOOK_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL ?? "";

const inputClass =
  "border border-[#E5E7EB] rounded-2xl px-5 py-3.5 text-sm text-[#0A0A0A] bg-white placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#1A1AB5] focus:ring-4 focus:ring-[#1A1AB5]/10 transition-all duration-200";

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name:         (form.elements.namedItem("name")         as HTMLInputElement).value.trim(),
      email:        (form.elements.namedItem("email")        as HTMLInputElement).value.trim(),
      organization: (form.elements.namedItem("organization") as HTMLInputElement).value.trim(),
      service_area: (form.elements.namedItem("service")      as HTMLSelectElement).value,
      challenge:    (form.elements.namedItem("challenge")    as HTMLInputElement).value.trim(),
      message:      (form.elements.namedItem("message")      as HTMLTextAreaElement).value.trim(),
      timestamp:    new Date().toISOString(),
    };

    if (!SHEET_WEBHOOK_URL) {
      setError("Form is not yet configured. Please email us directly at info@morningedgesystems.com");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(SHEET_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (!res.ok || result.result !== "success") {
        throw new Error(result.error || "Webhook did not confirm success");
      }
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly at info@morningedgesystems.com");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="bg-[#F5F6F8] rounded-[28px] p-10 lg:p-14 text-center">
        <div className="w-14 h-14 rounded-full bg-[#1A1AB5]/10 text-[#1A1AB5] flex items-center justify-center mx-auto mb-6">
          <Mail size={22} />
        </div>
        <p className="text-2xl font-black text-[#0A0A0A] tracking-tight">Inquiry received.</p>
        <p className="text-[#4A4A4A] mt-3">The MorningEdge team will be in touch within 48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-wide text-[#0A0A0A]">Full Name</label>
          <input id="name" name="name" type="text" required placeholder="Your full name" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wide text-[#0A0A0A]">Email Address</label>
          <input id="email" name="email" type="email" required placeholder="you@organization.com" className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="organization" className="text-xs font-bold uppercase tracking-wide text-[#0A0A0A]">Organization</label>
          <input id="organization" name="organization" type="text" placeholder="Company or firm name" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="service" className="text-xs font-bold uppercase tracking-wide text-[#0A0A0A]">Area of Interest</label>
          <select id="service" name="service" className={`${inputClass} text-[#4A4A4A] cursor-pointer`}>
            <option value="">Select a service area</option>
            <option value="operations">Operations Architecture</option>
            <option value="ai">AI Systems Integration</option>
            <option value="executive">Executive Development</option>
            <option value="other">Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="challenge" className="text-xs font-bold uppercase tracking-wide text-[#0A0A0A]">What challenge are you facing?</label>
        <input id="challenge" name="challenge" type="text" placeholder="Describe the problem or goal briefly" className={inputClass} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wide text-[#0A0A0A]">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us more about your organization and what you are looking to accomplish."
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-2xl px-5 py-3.5">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex items-center gap-3 bg-[#1A1AB5] text-white rounded-full pl-7 pr-2 py-2 text-sm font-semibold hover:bg-[#1515A3] transition-colors self-start disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {loading ? "Sending..." : "Submit Inquiry"}
        <span className="w-9 h-9 rounded-full bg-white text-[#1A1AB5] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
          {loading ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
        </span>
      </button>
    </form>
  );
}

const contactInfo = [
  {
    icon: <Mail size={16} />,
    label: "Email",
    value: "info@morningedgesystems.com",
    href: "mailto:info@morningedgesystems.com",
  },
  {
    icon: <Phone size={16} />,
    label: "Phone",
    value: "+234 810 052 6153",
    href: "tel:+2348100526153",
  },
  {
    icon: <MapPin size={16} />,
    label: "Location",
    value: "Lagos, Nigeria",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── HEADER ── */}
      <section className="bg-white pt-16 pb-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col items-start gap-6">
              <PillBadge>Contact</PillBadge>
              <h1
                className="text-[#0A0A0A] font-black leading-[1.05] tracking-tight max-w-3xl"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 72px)", letterSpacing: "-0.03em" }}
              >
                Start an <span className="text-[#1A1AB5]">Engagement.</span>
              </h1>
              <p className="text-[#4A4A4A] text-lg leading-relaxed max-w-xl">
                The right engagement starts with the right conversation. Tell us about your organization. We will tell you how MorningEdge can help.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="bg-white pb-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-2">
            <FadeIn>
              <div className="bg-[#F5F6F8] rounded-[28px] p-6 sm:p-10">
                <PillBadge>Inquiry Form</PillBadge>
                <div className="mt-7">
                  <ContactForm />
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Contact Info */}
          <FadeIn direction="right" delay={0.1}>
            <div className="flex flex-col gap-5">
              <div className="bg-white border border-[#EEF0F2] rounded-[28px] p-7">
                <PillBadge>Get in Touch</PillBadge>
                <div className="flex flex-col gap-4 mt-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-full bg-[#1A1AB5]/10 text-[#1A1AB5] flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[#0A0A0A] text-xs font-bold uppercase tracking-wide mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-[#4A4A4A] text-sm hover:text-[#1A1AB5] transition-colors break-all">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-[#4A4A4A] text-sm">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#F5F6F8] rounded-[28px] p-7">
                <p className="text-[#1A1AB5] text-xs font-bold uppercase tracking-[0.15em] mb-3">Response Time</p>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">
                  All inquiries receive a response within 48 business hours. For urgent matters, please call directly.
                </p>
              </div>

              <div className="bg-[#0A0A0A] rounded-[28px] p-7">
                <PillBadge dark>Best Fit For</PillBadge>
                <div className="flex flex-col gap-3 mt-5">
                  {[
                    "Founders scaling past 10 people",
                    "Executives restructuring operations",
                    "Organizations integrating AI",
                    "Leadership teams seeking development",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] mt-1.5 flex-shrink-0" />
                      <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
