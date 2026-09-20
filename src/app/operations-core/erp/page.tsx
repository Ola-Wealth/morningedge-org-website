import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Container, ButtonLink } from "@/components/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Enterprise Resource Planning",
  description:
    "One centralised system holding all operations and all financials, built on ERPNext. Open source, configured for Nigerian reality: naira, VAT, WHT, FIRS, multi-entity consolidation, NDPA.",
  alternates: { canonical: `${site.url}/operations-core/erp` },
  openGraph: { title: "Enterprise Resource Planning | MorningEdge", url: `${site.url}/operations-core/erp` },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Enterprise Resource Planning",
  serviceType: "ERPNext implementation",
  provider: { "@type": "Organization", name: "MorningEdge", url: site.url },
  areaServed: { "@type": "Country", name: "Nigeria" },
  description:
    "ERPNext configured for Nigerian compliance and multi-entity consolidation. Diagnostic, build, rollout and sustain, delivered against the Adoption Standard.",
};

const compliance = ["Naira", "VAT", "WHT", "FIRS", "Multi-entity consolidation", "NDPA"];

const ladder = [
  { name: "Operations Diagnostic", shape: "Three weeks. Process map, systems audit, adoption baseline, prioritised roadmap, working prototype. Credited to the build within 60 days.", price: "On application" },
  { name: "The Build", shape: "Configuration, data migration, compliance, integrations, go-live. Priced by entity count and module scope.", price: "On application" },
  { name: "Rollout", shape: "Role-based training to the Adoption Standard. Internal champions. Train-the-trainer.", price: "On application" },
  { name: "Sustain", shape: "Annual maintenance, hosting, upgrades, support SLA, quarterly review.", price: "On application" },
];

export default function ErpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <PageHero
        title="Nobody can say what the group made last month without a meeting."
        lead="The numbers live in twelve spreadsheets across four departments. The books close three weeks late. We put the whole operation on one system, so the ledger answers the question instead of a meeting."
        image="/pictures/service-operations.jpg"
        alt="An operations wall of process notes being worked through"
        secondary={{ href: "/operations-core/ai-integration", label: "See AI Integration" }}
      />

      {/* WHY ERPNEXT */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
            <Reveal>
              <h2 className="mt-5 text-3xl leading-tight">You own the system. You pay for the work, not the licence.</h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-2">
              <div className="measure flex flex-col gap-4 text-[15px] leading-relaxed text-[#4A463C]">
                <p>
                  ERPNext is open source. There is no per-seat licence fee climbing every year. You own the
                  system outright, and you pay MorningEdge for the implementation, the part that decides
                  whether it works.
                </p>
                <p>
                  Full framework access means it bends to how a Nigerian company actually operates, rather
                  than forcing your business to fit software written for somewhere else. That is the whole
                  difference between an ERP that gets used and one that gets abandoned.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* COMPLIANCE */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Compliance is built in, not bolted on.</h2>
          </Reveal>
          <div className="mt-12 flex flex-wrap gap-3">
            {compliance.map((c, i) => (
              <Reveal key={c} delay={(i % 6) * 60}>
                <span className="inline-block rounded-md border border-[#E4DED0] bg-white px-5 py-2.5 text-sm font-medium text-[#17150F]">
                  {c}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* LADDER */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Diagnostic first. Then build, rollout, sustain.</h2>
          </Reveal>
          <div className="mt-12 overflow-hidden rounded-2xl border border-[#E4DED0] bg-white shadow-soft">
            {ladder.map((o, i) => (
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

      {/* DELIVERY */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <Reveal className="max-w-3xl">
            <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">Architecture from MorningEdge. Implementation from certified partners.</h2>
            <p className="mt-6 text-[15px] leading-relaxed text-[#4A463C]">
              MorningEdge leads architecture, scoping and adoption. Implementation and development are
              carried by Frappe-certified partners inside a specialist delivery network. You get one
              accountable owner and a bench of certified capability behind it.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-3xl">
            <h2 className="text-3xl leading-tight sm:text-4xl">Find out what to build, and what to leave alone.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#4A463C]">
              The diagnostic maps your operation, sets the baseline, and produces a working prototype. It is
              credited to the build if you go ahead. Book it.
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
