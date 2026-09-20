import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Container, ButtonLink } from "@/components/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The AI Edge",
  description:
    "AI enablement for your workforce. Your staff produce more using Microsoft 365 Copilot inside the tools your company already pays for. Usage written into the contract.",
  alternates: { canonical: `${site.url}/ai-edge` },
  openGraph: { title: "The AI Edge | MorningEdge", url: `${site.url}/ai-edge` },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "The AI Edge",
  serviceType: "AI enablement for the workforce",
  provider: { "@type": "Organization", name: "MorningEdge", url: site.url },
  areaServed: { "@type": "Country", name: "Nigeria" },
  description:
    "AI enablement inside Microsoft 365 Copilot, for the functions where the work lives. Delivered against the Adoption Standard.",
};

const offers = [
  { name: "The Room", shape: "A free executive session or workshop. Where every engagement starts.", price: "Free" },
  { name: "Organisation-Wide AI Literacy", shape: "Multi-session, multi-function, train-the-trainer, with governance and an NDPA module.", price: "On application" },
  { name: "Function Tracks", shape: "Role-specific enablement for the functions below, delivered as standalone programmes.", price: "On application" },
  { name: "The Boardroom Edge", shape: "The executive tier. The MD and his direct reports.", price: "On application" },
  { name: "AI Edge Live Cohort", shape: "Open enrolment for individual professionals. Runs on the cohort site.", price: "Open enrolment" },
  { name: "Refresh and Onboard", shape: "Recurring. New hires, new tools, annual refresher.", price: "On application" },
];

const tracks = [
  "Finance and Internal Audit",
  "Human Capital Management",
  "Product and Design",
  "Brands and Communications",
  "Sales",
];

export default function AiEdgePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <PageHero
        title="Your staff already have the tool. They have never opened it."
        lead="The AI Edge puts capability into your people. They produce more using AI inside the tools you already pay for. Microsoft 365 Copilot, in Outlook, Excel, Word and Teams, where the work actually lives."
        image="/pictures/IMG_342_5.jpeg"
        alt="Olamilekan E. Wealth teaching a room of professionals in Lagos"
        imagePosition="object-[center_30%]"
        secondary={{ href: "/adoption-standard", label: "The Adoption Standard" }}
      />

      {/* WHY COPILOT */}
      <section className="border-b border-(--line)">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
            <Reveal>
              <h2 className="mt-5 text-3xl leading-tight">Not a chatbot. The tool on the desk.</h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-2">
              <div className="measure flex flex-col gap-4 text-[15px] leading-relaxed text-(--ink-soft)">
                <p>
                  The work lives in Outlook, Excel, Word, Teams and SharePoint. Microsoft 365 Copilot is
                  built into those apps, and most staff do not know it is there. We teach in the tool the
                  company already owns, on the tasks people do every day.
                </p>
                <p>
                  Demonstrating in any other tool tells the room that the thing they already pay for is the
                  consolation prize. It is not. It is the fastest return available, because the licence is
                  already bought.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PRODUCT LINE */}
      <section className="border-b border-(--line)">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">From a free room to an organisation-wide programme.</h2>
          </Reveal>
          <div className="card-sheen mt-12 overflow-hidden rounded-2xl border border-(--line) bg-(--surface) shadow-soft">
            {offers.map((o, i) => (
              <Reveal key={o.name}>
                <div className={`grid grid-cols-1 gap-2 p-6 sm:grid-cols-12 sm:items-center lg:px-8 ${i > 0 ? "border-t border-(--line)" : ""} bg-(--surface)`}>
                  <h3 className="text-lg sm:col-span-3">{o.name}</h3>
                  <p className="text-sm leading-relaxed text-(--ink-soft) sm:col-span-7">{o.shape}</p>
                  <p className="text-sm font-medium text-(--navy-text) sm:col-span-2 sm:text-right">{o.price}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <a
              href={site.cohortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-(--navy-text)"
            >
              Visit the AI Edge cohort site <ArrowUpRight size={15} />
            </a>
          </Reveal>
        </Container>
      </section>

      {/* FUNCTION TRACKS */}
      <section className="border-b border-(--line)">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Built for the function, not the crowd.</h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-(--line) bg-(--line) shadow-soft sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((t, i) => (
              <Reveal key={t} delay={(i % 3) * 80} className="bg-(--surface) p-6 lg:p-8">
                <p className="text-lg text-(--ink)">{t}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ADOPTION */}
      <section className="border-b border-(--line)">
        <Container className="py-20 lg:py-24">
          <Reveal className="max-w-3xl">
            <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">We measure whether people use the tool.</h2>
            <ul className="mt-8 flex flex-col gap-4">
              {[
                ["Day 30", "Named staff using the tool weekly in live work."],
                ["Day 60", "Hours returned per function, measured against the baseline we set before we started."],
                ["Day 90", "Function-level workflows running without us."],
              ].map(([d, t]) => (
                <li key={d} className="flex flex-col gap-1 border-l-2 border-(--navy-text) pl-5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-(--accent)">{d}</span>
                  <span className="text-[15px] leading-relaxed text-(--ink)">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-glow">
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-3xl">
            <h2 className="text-3xl leading-tight sm:text-4xl">Start with the room.</h2>
            <p className="mt-6 text-lg leading-relaxed text-(--ink-soft)">
              A free session shows your team what the tool already does. It is also the clearest picture we
              get of how your people actually work. Book it.
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
