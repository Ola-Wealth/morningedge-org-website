import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Eyebrow, ButtonLink } from "@/components/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Operations Core",
  description:
    "Software that does the work. One system holding every operation and every naira, built on ERPNext. Plus AI built into the workflow to carry work end to end.",
  alternates: { canonical: `${site.url}/operations-core` },
  openGraph: { title: "The Operations Core | MorningEdge", url: `${site.url}/operations-core` },
};

const lines = [
  {
    title: "Enterprise Resource Planning",
    line: "One system holding every operation and every naira.",
    body: "A centralised operating system built on ERPNext. Open source, so you own the system and pay for the work, not the licence. Configured for Nigerian reality: naira, VAT, WHT, FIRS, multi-entity consolidation, NDPA.",
    buyer: "Managing Director, Group CEO, Finance Director",
    href: "/operations-core/erp",
  },
  {
    title: "AI Integration",
    line: "AI that does the job, not AI that assists a person doing it.",
    body: "AI built into the workflow to carry work end to end. Customer support agents, document capture and posting, exception detection, report generation, system-to-system automation. A department head can sign a pilot.",
    buyer: "Managing Director, COO, Head of Customer Experience",
    href: "/operations-core/ai-integration",
  },
];

export default function OperationsCorePage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-4xl">
            <Eyebrow>Pillar B</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              Software that does the work.
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-[#4A463C]">
              The Operations Core puts capability into your software. The system holds the operation,
              instead of a person holding it in their head or their spreadsheet. Two service lines.
              Neither requires the other.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Book a diagnostic <ArrowRight size={16} /></ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* TWO LINES */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {lines.map((l, i) => (
              <Reveal key={l.title} delay={i * 100}>
                <Link
                  href={l.href}
                  className="group flex h-full flex-col rounded-2xl border border-[#E4DED0] bg-white p-8 shadow-soft hover-lift hover:border-[#1A1AB5]/40 lg:p-10"
                >
                  <h2 className="text-2xl">{l.title}</h2>
                  <p className="mt-2 text-lg text-[#1A1AB5]" style={{ fontFamily: "var(--font-serif)" }}>{l.line}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#4A463C]">{l.body}</p>
                  <div className="mt-6 border-t border-[#E4DED0] pt-6">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#8A8578]">Buyer</p>
                    <p className="mt-1 text-sm text-[#17150F]">{l.buyer}</p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1A1AB5]">
                    Explore {l.title}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* THE RULES */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <Eyebrow>How we sell it</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Four rules we do not bend.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[
              ["Nobody buys a build without a diagnostic.", "It is not optional and it is not free. The diagnostic sets the baseline every promise is measured against."],
              ["Sustain and run are quoted inside the build.", "Never sold afterwards. The cost of keeping the thing alive is on the table from the first proposal."],
              ["No agent goes live without a pilot.", "The pilot proves the work is contained before you commit to the full build."],
              ["We claim only what we have delivered.", "Partner track record is cited as partner track record. Nothing is dressed up as our own go-live until it is."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={(i % 2) * 100}>
                <div className="flex flex-col gap-2 border-t-2 border-[#1A1AB5] pt-5">
                  <h3 className="text-lg">{t}</h3>
                  <p className="text-sm leading-relaxed text-[#4A463C]">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-3xl">
            <h2 className="text-3xl leading-tight sm:text-4xl">One system. One version of the numbers.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#4A463C]">
              A diagnostic tells you what to build and what to leave alone. It is credited to the build if
              you go ahead. Start there.
            </p>
            <div className="mt-10">
              <ButtonLink href="/contact">Book a diagnostic <ArrowRight size={16} /></ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
