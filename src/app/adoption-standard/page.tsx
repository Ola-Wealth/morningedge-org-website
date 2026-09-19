import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, Eyebrow, ButtonLink } from "@/components/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Adoption Standard",
  description:
    "Training firms deliver attendance. Implementers deliver go-live. MorningEdge writes measured usage into the contract, baselined before delivery and measured at day 30, 60 and 90.",
  alternates: { canonical: `${site.url}/adoption-standard` },
  openGraph: { title: "The Adoption Standard | MorningEdge", url: `${site.url}/adoption-standard` },
};

const rows = [
  {
    label: "The AI Edge",
    note: "Measures whether people use the tool.",
    d30: "Named participants using the tool weekly in live work",
    d60: "Hours returned per function against baseline",
    d90: "Function-level workflows running without us",
  },
  {
    label: "Core · System of record",
    note: "Measures whether the operation runs on the system.",
    d30: "Named users transacting in the system",
    d60: "Transactions posted inside the system versus outside it",
    d90: "Time to close the month against baseline",
  },
  {
    label: "Core · Systems that act",
    note: "Measures whether the tool no longer needs the people.",
    d30: "Containment rate, cases closed without a human",
    d60: "Escalation quality and error rate on closed cases",
    d90: "Cost per resolved case against the human baseline",
  },
];

export default function AdoptionStandardPage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-4xl">
            <Eyebrow>The differentiator</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              We write usage into the contract.
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-[#4A463C]">
              Training firms deliver attendance. Implementers deliver go-live. Both walk away before the
              thing is used. We sign a usage number. It is baselined before delivery starts, and measured
              at day 30, 60 and 90.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* WHY IT MATTERS */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
            <Reveal>
              <Eyebrow>Why it exists</Eyebrow>
              <h2 className="mt-5 text-3xl leading-tight">Attendance is not adoption. Go-live is not adoption.</h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-2">
              <div className="measure flex flex-col gap-4 text-[15px] leading-relaxed text-[#4A463C]">
                <p>
                  A room full of trained staff who never open the tool is a cost, not a return. A system that
                  goes live and sits unused is worse, because it was expensive. The gap between delivery and
                  use is where most of this market quietly fails.
                </p>
                <p>
                  So we close it in the contract. Before delivery begins, we baseline where you are. Then we
                  commit to numbers at three checkpoints. If the usage is not there, the standard is not met,
                  and that is our problem to fix.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* THE TABLE */}
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <Reveal>
            <Eyebrow>What we measure</Eyebrow>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight sm:text-4xl">Three shapes of work. Nine checkpoints.</h2>
          </Reveal>

          <Reveal className="mt-12">
            <div className="overflow-x-auto rounded-lg border border-[#E4DED0]">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-[#F1ECE1]">
                    <th className="p-4 font-semibold text-[#17150F]">Work</th>
                    <th className="p-4 font-semibold text-[#17150F]">Day 30</th>
                    <th className="p-4 font-semibold text-[#17150F]">Day 60</th>
                    <th className="p-4 font-semibold text-[#17150F]">Day 90</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.label} className="border-t border-[#E4DED0] bg-white align-top">
                      <td className="p-4">
                        <span className="block font-medium text-[#1A1AB5]">{r.label}</span>
                        <span className="mt-1 block text-xs text-[#8A8578]">{r.note}</span>
                      </td>
                      <td className="p-4 text-[#4A463C]">{r.d30}</td>
                      <td className="p-4 text-[#4A463C]">{r.d60}</td>
                      <td className="p-4 text-[#4A463C]">{r.d90}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 measure text-sm leading-relaxed text-[#8A8578]">
              The exact thresholds are set per engagement, against your baseline, so they are numbers we will
              stand behind rather than numbers that sound good in a brochure. For systems that act, the
              standard inverts: it measures whether the tool has stopped needing the people.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section>
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-3xl">
            <h2 className="text-3xl leading-tight sm:text-4xl">Ask us to sign the number.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#4A463C]">
              Nobody else in this market will. Bring us the work that keeps failing to stick, and we will
              tell you what we can commit to, in writing.
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
