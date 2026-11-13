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
import { Container, ButtonLink } from "@/components/primitives";
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
    body: "The system does the work instead of a person holding it in a spreadsheet. Two lines: Enterprise Resource Planning on ERPNext, and AI Integration, which covers both automating a workflow and building AI on your own material.",
    buyer: "Managing Director, Group CEO, Finance Director",
    length: "6 weeks to 9 months, phased, plus run cost",
    href: "/operations-core",
    image: "/pictures/service-operations.jpg",
    alt: "An operations wall of process notes being worked through",
    icon: Layers,
    position: "object-center",
  },
];

/**
 * The four things the firm is actually hired to do, each said in plain words.
 * Clients ring up asking what the terms mean, so every line defines itself
 * rather than assuming the reader already knows.
 */
const services = [
  {
    icon: Users,
    name: "AI enablement for your people",
    plain:
      "Your staff do more in Microsoft 365 Copilot, inside Outlook, Excel, Word and Teams, where the work already happens.",
    pillar: "The AI Edge",
    href: "/ai-edge",
  },
  {
    icon: Bot,
    name: "AI adoption: agents and automation",
    plain:
      "AI placed inside a workflow you already run, so a step that needed a person no longer does. Support cases answered and closed, invoices read and posted, exceptions flagged, reports produced, work moved between systems without anyone copying it across.",
    pillar: "AI Integration",
    href: "/operations-core/ai-integration",
  },
  {
    icon: Database,
    name: "AI built on your own material",
    plain:
      "Your documents, policies, contracts and records become AI that answers from them and shows where each answer came from. Retrieval pipelines, assistants fitted to one function, and models that stay inside your environment under your own governance.",
    pillar: "AI Integration",
    href: "/operations-core/ai-integration",
  },
  {
    icon: Layers,
    name: "Enterprise Resource Planning",
    plain:
      "One system holding operations and financials together, built on ERPNext and configured for naira, VAT, WHT, FIRS, multi-entity consolidation and NDPA.",
    pillar: "The Operations Core",
    href: "/operations-core/erp",
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

/**
 * Drawn from the end of programme review of a delivered engagement. Every line
 * traces to a response; the client is anonymised and nothing here is invented.
 */
const outcomes = [
  {
    icon: Search,
    title: "Prompting became a method, not a guess.",
    body: "People stopped asking in one line and started setting context, role, action, format and tone. One engineer described moving from generic prompts to that structure, and getting more control over what came back.",
  },
  {
    icon: FileSpreadsheet,
    title: "The work moved into the tools already on the desk.",
    body: "Named uses afterwards: drafting and tightening documents, building decks, filtering and analysing spreadsheet data, and summarising and answering mail. No new software was bought to do any of it.",
  },
  {
    icon: RefreshCw,
    title: "Repeat work turned into a routine.",
    body: "One salesperson now collects daily activity and returns a weekly report in a set format. Internal audit drafts policy and summarises reports. A product team generates test cases.",
  },
];

const quotes = [
  {
    text: "“It was eye opening for me. I felt I was already AI savvy till the class exposed gaps.”",
    role: "Enterprise sales",
  },
  {
    text: "“I gained practical experience using tools like Microsoft Copilot and learned how AI can improve my productivity, problem solving and technical skills.”",
    role: "Systems and networks",
  },
  {
    text: "“That using Microsoft Copilot for work is safe for keeping company data.”",
    role: "Customer service, on what stayed with them",
  },
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

const h2 = "text-[2rem] leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-[3.4rem]";
const serif = { fontFamily: "var(--font-serif)" } as const;
const textLink =
  "inline-flex items-center gap-2 border-b border-(--gold)/50 pb-1 text-sm font-medium text-(--ink) transition-colors duration-200 hover:border-(--gold) hover:text-(--gold)";

// "Execution is not an accident. It is architecture." The second sentence is
// the turn, so it carries the emphasis.
const [convictionLead, convictionTurn] = site.conviction.split(". ");

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-texture relative overflow-hidden border-b border-(--line)">
        <Watermark className="-right-40 -top-32 lg:-right-24 lg:-top-20" size={780} />
        <Container className="relative pt-16 pb-16 lg:pt-24 lg:pb-24">
          <div className="text-center">
            {/* Sized from the measured line width so the headline sets on one line
                from 640px up and spans the container without reflowing. */}
            <h1 className="hero-title rise text-[2.5rem] leading-[1.04] tracking-[-0.03em] sm:whitespace-nowrap sm:text-[min(3.65rem,calc((100vw-3.5rem)/19.4))]">
              Your business, structured to produce more.
            </h1>
            <p className="hero-sub rise mx-auto mt-6 max-w-3xl text-lg leading-relaxed [--d:120ms] sm:mt-8 sm:text-xl sm:leading-[1.5] lg:text-[1.35rem]">
              We train your people to use AI in the tools they already have. We put your operations
              on one system. Then we commit to a usage number, so you can see the change is real.
            </p>
            <div className="rise mt-9 flex flex-wrap justify-center gap-3 [--d:240ms]">
              <ButtonLink href="/scorecard" size="lg">
                Check your AI exposure <ArrowRight size={17} />
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Book a diagnostic
              </ButtonLink>
            </div>
            <p className="rise mt-5 text-sm text-(--ink-faint) [--d:320ms]">
              A free four-minute check of how your staff use AI, what it is returning, and where the risk sits.
            </p>
          </div>

          {/* The photograph, full width, with the two products set beneath it */}
          <div className="rise mt-14 [--d:420ms] lg:mt-20">
            <div className="gilt">
              <div className="photo-frame aspect-[16/10] sm:aspect-[21/9]">
                <Image
                  src="/pictures/hero-bg.jpeg"
                  alt="A leadership team in a working session around a boardroom table"
                  fill
                  priority
                  className="object-cover object-[center_40%]"
                  sizes="(max-width: 1280px) 100vw, 1152px"
                />
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 border-t border-(--line) sm:grid-cols-2">
              <Link href="/ai-edge" className="group flex items-baseline justify-between gap-6 border-b border-(--line) py-5 sm:pr-10">
                <span>
                  <span className="block text-xl text-(--ink) transition-colors duration-200 group-hover:text-(--gold)" style={serif}>The AI Edge</span>
                  <span className="mt-1 block text-sm text-(--ink-faint)">Capability into your people</span>
                </span>
                <ArrowRight size={16} className="flex-shrink-0 text-(--gold) transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link href="/operations-core" className="group flex items-baseline justify-between gap-6 border-b border-(--line) py-5 sm:border-l sm:pl-10">
                <span>
                  <span className="block text-xl text-(--ink) transition-colors duration-200 group-hover:text-(--gold)" style={serif}>The Operations Core</span>
                  <span className="mt-1 block text-sm text-(--ink-faint)">Capability into your software</span>
                </span>
                <ArrowRight size={16} className="flex-shrink-0 text-(--gold) transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── THE TWO LOSSES ── */}
      <section className="border-b border-(--line) bg-(--ground-2)">
        <Container className="py-24 lg:py-32">
          <Reveal>
            <h2 className={`${h2} max-w-3xl`}>Fix only one, and the other still leaks.</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-x-16 gap-y-14 md:grid-cols-2">
            {[losses.people, losses.systems].map((col, i) => {
              const HeadIcon = col.icon;
              return (
                <Reveal key={col.title} delay={i * 90}>
                  <div className="flex items-center gap-3 border-b border-(--gold)/40 pb-5">
                    <HeadIcon size={20} strokeWidth={1.5} className="text-(--gold)" aria-hidden="true" />
                    <h3 className="text-2xl lg:text-[1.75rem]">{col.title}</h3>
                  </div>
                  <ul>
                    {col.items.map((item) => (
                      <li key={item.text} className="border-b border-(--line) py-5 text-[17px] leading-relaxed text-(--ink)">
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── SCROLL-FOCUS STATEMENT ── */}
      <section className="border-b border-(--line)">
        <Container className="py-28 lg:py-40">
          <ScrollFocusText
            text="Fix only the people, and a faster team still feeds a blind system. Fix only the systems, and a clean system sits unused. Most firms sell one. We work on both."
            className="mx-auto max-w-4xl text-center text-2xl leading-[1.3] tracking-[-0.015em] [font-family:var(--font-serif)] sm:text-4xl lg:text-[2.75rem]"
          />
        </Container>
      </section>

      {/* ── THE TWO PILLARS ── */}
      <section className="border-b border-(--line) bg-(--ground-2)">
        <Container className="py-24 lg:py-32">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className={`${h2} max-w-xl`}>Two products. Either stands alone.</h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-(--ink-soft)">
              A company can buy either without the other. That is not a compromise. It is the point.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <Link href={p.href} className="group block">
                  <div className="photo-frame aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
                    <Image
                      src={p.image}
                      alt={p.alt}
                      fill
                      className={`object-cover ${p.position} transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-strong)] group-hover:scale-[1.04]`}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-[#0B0A09]/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D9BC82]">{p.kicker}</p>
                      <h3 className="mt-3 text-4xl text-white lg:text-[2.75rem]">{p.title}</h3>
                      <p className="mt-2 text-xl italic text-white/85" style={serif}>{p.line}</p>
                    </div>
                  </div>
                  <p className="mt-7 text-[16px] leading-relaxed text-(--ink-soft)">{p.body}</p>
                  <dl className="mt-6 border-t border-(--line) text-[15px]">
                    <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-(--line) py-3.5">
                      <dt className="text-(--ink-faint)">Buyer</dt>
                      <dd className="text-(--ink)">{p.buyer}</dd>
                    </div>
                    <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-(--line) py-3.5">
                      <dt className="text-(--ink-faint)">Engagement</dt>
                      <dd className="text-(--ink)">{p.length}</dd>
                    </div>
                  </dl>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-(--ink) transition-colors duration-200 group-hover:text-(--gold)">
                    Explore {p.title}
                    <ArrowRight size={15} className="text-(--gold) transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* What those two products actually mean, in the words clients use */}
          <div className="mt-24 lg:mt-32">
            <Reveal>
              <h3 className={`${h2} max-w-2xl`}>What we are actually hired to do.</h3>
              <p className="measure mt-6 text-[16px] leading-relaxed text-(--ink-soft)">
                Most people arrive asking what the words mean before they ask what it costs.
                So here are the four, said plainly.
              </p>
            </Reveal>

            <div className="mt-12 border-t border-(--line)">
              {services.map((s) => (
                <Reveal key={s.name}>
                  <Link
                    href={s.href}
                    className="group grid grid-cols-1 gap-3 border-b border-(--line) py-8 md:grid-cols-12 md:gap-8"
                  >
                    <div className="md:col-span-4">
                      <h4 className="text-[1.4rem] leading-snug transition-colors duration-200 group-hover:text-(--gold)">{s.name}</h4>
                      <p className="mt-2 text-[13px] text-(--ink-faint)">{s.pillar}</p>
                    </div>
                    <p className="text-[15.5px] leading-relaxed text-(--ink-soft) md:col-span-7">{s.plain}</p>
                    <span className="hidden md:col-span-1 md:flex md:justify-end md:pt-2">
                      <ArrowRight size={18} className="text-(--gold) transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
                <div className="border-l border-(--gold)/60 pl-6">
                  <p className="text-[1.4rem] leading-snug text-(--ink)" style={serif}>
                    When people say AI adoption, this is what they mean.
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-(--ink-soft)">
                    Putting AI agents and automation inside the workflows your business already runs. Not a
                    course, and not a chatbot subscription. The test is whether a step that used to need a
                    person still needs one.
                  </p>
                </div>
                <div className="border-l border-(--gold)/60 pl-6">
                  <p className="text-[1.4rem] leading-snug text-(--ink)" style={serif}>
                    We work with businesses from about five staff upwards.
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-(--ink-soft)">
                    Fit is decided by the work rather than the headcount. A small firm buys an automation, a
                    native build, or Copilot for everyone in the room. A group with several entities buys the
                    system of record.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── CONVICTION ── */}
      <section className="border-b border-(--line)">
        <Container className="py-28 lg:py-44">
          <Reveal>
            <p
              className="mx-auto max-w-5xl text-center text-[2.4rem] leading-[1.06] tracking-[-0.025em] text-(--ink) sm:text-6xl lg:text-[5.25rem]"
              style={serif}
            >
              {convictionLead}. {convictionTurn && <em className="em">{convictionTurn}</em>}
            </p>
            <div className="mx-auto mt-12 h-px w-16 bg-(--gold)" />
            <p className="mt-6 text-center text-sm tracking-[0.06em] text-(--ink-soft)">
              People who perform. Systems that hold. Businesses that execute.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── ADOPTION STANDARD ── */}
      <section className="border-b border-(--line) bg-(--ground-2)">
        <Container className="py-24 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="reveal-unveil lg:col-span-5">
              <div className="photo-frame aspect-[4/5]">
                <Image
                  src="/pictures/about-header.jpg"
                  alt="A team reviewing work together at a table"
                  fill
                  className="object-cover object-[center_30%]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </Reveal>
            <div className="lg:col-span-7">
              <h2 className={h2}>We write usage into the contract.</h2>
              <p className="mt-7 text-lg leading-relaxed text-(--ink-soft)">
                Training firms deliver attendance. Implementers deliver go-live. Both leave before anyone
                uses the thing. We sign a usage number, baselined before we start, measured at day 30,
                60 and 90.
              </p>
              <Link href="/adoption-standard" className={`${textLink} mt-8`}>
                How the Adoption Standard works <ArrowRight size={15} className="text-(--gold)" />
              </Link>
            </div>
          </div>

          <Reveal className="mt-20">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-(--gold)/50">
                    <th className="pb-5 pr-8 text-[13px] font-normal text-(--ink-faint)">What we measure</th>
                    {["Day 30", "Day 60", "Day 90"].map((d) => (
                      <th key={d} className="pb-5 pr-8 text-2xl font-medium text-(--ink)" style={serif}>{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {adoption.map((row) => (
                    <tr key={row.pillar} className="border-b border-(--line) align-top">
                      <td className="py-6 pr-8 text-[15px] font-medium text-(--gold)">{row.pillar}</td>
                      <td className="py-6 pr-8 text-[15px] leading-relaxed text-(--ink-soft)">{row.d30}</td>
                      <td className="py-6 pr-8 text-[15px] leading-relaxed text-(--ink-soft)">{row.d60}</td>
                      <td className="py-6 text-[15px] leading-relaxed text-(--ink-soft)">{row.d90}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── WHAT CHANGED ── */}
      <section className="border-b border-(--line)">
        <Container className="py-24 lg:py-32">
          <Reveal>
            <h2 className={`${h2} max-w-3xl`}>What people did differently afterwards.</h2>
            <p className="measure mt-6 text-[16px] leading-relaxed text-(--ink-soft)">
              From an eight session programme run with a Nigerian technology group, reviewed at the
              end by the people who sat in it. The client is not named and the words below are
              theirs, unedited.
            </p>
          </Reveal>

          {/* The lead quote, set large */}
          <Reveal className="mt-16">
            <figure className="border-y border-(--line) py-12 lg:py-16">
              <blockquote
                className="max-w-4xl text-[1.75rem] italic leading-[1.2] tracking-[-0.01em] text-(--ink) sm:text-4xl lg:text-[3.1rem]"
                style={serif}
              >
                {quotes[0].text}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-4 text-sm text-(--ink-faint)">
                <span className="h-px w-10 bg-(--gold)" aria-hidden="true" />
                {quotes[0].role}
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3">
            {outcomes.map((o, i) => (
              <Reveal key={o.title} delay={i * 80}>
                <div className="border-t border-(--gold)/50 pt-6">
                  <h3 className="text-[1.35rem] leading-snug">{o.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-(--ink-soft)">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {quotes.slice(1).map((q, i) => (
              <Reveal key={q.role} delay={i * 80}>
                <figure>
                  <blockquote className="text-xl italic leading-snug text-(--ink) lg:text-2xl" style={serif}>
                    {q.text}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-4 text-sm text-(--ink-faint)">
                    <span className="h-px w-10 bg-(--gold)" aria-hidden="true" />
                    {q.role}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="measure mt-16 border-t border-(--line) pt-6 text-[13.5px] leading-relaxed text-(--ink-faint)">
              Eighteen participants responded. Nine had already used it on real work. Self rated
              confidence rose for eleven. We report what the review returned, including the part
              that says the programme suited beginners best.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── HOW AN ENGAGEMENT RUNS ── */}
      <section className="border-b border-(--line) bg-(--ground-2)">
        <Container className="py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* The heading holds its place while the four phases scroll past */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <h2 className={h2}>Four phases. A diagnostic first, always.</h2>
                <Link href="/approach" className={`${textLink} mt-8`}>
                  The full approach <ArrowRight size={15} className="text-(--gold)" />
                </Link>
              </div>
            </div>
            <ol className="border-b border-(--line) lg:col-span-7">
              {steps.map((s, i) => (
                <li key={s.n}>
                  <Reveal delay={i * 60}>
                    <div className="grid grid-cols-[3.5rem_1fr] gap-6 border-t border-(--line) py-10 lg:grid-cols-[5.5rem_1fr] lg:gap-8 lg:py-12">
                      <span className="text-[3.25rem] leading-[0.9] text-(--gold) lg:text-[4.75rem]" style={serif} aria-hidden="true">
                        {s.n}
                      </span>
                      <div>
                        <h3 className="text-3xl">{s.t}</h3>
                        <p className="mt-3 text-[16px] leading-relaxed text-(--ink-soft)">{s.d}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* ── FOUNDER ── */}
      <section className="border-b border-(--line)">
        <Container className="py-24 lg:py-32">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <div className="gilt">
                <div className="photo-frame aspect-[4/5]">
                  <Image
                    src="/pictures/IMG_686.jpeg"
                    alt="Olamilekan E. Wealth, founder of MorningEdge"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <h2 className={h2}>One person is accountable for whether it gets used.</h2>
              <p className="mt-7 text-[16px] leading-relaxed text-(--ink-soft)">
                MorningEdge is led by Olamilekan E. Wealth. He runs architecture, scoping and the adoption
                contract on every engagement, and draws on a specialist delivery network for implementation
                and engineering. The firm is small on purpose. The accountability is not diluted across a bench.
              </p>
              <ul className="mt-8 border-t border-(--line)">
                {founderRoles.map((r) => (
                  <li key={r.label} className="border-b border-(--line) py-3.5 text-[15px] text-(--ink)">
                    {r.label}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-(--ink-faint)">{site.founded}</p>
              <Link href="/about" className={`${textLink} mt-7`}>
                More about the firm <ArrowRight size={15} className="text-(--gold)" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQ ── */}
      <section className="border-b border-(--line) bg-(--ground-2)">
        <Container className="py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className={`${h2} lg:sticky lg:top-32`}>The objections, answered plainly.</h2>
            </div>
            <div className="lg:col-span-8">
              <Faq items={faqs} />
            </div>
          </div>
        </Container>
      </section>

      {/* ── CLOSING ── */}
      <section className="relative overflow-hidden">
        <Watermark className="-bottom-40 -left-44 lg:-left-28" size={720} />
        <Container className="relative py-24 lg:py-36">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-[2rem] leading-[1.12] tracking-[-0.02em] text-(--ink) sm:text-5xl lg:text-[3.4rem]" style={serif}>
                The tools are bought. The systems exist.{" "}
                <em className="em">The edge is in making them execute.</em>
              </p>
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-(--ink-soft)">
                A diagnostic is where every engagement starts. Tell us about your company and what is not
                working. If we are not the right firm for it, we will say so.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/contact" size="lg">
                  Book a diagnostic <ArrowRight size={17} />
                </ButtonLink>
                <ButtonLink href="/scorecard" variant="secondary" size="lg">
                  Check your AI exposure
                </ButtonLink>
              </div>
              <p className="mt-10 text-base italic text-(--ink-soft)" style={serif}>
                {site.brandLine}
              </p>
            </div>
            <Reveal className="reveal-unveil lg:col-span-5">
              <div className="photo-frame aspect-[4/3]">
                <Image
                  src="/pictures/IMG_342_1.jpeg"
                  alt="A working session in progress"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
