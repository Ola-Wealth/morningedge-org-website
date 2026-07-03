import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PillBadge from "@/components/PillBadge";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About the Firm",
  description:
    "MorningEdge Systems is a business operations and AI consultancy built on the conviction that execution is not an accident — it is architecture. Learn about our firm, founding story, and operating principles.",
  alternates: { canonical: "https://www.morningedgesystems.com/about" },
  openGraph: {
    title: "About the Firm | MorningEdge Systems",
    description:
      "Founded in 2022, MorningEdge Systems helps organizations move from fragmented execution to structured, scalable systems. Learn how we work.",
    url: "https://www.morningedgesystems.com/about",
  },
};

const values = [
  {
    number: "01",
    title: "Clarity before complexity.",
    description:
      "Every engagement begins with an honest picture of what is actually happening. We do not prescribe before we diagnose. We do not design before we understand. Clarity is not a step. It is a discipline.",
  },
  {
    number: "02",
    title: "Systems over heroics.",
    description:
      "A business dependent on exceptional individuals is one departure away from dysfunction. MorningEdge builds structures that outlast any single person, including our own involvement.",
  },
  {
    number: "03",
    title: "Execution as the measure.",
    description:
      "We measure success by what actually gets done. Not by the elegance of the strategy. Not by the quality of the presentation. By whether the organization moves, and whether the movement produces results.",
  },
];

const milestones = [
  { year: "2022", event: "MorningEdge founded as an operational advisory practice." },
  { year: "2023", event: "First cross-industry engagements across operations design and business development. AI systems practice launched." },
  { year: "2024", event: "Executive Education and speaking practice formalized. First leadership programs delivered." },
  { year: "2025", event: "Expanded client base across Africa and international markets." },
  { year: "2026", event: "MorningEdge Systems operates across three disciplines: Operations, AI Systems, Executive Development." },
];

const differences = [
  "We lead with diagnosis, not prescription.",
  "We build for the organization, not for the engagement.",
  "We measure success by execution outcomes, not deliverable count.",
  "We work in the real workflow, not around it.",
];

export default function AboutPage() {
  return (
    <>
      {/* ── HEADER ── */}
      <section className="bg-white pt-16 pb-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col items-start gap-6">
              <PillBadge>About the Firm</PillBadge>
              <h1
                className="text-[#0A0A0A] font-black leading-[1.05] tracking-tight max-w-3xl"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 72px)", letterSpacing: "-0.03em" }}
              >
                Built on a single <span className="text-[#1A1AB5]">conviction.</span>
              </h1>
              <p className="text-[#4A4A4A] text-lg leading-relaxed max-w-2xl">
                MorningEdge was founded on the belief that most business problems are not talent problems. They are systems problems. And systems problems have structural solutions.
              </p>
            </div>
          </FadeIn>

          {/* Header image card */}
          <FadeIn delay={0.15}>
            <div className="relative rounded-[28px] overflow-hidden h-[320px] lg:h-[440px] mt-12">
              <Image
                src="/pictures/about-header.jpg"
                alt="MorningEdge Systems team in session"
                fill
                priority
                className="object-cover object-[center_28%]"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-lg lg:text-xl font-bold max-w-lg leading-snug">
                  Most business problems are systems problems. We build the systems.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MISSION + DIFFERENCE ── */}
      <section className="bg-white py-16 lg:py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          <FadeIn direction="left">
            <div className="flex flex-col items-start gap-6">
              <PillBadge>Our Mission</PillBadge>
              <h2
                className="text-[#0A0A0A] font-black tracking-tight leading-tight"
                style={{ fontSize: "clamp(1.6rem, 2.6vw, 38px)", letterSpacing: "-0.02em" }}
              >
                To design the operational architecture that allows organizations to scale with intention and execute with discipline.
              </h2>
              <p className="text-[#4A4A4A] leading-relaxed">
                MorningEdge works with founders, executives, and leadership teams who have recognized that ambition alone does not produce results. Structure produces results. Systems produce results. Disciplined execution, repeated consistently over time, produces results.
              </p>
              <p className="text-[#4A4A4A] leading-relaxed">
                Our work spans operations design, AI systems integration, and executive development. Every discipline connects back to the same outcome: organizations that can execute what they plan, sustain what they build, and scale without falling apart.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <div className="bg-[#F5F6F8] rounded-[28px] p-8 lg:p-10 flex flex-col gap-6">
              <PillBadge>The MorningEdge Difference</PillBadge>
              <div className="flex flex-col gap-4">
                {differences.map((point) => (
                  <div key={point} className="flex items-start gap-4 bg-white rounded-2xl px-5 py-4 transition-transform duration-300 hover:-translate-y-0.5">
                    <span className="w-6 h-6 rounded-full bg-[#1A1AB5]/10 text-[#1A1AB5] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <p className="text-[#0A0A0A] text-sm font-medium leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── COMMITMENTS ── */}
      <section className="bg-[#F5F6F8] py-16 lg:py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col items-start gap-5 mb-12">
              <PillBadge>Our Commitments</PillBadge>
              <h2
                className="text-[#0A0A0A] font-black tracking-tight"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}
              >
                Three principles. Every engagement.
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <FadeIn key={v.number} delay={i * 0.08}>
                <div className={`rounded-[24px] p-8 flex flex-col gap-4 h-full transition-all duration-300 hover:-translate-y-1.5 ${
                  i === 1
                    ? "bg-[#0A0A0A] hover:shadow-[0_24px_48px_-24px_rgba(10,10,10,0.5)]"
                    : "bg-white border border-[#EEF0F2] hover:shadow-[0_24px_48px_-24px_rgba(10,10,10,0.18)]"
                }`}>
                  <span className={`text-4xl font-black ${i === 1 ? "text-white/15" : "text-[#E5E7EB]"}`}>{v.number}</span>
                  <h3 className={`text-xl font-bold ${i === 1 ? "text-white" : "text-[#0A0A0A]"}`}>{v.title}</h3>
                  <p className={`text-sm leading-relaxed ${i === 1 ? "text-gray-400" : "text-[#4A4A4A]"}`}>{v.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="bg-white py-16 lg:py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="flex flex-col items-start gap-5 mb-12">
              <PillBadge>The Firm&apos;s History</PillBadge>
              <h2
                className="text-[#0A0A0A] font-black tracking-tight"
                style={{ fontSize: "clamp(1.9rem, 3.5vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}
              >
                How we got here.
              </h2>
            </div>
          </FadeIn>
          <div className="flex flex-col">
            {milestones.map((m, i) => (
              <FadeIn key={m.year} delay={i * 0.06}>
                <div className="group flex gap-6 sm:gap-8 items-stretch relative">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#F5F6F8] border border-[#E5E7EB] text-[#1A1AB5] flex items-center justify-center text-[11px] font-black flex-shrink-0 transition-colors duration-300 group-hover:bg-[#1A1AB5] group-hover:text-white">
                      {m.year.slice(2)}
                    </div>
                    {i < milestones.length - 1 && <div className="w-px flex-1 bg-[#E5E7EB] my-2" />}
                  </div>
                  <div className="pb-10">
                    <p className="text-[#1A1AB5] text-xs font-bold uppercase tracking-widest mb-1.5">{m.year}</p>
                    <p className="text-[#4A4A4A] text-sm sm:text-base leading-relaxed">{m.event}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA CARD ── */}
      <section className="bg-white pb-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="relative bg-[#0A0A0A] rounded-[32px] overflow-hidden px-8 py-14 lg:px-16 lg:py-18 text-center">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#1A1AB5]/25 blur-3xl" />
              <div className="relative flex flex-col items-center gap-6">
                <PillBadge dark>Work With Us</PillBadge>
                <h2
                  className="text-white font-black tracking-tight max-w-2xl"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 44px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
                >
                  The right engagement starts with the right conversation.
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                  If you are building something that requires the kind of operational discipline MorningEdge brings, we want to hear about it.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-white text-[#0A0A0A] rounded-full pl-7 pr-2 py-2 text-sm font-semibold hover:bg-[#22D3EE] transition-colors cursor-pointer"
                >
                  Contact the Firm
                  <span className="w-9 h-9 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
