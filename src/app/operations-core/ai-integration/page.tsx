import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Container, ButtonLink } from "@/components/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Integration",
  description:
    "AI built into the workflow to carry work end to end. Customer support agents, document capture and posting, exception detection, report generation. Pilot first, priced as build plus run.",
  alternates: { canonical: `${site.url}/operations-core/ai-integration` },
  openGraph: { title: "AI Integration | MorningEdge", url: `${site.url}/operations-core/ai-integration` },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Integration",
  serviceType: "AI systems and workflow automation",
  provider: { "@type": "Organization", name: "MorningEdge", url: site.url },
  areaServed: { "@type": "Country", name: "Nigeria" },
  description:
    "AI agents and automations that carry work end to end, built pilot-first and priced as build plus metered run cost.",
};

const workflows = [
  ["Customer support agents", "A support agent that resolves cases on your channel, with a defined containment target and a clean handoff to a person when it is out of depth."],
  ["Document capture and posting", "Invoices, receipts and forms read, extracted and posted into the system without a person retyping them."],
  ["Exception detection", "The system watches the flow and flags what is wrong, instead of a manager finding it a week later."],
  ["Report generation", "The report assembles itself from the source, so Monday starts with a report to read, not a report to build."],
];

const offers = [
  { name: "Integration Diagnostic", shape: "Two weeks. Workflow mapping, volume and cost baseline, containment feasibility, build-or-configure recommendation.", price: "On application" },
  { name: "Agent Pilot", shape: "Four to six weeks. One workflow, one channel, one containment target. Scoped small so you can judge it.", price: "On application" },
  { name: "The Build", shape: "Full agent or automation. Knowledge base, channel integration, escalation logic, logging, monitoring.", price: "On application" },
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
        lead="AI Integration builds AI into the workflow to carry work end to end, rather than assist a person doing it by hand. The AI Edge teaches your people to use AI. AI Integration builds AI that does the job."
        image="/pictures/IMG_342_2.jpeg"
        alt="A facilitator walking a team through reports on screen"
        imagePosition="object-[center_20%]"
        secondary={{ href: "/operations-core/erp", label: "See ERP" }}
      />

      {/* WORKFLOWS */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Whole workflows, not suggestions.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#E4DED0] bg-[#E4DED0] shadow-soft md:grid-cols-2">
            {workflows.map(([t, d], i) => (
              <Reveal key={t} delay={(i % 2) * 100} className="bg-white p-8 lg:p-10">
                <h3 className="text-xl">{t}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#4A463C]">{d}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* RULES */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Honest about the cost and the risk.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {rules.map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="flex flex-col gap-2 border-t-2 border-[#1A1AB5] pt-5">
                  <h3 className="text-lg">{t}</h3>
                  <p className="text-sm leading-relaxed text-[#4A463C]">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* OFFERS */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Diagnose, pilot, build, run.</h2>
          </Reveal>
          <div className="mt-12 overflow-hidden rounded-2xl border border-[#E4DED0] bg-white shadow-soft">
            {offers.map((o, i) => (
              <Reveal key={o.name}>
                <div className={`grid grid-cols-1 gap-2 bg-white p-6 sm:grid-cols-12 sm:items-center lg:px-8 ${i > 0 ? "border-t border-[#E4DED0]" : ""}`}>
                  <div className="sm:col-span-3 flex items-baseline gap-3">
                    <span className="text-sm font-semibold text-[#B45309]">0{i + 1}</span>
                    <h3 className="text-lg">{o.name}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-[#4A463C] sm:col-span-7">{o.shape}</p>
                  <p className="text-sm font-medium text-[#1A1AB5] sm:col-span-2 sm:text-right">{o.price}</p>
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
            <h2 className="text-3xl leading-tight sm:text-4xl">Prove it on one workflow first.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#4A463C]">
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
