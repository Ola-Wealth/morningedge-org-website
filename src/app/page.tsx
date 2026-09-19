import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Eyebrow, ButtonLink } from "@/components/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  description:
    "A Nigerian company loses output in two places: its people and its systems. MorningEdge fixes both. AI enablement for your workforce, and software that runs your operation on one system.",
  alternates: { canonical: site.url },
};

const losses = {
  people: [
    "Staff work by hand in tools that can already do the work.",
    "Finance rebuilds the same schedule every month.",
    "Most hold a Microsoft licence with an assistant they have never opened.",
  ],
  systems: [
    "The numbers live in twelve spreadsheets across four departments.",
    "The books close three weeks late.",
    "Stock on the floor does not match stock in the ledger.",
  ],
};

const pillars = [
  {
    kicker: "Pillar A",
    title: "The AI Edge",
    line: "Capability goes into your people.",
    body: "Your staff produce more using AI inside the tools you already pay for. Microsoft 365 Copilot, in the app where the work lives.",
    buyer: "Deputy MD, function head, Head of HR or L&D",
    length: "4 to 10 weeks, fixed fee",
    href: "/ai-edge",
  },
  {
    kicker: "Pillar B",
    title: "The Operations Core",
    line: "Capability goes into your software.",
    body: "The system does the work instead of a person holding it in a spreadsheet. Two lines: Enterprise Resource Planning on ERPNext, and AI Integration.",
    buyer: "Managing Director, Group CEO, Finance Director",
    length: "6 weeks to 9 months, phased, plus run cost",
    href: "/operations-core",
  },
];

const adoption = [
  { pillar: "The AI Edge", d30: "Named staff using the tool weekly in live work", d60: "Hours returned per function against baseline", d90: "Function workflows running without us" },
  { pillar: "System of record", d30: "Named users transacting in the system", d60: "Transactions posted inside the system, not outside it", d90: "Time to close the month against baseline" },
  { pillar: "Systems that act", d30: "Containment rate, cases closed without a human", d60: "Escalation quality and error rate on closed cases", d90: "Cost per resolved case against the human baseline" },
];

const steps = [
  { n: "01", t: "Diagnose", d: "We map the real workflow and baseline it. Nobody buys a build without a diagnostic." },
  { n: "02", t: "Build", d: "We enable the people, or configure the system, against the plan the diagnostic produced." },
  { n: "03", t: "Adopt", d: "Role-based training to the Adoption Standard. Internal champions carry it after us." },
  { n: "04", t: "Sustain", d: "Maintenance, refreshers, and run cost, quoted inside the build, never chased afterwards." },
];

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-4xl">
            <p className="mb-8 text-lg italic text-[#4A463C]" style={{ fontFamily: "var(--font-serif)" }}>
              {site.brandLine}
            </p>
            <h1 className="text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              You are losing output in two places. Your people, and your systems.
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-[#4A463C]">
              MorningEdge fixes both. We make your people produce more in the tools they already own,
              and we put your company on one system that does the work. Two products. One outcome.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/contact">
                Book a diagnostic <ArrowRight size={16} />
              </ButtonLink>
              <ButtonLink href="/approach" variant="secondary">
                See how we work
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── THE TWO LOSSES ── */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <Eyebrow>The two losses</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">
              Fix only one, and the other still leaks.
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[#E4DED0] bg-[#E4DED0] md:grid-cols-2">
            <Reveal className="bg-[#FAF7F1] p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B45309]">In the people</p>
              <ul className="mt-6 flex flex-col gap-4">
                {losses.people.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-[#17150F]">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1A1AB5]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100} className="bg-[#FAF7F1] p-8 lg:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B45309]">In the institution</p>
              <ul className="mt-6 flex flex-col gap-4">
                {losses.systems.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-[#17150F]">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1A1AB5]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── THE TWO PILLARS ── */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <Eyebrow>What we sell</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Two products. Either stands alone.</h2>
            <p className="measure mt-5 text-[15px] leading-relaxed text-[#4A463C]">
              A company can buy either without the other. That is not a compromise. It is the point.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <Link
                  href={p.href}
                  className="group flex h-full flex-col rounded-lg border border-[#E4DED0] bg-white p-8 transition-colors hover:border-[#1A1AB5]/40 lg:p-10"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B45309]">{p.kicker}</p>
                  <h3 className="mt-3 text-2xl">{p.title}</h3>
                  <p className="mt-2 text-lg text-[#1A1AB5]" style={{ fontFamily: "var(--font-serif)" }}>{p.line}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-[#4A463C]">{p.body}</p>
                  <dl className="mt-6 flex flex-col gap-3 border-t border-[#E4DED0] pt-6 text-sm">
                    <div className="flex flex-col gap-0.5">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-[#8A8578]">Buyer</dt>
                      <dd className="text-[#17150F]">{p.buyer}</dd>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-[#8A8578]">Engagement</dt>
                      <dd className="text-[#17150F]">{p.length}</dd>
                    </div>
                  </dl>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1A1AB5]">
                    Explore {p.title}
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mx-auto mt-12 max-w-2xl text-center text-xl leading-snug text-[#17150F]" style={{ fontFamily: "var(--font-serif)" }}>
              The AI Edge teaches your people to use AI. AI Integration builds AI that does the job.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── CONVICTION PULL QUOTE ── */}
      <section className="bg-[#1A1AB5]">
        <Container className="py-16 lg:py-20">
          <Reveal>
            <p className="mx-auto max-w-3xl text-center text-2xl leading-snug text-white sm:text-3xl" style={{ fontFamily: "var(--font-serif)" }}>
              {site.conviction}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── ADOPTION STANDARD ── */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <Reveal className="max-w-3xl">
            <Eyebrow>The Adoption Standard</Eyebrow>
            <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">We write usage into the contract.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#4A463C]">
              Training firms deliver attendance. Implementers deliver go-live. Both leave before anyone
              uses the thing. We sign a usage number, baselined before we start, measured at day 30, 60 and 90.
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <div className="overflow-x-auto rounded-lg border border-[#E4DED0]">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#F1ECE1]">
                    <th className="p-4 font-semibold text-[#17150F]">What we measure</th>
                    <th className="p-4 font-semibold text-[#17150F]">Day 30</th>
                    <th className="p-4 font-semibold text-[#17150F]">Day 60</th>
                    <th className="p-4 font-semibold text-[#17150F]">Day 90</th>
                  </tr>
                </thead>
                <tbody>
                  {adoption.map((row) => (
                    <tr key={row.pillar} className="border-t border-[#E4DED0] bg-white align-top">
                      <td className="p-4 font-medium text-[#1A1AB5]">{row.pillar}</td>
                      <td className="p-4 text-[#4A463C]">{row.d30}</td>
                      <td className="p-4 text-[#4A463C]">{row.d60}</td>
                      <td className="p-4 text-[#4A463C]">{row.d90}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/adoption-standard" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1A1AB5]">
              How the Adoption Standard works <ArrowRight size={15} />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* ── HOW AN ENGAGEMENT RUNS ── */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <Eyebrow>How an engagement runs</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Four phases. A diagnostic first, always.</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="flex flex-col gap-3 border-t-2 border-[#1A1AB5] pt-5">
                  <span className="text-sm font-semibold text-[#B45309]">{s.n}</span>
                  <h3 className="text-xl">{s.t}</h3>
                  <p className="text-sm leading-relaxed text-[#4A463C]">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href="/approach" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[#1A1AB5]">
              The full approach <ArrowRight size={15} />
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* ── FOUNDER ── */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5 lg:gap-16">
            <Reveal className="lg:col-span-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-[#E4DED0]">
                <Image
                  src="/pictures/IMG_686.jpeg"
                  alt="Olamilekan E. Wealth, founder of MorningEdge"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-3">
              <Eyebrow>The firm</Eyebrow>
              <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">One person is accountable for whether it gets used.</h2>
              <p className="mt-6 text-[15px] leading-relaxed text-[#4A463C]">
                MorningEdge is led by Olamilekan E. Wealth. He runs architecture, scoping and the adoption
                contract on every engagement, and draws on a specialist delivery network for implementation
                and engineering. The firm is small on purpose. The accountability is not diluted across a bench.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#4A463C]">{site.founded}</p>
              <Link href="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1A1AB5]">
                More about the firm <ArrowRight size={15} />
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section>
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-3xl">
            <h2 className="text-3xl leading-tight sm:text-4xl">Tell us what is breaking.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#4A463C]">
              A diagnostic is where every engagement starts. Tell us about your company and what is not
              working. If we are not the right firm for it, we will say so.
            </p>
            <div className="mt-10">
              <ButtonLink href="/contact">
                Book a diagnostic <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
