"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";

const SHEET_WEBHOOK_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK_URL ?? "";

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
      setError("Form is not yet configured. Please email us directly at morningedge@proton.me");
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
      setError("Something went wrong. Please try again or email us directly at morningedge@proton.me");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="py-16">
        <p className="text-2xl font-bold text-[#0A0A0A]" style={{ fontFamily: "var(--font-dm-sans)" }}>
          Inquiry received.
        </p>
        <p className="text-[#4A4A4A] mt-3">The MorningEdge team will be in touch within 48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-wide text-[#0A0A0A]">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="border border-gray-200 px-4 py-3 text-sm text-[#0A0A0A] bg-white focus:outline-none focus:border-[#1A1AB5] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wide text-[#0A0A0A]">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@organization.com"
            className="border border-gray-200 px-4 py-3 text-sm text-[#0A0A0A] bg-white focus:outline-none focus:border-[#1A1AB5] transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="organization" className="text-xs font-bold uppercase tracking-wide text-[#0A0A0A]">Organization</label>
          <input
            id="organization"
            name="organization"
            type="text"
            placeholder="Company or firm name"
            className="border border-gray-200 px-4 py-3 text-sm text-[#0A0A0A] bg-white focus:outline-none focus:border-[#1A1AB5] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="service" className="text-xs font-bold uppercase tracking-wide text-[#0A0A0A]">Area of Interest</label>
          <select
            id="service"
            name="service"
            className="border border-gray-200 px-4 py-3 text-sm text-[#4A4A4A] bg-white focus:outline-none focus:border-[#1A1AB5] transition-colors"
          >
            <option value="">Select a service area</option>
            <option value="operations">Operations Architecture</option>
            <option value="ai">AI Systems Integration</option>
            <option value="executive">Executive Development</option>
            <option value="other">Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="challenge" className="text-xs font-bold uppercase tracking-wide text-[#0A0A0A]">What challenge are you facing?</label>
        <input
          id="challenge"
          name="challenge"
          type="text"
          placeholder="Describe the problem or goal briefly"
          className="border border-gray-200 px-4 py-3 text-sm text-[#0A0A0A] bg-white focus:outline-none focus:border-[#1A1AB5] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wide text-[#0A0A0A]">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us more about your organization and what you are looking to accomplish."
          className="border border-gray-200 px-4 py-3 text-sm text-[#0A0A0A] bg-white focus:outline-none focus:border-[#1A1AB5] transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-[#1A1AB5] text-white px-8 py-4 text-sm font-semibold hover:bg-[#1515A3] transition-colors self-start uppercase tracking-wide disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading && <Loader2 size={14} className="animate-spin" />}
        {loading ? "Sending..." : "Submit Inquiry"}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#0A0A0A] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[#22D3EE] text-xs font-bold uppercase tracking-[0.2em] mb-6">Contact</p>
            <h1
              className="text-5xl lg:text-6xl font-black text-white max-w-3xl leading-tight mb-6"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Start an Engagement.
            </h1>
            <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
              The right engagement starts with the right conversation. Tell us about your organization. We will tell you how MorningEdge can help.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form + Info */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Form */}
          <div className="lg:col-span-2">
            <FadeIn>
              <p className="text-[#1A1AB5] text-xs font-bold uppercase tracking-[0.2em] mb-8">Inquiry Form</p>
              <ContactForm />
            </FadeIn>
          </div>

          {/* Contact Info */}
          <FadeIn direction="right" delay={0.1}>
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-[#1A1AB5] text-xs font-bold uppercase tracking-[0.2em] mb-6">Get in Touch</p>
                <div className="flex flex-col gap-5">
                  <div className="flex items-start gap-4">
                    <div className="text-[#1A1AB5] w-8 h-8 flex items-center justify-center bg-[#1A1AB5]/10 flex-shrink-0 mt-0.5">
                      <Mail size={14} />
                    </div>
                    <div>
                      <p className="text-[#0A0A0A] text-xs font-bold uppercase tracking-wide mb-1">Email</p>
                      <a
                        href="mailto:morningedge@proton.me"
                        className="text-[#4A4A4A] text-sm hover:text-[#1A1AB5] transition-colors"
                      >
                        morningedge@proton.me
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-[#1A1AB5] w-8 h-8 flex items-center justify-center bg-[#1A1AB5]/10 flex-shrink-0 mt-0.5">
                      <Phone size={14} />
                    </div>
                    <div>
                      <p className="text-[#0A0A0A] text-xs font-bold uppercase tracking-wide mb-1">Phone</p>
                      <a
                        href="tel:+2348100526153"
                        className="text-[#4A4A4A] text-sm hover:text-[#1A1AB5] transition-colors"
                      >
                        +234 810 052 6153
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-[#1A1AB5] w-8 h-8 flex items-center justify-center bg-[#1A1AB5]/10 flex-shrink-0 mt-0.5">
                      <MapPin size={14} />
                    </div>
                    <div>
                      <p className="text-[#0A0A0A] text-xs font-bold uppercase tracking-wide mb-1">Location</p>
                      <p className="text-[#4A4A4A] text-sm">Lagos, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F7F7F7] p-8">
                <p className="text-[#1A1AB5] text-xs font-bold uppercase tracking-[0.2em] mb-4">Response Time</p>
                <p className="text-[#4A4A4A] text-sm leading-relaxed">
                  All inquiries receive a response within 48 business hours. For urgent matters, please call directly.
                </p>
              </div>

              <div className="bg-[#0A0A0A] p-8">
                <p className="text-[#22D3EE] text-xs font-bold uppercase tracking-[0.2em] mb-4">Best Fit For</p>
                {[
                  "Founders scaling past 10 people",
                  "Executives restructuring operations",
                  "Organizations integrating AI",
                  "Leadership teams seeking development",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 mb-3">
                    <span className="w-1 h-4 bg-[#1A1AB5] mt-0.5 flex-shrink-0" />
                    <p className="text-gray-400 text-xs leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
