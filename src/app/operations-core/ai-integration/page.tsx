import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Container, ButtonLink } from "@/components/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Integration",
  description:
    "Two kinds of work. Agents and automation placed inside the workflows you already run, which is what AI adoption means. And AI built on your own documents and records, with retrieval, sources and governance. Pilot first, priced as build plus run.",
  alternates: { canonical: `${site.url}/operations-core/ai-integration` },
  openGraph: { title: "AI Integration | MorningEdge Systems", url: `${site.url}/operations-core/ai-integration` },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Integration",
  serviceType: "AI systems and workflow automation",
  provider: { "@type": "Organization", name: "MorningEdge Systems", url: site.url },
  areaServed: { "@type": "Country", name: "Nigeria" },
  description:
    "AI agents and automations that carry work end to end, and retrieval-based AI built on a client's own documents and records. Built pilot-first and priced as build plus metered run cost.",
};

/**
 * The two halves of AI Integration. Clients arrive asking for one of these
 * without knowing its name, so each is defined before it is sold.
 */
const halves = [
  {
    kicker: "This is what AI adoption means",
    title: "Agents and automation in the workflows you already run",
    body: "AI placed inside a process the business runs today, so a step that needed a person no longer does. Nothing about how you work has to be rebuilt around it. The test is simple: a step that used to need somebody still needs somebody, or it does not.",
  },
  {
    kicker: "Your own AI, not a rented one",
    title: "AI built on your own documents and records",
    body: "A public chatbot knows nothing about your business. This is the opposite: your policies, contracts, records and files become AI that answers from them and shows where each answer came from, running inside your environment under your own governance.",
  },
];

const native = [
  ["Retrieval over your own material", "Your documents are indexed so the AI answers from them rather than from the open internet, and every answer carries the source it came from. The technical name for this is RAG; what it means in practice is that an answer can be checked."],
  ["An assistant fitted to one function", "Finance, legal, operations or customer service. It knows that function's documents, that function's language, and the questions that function actually asks."],
  ["It stays in your environment", "Your material is not sent off to train somebody else's model. Where it runs, who can reach it and what is logged are decided before the build, with your NDPA position written down."],
  ["Tested before anyone relies on it", "We measure how often it is right, how often it says it does not know, and where it fails, on your own questions. A build that has not been evaluated is not finished."],
];

const workflows = [
  ["Customer support agents", "A support agent that resolves cases on your channel, with a defined containment target and a clean handoff to a person when it is out of depth."],
  ["Document capture and posting", "Invoices, receipts and forms read, extracted and posted into the system without a person retyping them."],
  ["Exception detection", "The system watches the flow and flags what is wrong, instead of a manager finding it a week later."],
  ["Report generation", "The report assembles itself from the source, so Monday starts with a report to read, not a report to build."],
];

const offers = [
  { name: "Integration Diagnostic", shape: "Two weeks. Workflow mapping, volume and cost baseline, containment feasibility, build-or-configure recommendation.", price: "On application" },
  { name: "Pilot", shape: "Four to six weeks. One workflow and one channel, or one function's documents and a set of real questions. Scoped small so you can judge it.", price: "On application" },
  { name: "The Build", shape: "Full agent, automation or retrieval build. Knowledge base, integration, escalation logic, evaluation, logging, monitoring.", price: "On application" },
  { name: "Run", shape: "Hosting, model run cost, monitoring, tuning, support SLA. Recurring and metered, reviewed quarterly.", price: "On application" },
];

const rules = [
  ["It runs on a meter.", "Model usage is a permanent monthly cost. We price build, plus run, plus monitoring. Never a one-off fee that hides what it costs to keep alive."],
  ["It acts unsupervised.", "A wrong answer to a customer is your liability. Every contract carries a confidence threshold, a human escalation path, and a logged audit trail."],
  ["We diagnose before we build.", "If you already run a helpdesk platform, part of this is configuring what you own. We establish that first, and charge for configuration if that is what it is."],
];

export default function AiIntegrationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <PageHero
        title="Your people are doing work the software should do."
        lead="AI Integration covers two things. Agents and automation placed inside the workflows you already run, and AI built on your own documents and records. The AI Edge teaches your people to use AI. AI Integration builds AI that does the job."
        image="/pictures/IMG_342_2.jpeg"
        alt="A facilitator walking a team through reports on screen"
        imagePosition="object-[center_20%]"
        secondary={{ href: "/operations-core/erp", label: "See ERP" }}
      />

      {/* THE TWO HALVES */}
      <section className="border-b border-(--line)">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <h2 className="mt-5 max-w-3xl text-3xl leading-tight sm:text-4xl">Two kinds of work live here.</h2>
            <p className="measure mt-6 text-[15px] leading-relaxed text-(--ink-soft)">
              Most enquiries are about one of these two without knowing the name for it. Either is
              bought on its own.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {halves.map((h, i) => (
              <Reveal key={h.title} delay={i * 90}>
                <div className="card-sheen h-full rounded-2xl border border-(--line) bg-(--surface) p-8 shadow-soft lg:p-9">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-(--navy-text)">{h.kicker}</p>
                  <h3 className="mt-4 text-xl leading-snug">{h.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-(--ink-soft)">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* WORKFLOWS */}
      <section className="border-b border-(--line)">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Whole workflows, not suggestions.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-(--line) bg-(--line) shadow-soft md:grid-cols-2">
            {workflows.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 2) * 100} className="bg-(--surface) p-8 lg:p-10">
                <h3 className="text-xl">{t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-(--ink-soft)">{d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* NATIVE BUILDS */}
      <section className="texture-dots border-b border-(--line) bg-(--panel)">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <h2 className="mt-5 max-w-3xl text-3xl leading-tight sm:text-4xl">
              AI that knows your business, because it was built on it.
            </h2>
            <p className="measure mt-6 text-[15px] leading-relaxed text-(--ink-soft)">
              The common complaint about AI at work is that it is confidently wrong about things only
              your company knows. That is a sourcing problem, and it is fixable.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-(--line) bg-(--line) shadow-soft md:grid-cols-2">
            {native.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 2) * 100} className="bg-(--surface) p-8 lg:p-10">
                <h3 className="text-xl">{t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-(--ink-soft)">{d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* RULES */}
      <section className="border-b border-(--line)">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Honest about the cost and the risk.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {rules.map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="flex flex-col gap-2 border-t-2 border-(--navy-text) pt-5">
                  <h3 className="text-lg">{t}</h3>
                  <p className="text-sm leading-relaxed text-(--ink-soft)">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* OFFERS */}
      <section className="border-b border-(--line)">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Diagnose, pilot, build, run.</h2>
          </Reveal>
          <div className="card-sheen mt-12 overflow-hidden rounded-2xl border border-(--line) bg-(--surface) shadow-soft">
            {offers.map((o, i) => (
              <Reveal key={o.name}>
                <div className={`grid grid-cols-1 gap-2 bg-(--surface) p-6 sm:grid-cols-12 sm:items-center lg:px-8 ${i > 0 ? "border-t border-(--line)" : ""}`}>
                  <div className="sm:col-span-3 flex items-baseline gap-3">
                    <span className="text-sm font-semibold text-(--accent)">0{i + 1}</span>
                    <h3 className="text-lg">{o.name}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-(--ink-soft) sm:col-span-7">{o.shape}</p>
                  <p className="text-sm font-medium text-(--navy-text) sm:col-span-2 sm:text-right">{o.price}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-glow">
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-3xl">
            <h2 className="text-3xl leading-tight sm:text-4xl">Prove it on one workflow first.</h2>
            <p className="mt-6 text-lg leading-relaxed text-(--ink-soft)">
              A pilot takes one workflow and one channel, with a containment target you can check. If it
              works, we build. If your platform already does part of it, we tell you. Book the diagnostic.
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
