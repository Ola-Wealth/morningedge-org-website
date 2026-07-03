import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About the Firm",
  description:
    "MorningEdge Systems is a business operations and AI consultancy built on the conviction that execution is not an accident — it is architecture. Learn about our firm, founding story, and operating principles.",
  alternates: { canonical: "https://morningedgesystems.com/about" },
  openGraph: {
    title: "About the Firm | MorningEdge Systems",
    description:
      "Founded in 2022, MorningEdge Systems helps organizations move from fragmented execution to structured, scalable systems. Learn how we work.",
    url: "https://morningedgesystems.com/about",
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

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-[#0A0A0A] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[#22D3EE] text-xs font-bold uppercase tracking-[0.2em] mb-6">About the Firm</p>
            <h1
              className="text-5xl lg:text-6xl font-black text-white max-w-3xl leading-tight mb-8"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Built on a single conviction.
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              MorningEdge was founded on the belief that most business problems are not talent problems. They are systems problems. And systems problems have structural solutions.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <FadeIn direction="left">
            <div>
              <p className="text-[#1A1AB5] text-xs font-bold uppercase tracking-[0.2em] mb-6">Our Mission</p>
              <h2
                className="text-3xl font-bold text-[#0A0A0A] leading-snug mb-6"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                To design the operational architecture that allows organizations to scale with intention and execute with discipline.
              </h2>
              <p className="text-[#4A4A4A] leading-relaxed mb-4">
                MorningEdge works with founders, executives, and leadership teams who have recognized that ambition alone does not produce results. Structure produces results. Systems produce results. Disciplined execution, repeated consistently over time, produces results.
              </p>
              <p className="text-[#4A4A4A] leading-relaxed">
                Our work spans operations design, AI systems integration, and executive development. Every discipline connects back to the same outcome: organizations that can execute what they plan, sustain what they build, and scale without falling apart.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.1}>
            <div className="bg-[#F7F7F7] p-10 flex flex-col gap-6">
              <p className="text-[#1A1AB5] text-xs font-bold uppercase tracking-[0.2em]">The MorningEdge Difference</p>
              {[
                "We lead with diagnosis, not prescription.",
                "We build for the organization, not for the engagement.",
                "We measure success by execution outcomes, not deliverable count.",
                "We work in the real workflow, not around it.",
              ].map((point) => (
                <div key={point} className="flex items-start gap-4">
                  <span className="w-1 h-5 bg-[#1A1AB5] mt-0.5 flex-shrink-0" />
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#0A0A0A] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[#22D3EE] text-xs font-bold uppercase tracking-[0.2em] mb-6">Our Commitments</p>
            <h2
              className="text-4xl font-bold text-white mb-16 max-w-xl"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Three principles. Every engagement.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <FadeIn key={v.number} delay={i * 0.1}>
                <div className="border border-white/10 p-8 flex flex-col gap-4 h-full">
                  <span
                    className="text-5xl font-black text-white/10"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {v.number}
                  </span>
                  <h3
                    className="text-xl font-bold text-white"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#F7F7F7] py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-[#1A1AB5] text-xs font-bold uppercase tracking-[0.2em] mb-6">The Firm&apos;s History</p>
            <h2
              className="text-4xl font-bold text-[#0A0A0A] mb-16"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              How we got here.
            </h2>
          </FadeIn>
          <div className="flex flex-col gap-0">
            {milestones.map((m, i) => (
              <FadeIn key={m.year} delay={i * 0.08}>
                <div className="flex gap-8 items-start pb-10 relative">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-[#1A1AB5] mt-1.5 flex-shrink-0" />
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-[#1A1AB5]/20 mt-1" style={{ minHeight: "3rem" }} />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className="text-[#1A1AB5] text-xs font-bold uppercase tracking-widest mb-1">{m.year}</p>
                    <p className="text-[#4A4A4A] text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1A1AB5] py-20 px-6 text-center">
        <FadeIn>
          <h2
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            The right engagement starts with the right conversation.
          </h2>
          <p className="text-blue-200 mb-8 max-w-xl mx-auto">
            If you are building something that requires the kind of operational discipline MorningEdge brings, we want to hear about it.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#1A1AB5] px-10 py-4 text-sm font-semibold hover:bg-blue-50 transition-colors"
          >
            Contact the Firm
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
