import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, Users, Building2, FileSpreadsheet, Repeat, MousePointerClick,
  Table2, CalendarClock, Boxes, Layers, Bot, Database, Search, Hammer,
  RefreshCw, Briefcase, Cpu, Mic,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import ScrollFocusText from "@/components/ScrollFocusText";
import Faq from "@/components/Faq";
import Watermark from "@/components/Watermark";
import { Container, ButtonLink, IconChip } from "@/components/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  description:
    "A Nigerian company loses output in two places: its people and its systems. MorningEdge fixes both. AI enablement for your workforce, and software that runs your operation on one system.",
  alternates: { canonical: site.url },
};

const losses = {
  people: {
    title: "In the people",
    icon: Users,
    items: [
      { icon: MousePointerClick, text: "Staff work by hand in tools that can already do the work." },
      { icon: Repeat, text: "Finance rebuilds the same schedule every month." },
      { icon: FileSpreadsheet, text: "Most hold a Microsoft licence with an assistant they have never opened." },
    ],
  },
  systems: {
    title: "In the institution",
    icon: Building2,
    items: [
      { icon: Table2, text: "The numbers live in twelve spreadsheets across four departments." },
      { icon: CalendarClock, text: "The books close three weeks late." },
      { icon: Boxes, text: "Stock on the floor does not match stock in the ledger." },
    ],
  },
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
    image: "/pictures/IMG_342_2.jpeg",
    alt: "A facilitator presenting to a team in a working session",
    icon: Users,
    position: "object-[center_20%]",
  },
  {
    kicker: "Pillar B",
    title: "The Operations Core",
    line: "Capability goes into your software.",
    body: "The system does the work instead of a person holding it in a spreadsheet. Two lines: Enterprise Resource Planning on ERPNext, and AI Integration.",
    buyer: "Managing Director, Group CEO, Finance Director",
    length: "6 weeks to 9 months, phased, plus run cost",
    href: "/operations-core",
    image: "/pictures/service-operations.jpg",
    alt: "An operations wall of process notes being worked through",
    icon: Layers,
    position: "object-center",
  },
];

const adoption = [
  { icon: Users, pillar: "The AI Edge", d30: "Named staff using the tool weekly in live work", d60: "Hours returned per function against baseline", d90: "Function workflows running without us" },
  { icon: Database, pillar: "System of record", d30: "Named users transacting in the system", d60: "Transactions posted inside the system, not outside it", d90: "Time to close the month against baseline" },
  { icon: Bot, pillar: "Systems that act", d30: "Containment rate, cases closed without a human", d60: "Escalation quality and error rate on closed cases", d90: "Cost per resolved case against the human baseline" },
];

const steps = [
  { n: "1", t: "Diagnose", icon: Search, d: "We map the real workflow and baseline it. Nobody buys a build without a diagnostic, because the baseline is what every promise is measured against." },
  { n: "2", t: "Build", icon: Hammer, d: "We enable the people, or configure the system, against the plan the diagnostic produced. No templates carried in from another company." },
  { n: "3", t: "Adopt", icon: Users, d: "Role-based training to the Adoption Standard. We name the users, set the checkpoints, and grow internal champions who carry it after us." },
  { n: "4", t: "Sustain", icon: RefreshCw, d: "Maintenance, refreshers, and run cost, quoted inside the build and never chased afterwards. Built to run without us." },
];

const founderRoles = [
  { icon: Briefcase, label: "Business Operations Executive" },
  { icon: Cpu, label: "AI Systems Consultant" },
  { icon: Mic, label: "Author and Speaker" },
];

const faqs = [
  { q: "We already pay for Microsoft. Why pay you?", a: "Correct. That is the argument. You are paying for capability nobody in the building uses. The AI Edge turns a licence you already own into output, inside the apps your people already have open." },
  { q: "ERPNext is free. Why pay you?", a: "The software is free. The implementation decides whether it works. Free software with a failed rollout costs more than paid software that gets used. You pay us for the work, and you own the system." },
  { q: "Our staff will not use it.", a: "That is the problem we sell against, on both sides of the house. It is why we write adoption into the contract, measured at day 30, 60 and 90, against a baseline we set before we start." },
  { q: "The AI Edge or AI Integration. What is the difference?", a: "The AI Edge teaches your people to use AI. AI Integration builds AI that does the job. Different product, different buyer, different contract. You can buy either without the other." },
  { q: "Who supports the system without you?", a: "Named succession: a Frappe-certified partner network, documented configuration, and hosting credentials you hold. You are never locked to one person, and that is by design." },
  { q: "How fast do we see something real?", a: "A diagnostic runs in weeks, not months, and produces a working prototype. For AI Integration, a pilot proves the work is contained before you commit to a full build." },
];

const h2 = "text-3xl leading-[1.12] tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem]";

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-[#E4DED0]">
        <Watermark className="-right-40 -top-32 lg:-right-24 lg:-top-20" size={780} />
        <Container className="relative pt-16 pb-16 lg:pt-24 lg:pb-20">
          {/* Row 1: headline, sub, CTAs, all centered and spanning the width */}
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="text-balance text-[2.6rem] leading-[1.04] tracking-[-0.025em] sm:text-6xl lg:text-[4.75rem]">
              You are losing output in two places. Your people, and your systems.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#4A463C] sm:text-xl">
              MorningEdge fixes both. We make your people produce more in the tools they already own,
              and we put your company on one system that does the work. Two products. One outcome.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact" size="lg">
                Book a diagnostic <ArrowRight size={17} />
              </ButtonLink>
              <ButtonLink href="/approach" variant="secondary" size="lg">
                See how we work
              </ButtonLink>
            </div>
          </div>

          {/* Row 2: the photograph, full width */}
          <div className="relative mt-14 lg:mt-16">
            <div className="photo-frame aspect-[16/10] shadow-soft-lg sm:aspect-[21/9]">
              <Image
                src="/pictures/hero-bg.jpeg"
                alt="A leadership team in a working session around a boardroom table"
                fill
                priority
                className="object-cover object-[center_40%]"
                sizes="(max-width: 1280px) 100vw, 1152px"
              />
            </div>
            {/* Floating pillar chip: the two products, illustrated */}
            <div className="relative -mt-10 ml-4 mr-4 rounded-2xl border border-[#E4DED0] bg-white p-4 shadow-soft-lg sm:absolute sm:-bottom-6 sm:left-6 sm:mt-0 sm:mr-0 sm:ml-0 sm:w-[300px]">
              <div className="flex items-center gap-3 border-b border-[#E4DED0] pb-3">
                <IconChip size="sm"><Users size={16} /></IconChip>
                <div className="leading-tight">
                  <p className="text-sm font-medium text-[#17150F]">The AI Edge</p>
                  <p className="text-xs text-[#8A8578]">Capability into your people</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-3">
                <IconChip size="sm"><Layers size={16} /></IconChip>
                <div className="leading-tight">
                  <p className="text-sm font-medium text-[#17150F]">The Operations Core</p>
                  <p className="text-xs text-[#8A8578]">Capability into your software</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── THE TWO LOSSES ── */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <h2 className={`${h2} max-w-2xl`}>Fix only one, and the other still leaks.</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[losses.people, losses.systems].map((col, i) => {
              const HeadIcon = col.icon;
              return (
                <Reveal key={col.title} delay={i * 90}>
                  <div className="h-full rounded-2xl border border-[#E4DED0] bg-white p-8 shadow-soft lg:p-9">
                    <div className="flex items-center gap-4">
                      <IconChip size="lg" tone="ink"><HeadIcon size={22} /></IconChip>
                      <h3 className="text-2xl">{col.title}</h3>
                    </div>
                    <ul className="mt-7 flex flex-col gap-5">
                      {col.items.map((item) => {
                        const Ico = item.icon;
                        return (
                          <li key={item.text} className="flex items-start gap-4">
                            <IconChip size="sm"><Ico size={15} /></IconChip>
                            <p className="pt-1.5 text-[15px] leading-relaxed text-[#17150F]">{item.text}</p>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── SCROLL-FOCUS STATEMENT ── */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-24 lg:py-36">
          <ScrollFocusText
            text="Fix only the people, and a faster team still feeds a blind system. Fix only the systems, and a clean system sits unused. Most firms sell one. We work on both."
            className="mx-auto max-w-4xl text-center text-2xl leading-[1.35] tracking-[-0.01em] [font-family:var(--font-serif)] sm:text-3xl lg:text-4xl"
          />
        </Container>
      </section>

      {/* ── THE TWO PILLARS ── */}
      <section className="border-b border-[#E4DED0] bg-[#F1ECE1]">
        <Container className="py-20 lg:py-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className={`${h2} max-w-xl`}>Two products. Either stands alone.</h2>
            <p className="max-w-md text-[15px] leading-relaxed text-[#4A463C]">
              A company can buy either without the other. That is not a compromise. It is the point.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {pillars.map((p, i) => {
              const Ico = p.icon;
              return (
                <Reveal key={p.title} delay={i * 90}>
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E4DED0] bg-white shadow-soft hover-lift"
                  >
                    <div className="relative h-60 overflow-hidden sm:h-64">
                      <Image
                        src={p.image}
                        alt={p.alt}
                        fill
                        className={`object-cover ${p.position} transition-transform duration-700 [transition-timing-function:var(--ease-out-strong)] group-hover:scale-[1.04]`}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#17150F]/45 via-transparent to-transparent" />
                      <div className="absolute left-5 top-5">
                        <IconChip className="bg-white text-[#1A1AB5] shadow-soft"><Ico size={18} /></IconChip>
                      </div>
                      <p className="absolute bottom-5 left-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">{p.kicker}</p>
                    </div>
                    <div className="flex flex-1 flex-col p-8 lg:p-9">
                      <h3 className="text-2xl">{p.title}</h3>
                      <p className="mt-1.5 text-lg text-[#1A1AB5]" style={{ fontFamily: "var(--font-serif)" }}>{p.line}</p>
                      <p className="mt-4 text-[15px] leading-relaxed text-[#4A463C]">{p.body}</p>
                      <dl className="mt-6 grid grid-cols-1 gap-3 border-t border-[#E4DED0] pt-6 text-sm sm:grid-cols-2">
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-[#8A8578]">Buyer</dt>
                          <dd className="mt-0.5 text-[#17150F]">{p.buyer}</dd>
                        </div>
                        <div>
                          <dt className="text-xs font-semibold uppercase tracking-wide text-[#8A8578]">Engagement</dt>
                          <dd className="mt-0.5 text-[#17150F]">{p.length}</dd>
                        </div>
                      </dl>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1A1AB5]">
                        Explore {p.title}
                        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-xl leading-snug text-[#17150F]" style={{ fontFamily: "var(--font-serif)" }}>
            The AI Edge teaches your people to use AI. AI Integration builds AI that does the job.
          </p>
        </Container>
      </section>

      {/* ── CONVICTION BAND ── */}
      <section className="bg-[#1A1AB5]">
        <Container className="py-16 lg:py-20">
          <p className="mx-auto max-w-3xl text-center text-2xl leading-snug text-white sm:text-3xl lg:text-4xl" style={{ fontFamily: "var(--font-serif)" }}>
            {site.conviction}
          </p>
          <p className="mt-5 text-center text-sm tracking-wide text-[#C9C8FF]">
            People who perform. Systems that hold. Businesses that execute.
          </p>
        </Container>
      </section>

      {/* ── ADOPTION STANDARD ── */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="photo-frame aspect-[4/5] shadow-soft-lg">
                <Image
                  src="/pictures/about-header.jpg"
                  alt="A team reviewing work together at a table"
                  fill
                  className="object-cover object-[center_30%]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <h2 className={h2}>We write usage into the contract.</h2>
              <p className="mt-6 text-lg leading-relaxed text-[#4A463C]">
                Training firms deliver attendance. Implementers deliver go-live. Both leave before anyone
                uses the thing. We sign a usage number, baselined before we start, measured at day 30,
                60 and 90.
              </p>
              <Link href="/adoption-standard" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#1A1AB5]">
                How the Adoption Standard works <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <Reveal className="mt-12">
            <div className="overflow-x-auto rounded-2xl border border-[#E4DED0] bg-white shadow-soft">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#F1ECE1]">
                    <th className="p-4 font-semibold text-[#17150F]">What we measure</th>
                    <th className="p-4 font-semibold text-[#17150F]">Day 30</th>
                    <th className="p-4 font-semibold text-[#17150F]">Day 60</th>
                    <th className="p-4 font-semibold text-[#17150F]">Day 90</th>
                  </tr>
                </thead>
                <tbody>
                  {adoption.map((row) => {
                    const Ico = row.icon;
                    return (
                      <tr key={row.pillar} className="border-t border-[#E4DED0] align-top">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <IconChip size="sm"><Ico size={15} /></IconChip>
                            <span className="font-medium text-[#1A1AB5]">{row.pillar}</span>
                          </div>
                        </td>
                        <td className="p-4 text-[#4A463C]">{row.d30}</td>
                        <td className="p-4 text-[#4A463C]">{row.d60}</td>
                        <td className="p-4 text-[#4A463C]">{row.d90}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── HOW AN ENGAGEMENT RUNS ── */}
      <section className="border-b border-[#E4DED0] bg-[#F1ECE1]">
        <Container className="py-20 lg:py-24">
          <h2 className={`${h2} max-w-2xl`}>Four phases. A diagnostic first, always.</h2>
          <div className="mt-10 flex flex-col">
            {steps.map((s, i) => {
              const Ico = s.icon;
              return (
                <Reveal key={s.n} delay={i * 60}>
                  <div className={`grid grid-cols-1 items-start gap-4 py-8 sm:grid-cols-12 sm:gap-8 ${i > 0 ? "border-t border-[#E4DED0]" : ""}`}>
                    <div className="flex items-center gap-5 sm:col-span-4">
                      <span className="text-[64px] leading-none text-[#1A1AB5]/15 lg:text-[80px]" style={{ fontFamily: "var(--font-serif)" }} aria-hidden="true">
                        {s.n}
                      </span>
                      <IconChip className="bg-white shadow-soft"><Ico size={18} /></IconChip>
                      <h3 className="text-2xl">{s.t}</h3>
                    </div>
                    <p className="measure text-[15px] leading-relaxed text-[#4A463C] sm:col-span-8">{s.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Link href="/approach" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#1A1AB5]">
            The full approach <ArrowRight size={15} />
          </Link>
        </Container>
      </section>

      {/* ── FOUNDER ── */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="photo-frame aspect-[4/5] shadow-soft-lg">
                <Image
                  src="/pictures/IMG_686.jpeg"
                  alt="Olamilekan E. Wealth, founder of MorningEdge"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <h2 className={h2}>One person is accountable for whether it gets used.</h2>
              <p className="mt-6 text-[15px] leading-relaxed text-[#4A463C]">
                MorningEdge is led by Olamilekan E. Wealth. He runs architecture, scoping and the adoption
                contract on every engagement, and draws on a specialist delivery network for implementation
                and engineering. The firm is small on purpose. The accountability is not diluted across a bench.
              </p>
              <ul className="mt-7 flex flex-col gap-3">
                {founderRoles.map((r) => {
                  const Ico = r.icon;
                  return (
                    <li key={r.label} className="flex items-center gap-3">
                      <IconChip size="sm"><Ico size={15} /></IconChip>
                      <span className="text-[15px] text-[#17150F]">{r.label}</span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 text-sm text-[#8A8578]">{site.founded}</p>
              <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#1A1AB5]">
                More about the firm <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <h2 className={`${h2} max-w-2xl`}>The objections, answered plainly.</h2>
          <div className="mt-10">
            <Faq items={faqs} />
          </div>
        </Container>
      </section>

      {/* ── CLOSING ── */}
      <section className="relative overflow-hidden">
        <Watermark className="-bottom-40 -left-44 lg:-left-28" size={720} />
        <Container className="relative py-20 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="text-2xl leading-[1.25] sm:text-3xl lg:text-[2.75rem]" style={{ fontFamily: "var(--font-serif)" }}>
                <span className="text-[#17150F]">The tools are bought. The systems exist. </span>
                <span className="text-[#1A1AB5]">The edge is in making them execute.</span>
              </p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#4A463C]">
                A diagnostic is where every engagement starts. Tell us about your company and what is not
                working. If we are not the right firm for it, we will say so.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="lg">
                  Book a diagnostic <ArrowRight size={17} />
                </ButtonLink>
              </div>
              <p className="mt-8 text-base italic text-[#4A463C]" style={{ fontFamily: "var(--font-serif)" }}>
                {site.brandLine}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="photo-frame aspect-[4/3] shadow-soft-lg">
                <Image
                  src="/pictures/IMG_342_1.jpeg"
                  alt="A working session in progress"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
