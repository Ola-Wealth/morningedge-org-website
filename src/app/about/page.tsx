import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Container, ButtonLink } from "@/components/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "MorningEdge is a founder-led business operations firm in Lagos, led by Olamilekan E. Wealth, with a specialist delivery network for implementation and engineering.",
  alternates: { canonical: `${site.url}/about` },
  openGraph: { title: "About | MorningEdge Systems", url: `${site.url}/about` },
};

const beliefs = [
  ["People who perform.", "We make your staff produce more in the tools they already own."],
  ["Systems that hold.", "We put the operation on software that does the work and holds the numbers."],
  ["Businesses that execute.", "The two together are not a slogan. They are the outcome we sign for."],
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-(--line)">
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-4xl">
            <h1 className="mt-5 text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
              A business operations firm, built to be accountable.
            </h1>
            <p className="measure mt-8 text-lg leading-relaxed text-(--ink-soft)">
              MorningEdge works on the two places a company loses output. Its people, and its systems. We
              are deliberately small, so that one person stays accountable for whether the work gets used.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* TRIAD */}
      <section className="border-b border-(--line)">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {beliefs.map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="flex flex-col gap-2 border-t-2 border-(--navy-text) pt-5">
                  <h2 className="text-2xl">{t}</h2>
                  <p className="text-[15px] leading-relaxed text-(--ink-soft)">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FOUNDER */}
      <section className="border-b border-(--line)">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5 lg:gap-16">
            <Reveal className="lg:col-span-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-(--line) shadow-soft-lg">
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
              <h2 className="mt-5 text-3xl leading-tight sm:text-4xl">Olamilekan E. Wealth</h2>
              <div className="measure mt-6 flex flex-col gap-4 text-[15px] leading-relaxed text-(--ink-soft)">
                <p>
                  Olamilekan is a business operations executive and AI systems consultant. He works with
                  founders and executives to design the systems that turn effort into output, and he leads
                  architecture, scoping and the adoption contract on every MorningEdge engagement.
                </p>
                <p>
                  He is ERPNext-certified. Implementation, development and engineering are carried by a
                  specialist delivery network working to a written standard. That keeps the capability deep
                  and the accountability single.
                </p>
                <p>
                  He is also a writer and speaker on strategy, leadership and the discipline of execution.
                  That work runs under his own name, never on a commercial proposal.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* DELIVERY NETWORK */}
      <section className="border-b border-(--line)">
        <Container className="py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-16">
            <Reveal>
              <h2 className="mt-5 text-3xl leading-tight">Prime contractor, specialist network.</h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-2">
              <div className="measure flex flex-col gap-4 text-[15px] leading-relaxed text-(--ink-soft)">
                <p>
                  MorningEdge is the prime contractor. Specialist capability, ERPNext implementation and AI
                  engineering, is delivered through a named delivery network under signed agreements, with
                  back-to-back service levels and confidentiality that flows down to every partner.
                </p>
                <p>
                  It is how firms this size deliver serious work without pretending to be a large team. You
                  contract with one accountable owner. Behind that owner sits certified capability with a
                  second name for every function.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* REGISTERED */}
      <section className="border-b border-(--line)">
        <Container className="py-16 lg:py-20">
          <Reveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-faint)">Registered entity</p>
                <p className="mt-2 text-[15px] text-(--ink)">{site.legalName}</p>
                <p className="text-[15px] text-(--ink)">{site.rc}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-faint)">Founded</p>
                <p className="mt-2 text-[15px] text-(--ink)">{site.founded}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--ink-faint)">Registered office</p>
                <p className="mt-2 text-[15px] text-(--ink)">{site.registeredOffice}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-glow">
        <Container className="py-20 lg:py-28">
          <Reveal className="max-w-3xl">
            <h2 className="text-3xl leading-tight sm:text-4xl">Bring us the work that keeps failing to stick.</h2>
            <p className="mt-6 text-lg leading-relaxed text-(--ink-soft)">
              A diagnostic tells you what we would do and whether it is worth doing. If we are not the right
              firm, we will say so plainly.
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
