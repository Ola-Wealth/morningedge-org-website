import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { Container, ButtonLink } from "@/components/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How a MorningEdge engagement runs, phase by phase. Diagnose, build, adopt, sustain. A diagnostic first, always, with a baseline every promise is measured against.",
  alternates: { canonical: `${site.url}/approach` },
  openGraph: { title: "Approach | MorningEdge", url: `${site.url}/approach` },
};

const phases = [
  {
    n: "01",
    t: "Diagnose",
    d: "We map the real workflow, not the one on the org chart. We baseline where you are before we change anything, because the baseline is what every later number is measured against. Nobody buys a build without this, and it is credited to the build if you go ahead.",
  },
  {
    n: "02",
    t: "Build",
    d: "We enable the people, or configure the system, against the plan the diagnostic produced. No templates carried in from another company. What we build fits how you actually operate.",
  },
  {
    n: "03",
    t: "Adopt",
    d: "Role-based training to the Adoption Standard. We name the users, set the checkpoints, and grow internal champions who carry it after us. This is the phase most firms skip. It is the phase that decides whether any of it was worth it.",
  },
  {
    n: "04",
    t: "Sustain",
    d: "Maintenance, refreshers, run cost and support, quoted inside the build and never chased afterwards. For systems that act, this is a metered monthly cost we name up front and review each quarter.",
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        title="A diagnostic first. Always."
        lead="Every engagement runs the same four phases, whether we are enabling your people or building your system. The order does not change, because the order is what protects your money."
        image="/pictures/IMG_342_1.jpeg"
        alt="A working session in progress"
        secondary={{ href: "/adoption-standard", label: "The Adoption Standard" }}
      />

      {/* PHASES */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <div className="flex flex-col">
            {phases.map((p, i) => (
              <Reveal key={p.n}>
                <div className={`grid grid-cols-1 gap-4 py-10 lg:grid-cols-12 lg:gap-10 ${i > 0 ? "border-t border-[#E4DED0]" : ""}`}>
                  <div className="lg:col-span-4">
                    <span className="text-sm font-semibold text-[#B45309]">{p.n}</span>
                    <h2 className="mt-2 text-3xl">{p.t}</h2>
                  </div>
                  <p className="measure text-[15px] leading-relaxed text-[#4A463C] lg:col-span-8">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* PULL QUOTE */}
      <section className="bg-[#1A1AB5]">
        <Container className="py-16 lg:py-20">
          <Reveal>
            <p className="mx-auto max-w-3xl text-center text-2xl leading-snug text-white sm:text-3xl" style={{ fontFamily: "var(--font-serif)" }}>
              {site.conviction}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-3xl">
            <h2 className="text-3xl leading-tight sm:text-4xl">Start with the diagnostic.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#4A463C]">
              It is the cheapest, fastest way to find out whether we are the right firm for what you are
              carrying. Tell us what is breaking.
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
