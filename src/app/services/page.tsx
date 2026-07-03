import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PillBadge from "@/components/PillBadge";
import { Settings2, BrainCircuit, GraduationCap, ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "MorningEdge Systems delivers three core services: Operations Architecture, AI Systems Integration, and Executive Development — for organizations serious about building businesses that execute.",
  alternates: { canonical: "https://www.morningedgesystems.com/services" },
  openGraph: {
    title: "Services | MorningEdge Systems",
    description:
      "Operations architecture, AI systems integration, and executive development. Three disciplines. One outcome: a business built to execute.",
    url: "https://www.morningedgesystems.com/services",
  },
};

const services = [
  {
    icon: <Settings2 size={22} />,
    title: "Operations Architecture",
    slug: "operations",
    image: "/pictures/service-operations.jpg",
    position: "object-center",
    tagline: "Structure is not bureaucracy. It is the foundation of everything else.",
    paragraphs: [
      "Most organizations are not failing because of bad strategy. They are failing because their internal architecture cannot carry the weight of their ambition. Processes are undefined or undocumented. Decisions are made inconsistently. Accountability lives in relationships rather than systems. And the result is a business that depends on a few people working at unsustainable intensity to hold everything together.",
      "MorningEdge's Operations Architecture engagements begin with an honest diagnosis of what is actually happening inside your organization. Not assumptions. Not best guesses. We map the real workflow, identify where execution breaks down, and design the structural interventions that produce lasting change.",
      "We build process documentation that actually gets used. Accountability frameworks that do not require constant management. Decision-making structures that empower teams to act with confidence. The result is an organization that moves faster, makes better decisions, and handles complexity without requiring heroics.",
    ],
    deliverables: [
      "Workflow mapping and gap analysis",
      "Process documentation and SOPs",
      "Accountability and governance frameworks",
      "Operational restructuring and redesign",
      "Team enablement and adoption support",
    ],
    outcome: "The result: an operation your team can own and run. One that scales without falling apart.",
  },
  {
    icon: <BrainCircuit size={22} />,
    title: "AI Systems Integration",
    slug: "ai-systems",
    image: "/pictures/service-ai.jpg",
    position: "object-center",
    tagline: "The right AI implementation does not make you look modern. It makes you execute better.",
    paragraphs: [
      "Most AI implementations fail before they start. Not because the technology is wrong, but because the problem definition is wrong. Organizations chase tools before they understand their bottlenecks. They automate the visible before they diagnose the real. And the result is AI investment that produces noise rather than signal.",
      "MorningEdge's AI Systems Integration practice is built differently. We begin with operations. We identify where human judgment is being wasted on low-value tasks. Where information is being lost between systems. Where speed is constrained by manual processes that have not been questioned. Then we design AI-enabled solutions that solve those specific problems without adding complexity.",
      "Practical automation. Intelligent workflow design. Decision support systems that improve the quality and speed of your team's choices. Every implementation is built to be understood, adopted, and owned by your organization, not dependent on our continued involvement.",
    ],
    deliverables: [
      "Operational bottleneck diagnosis",
      "AI readiness assessment",
      "Workflow automation design and deployment",
      "AI-enabled decision support systems",
      "Team training and adoption programs",
    ],
    outcome: "The result: faster decisions, fewer errors, and AI that compounds in value over time.",
  },
  {
    icon: <GraduationCap size={22} />,
    title: "Executive Development",
    slug: "executive-development",
    image: "/pictures/IMG_342_2.jpeg",
    position: "object-[center_18%]",
    tagline: "Knowledge that does not change behavior does not count.",
    paragraphs: [
      "Strategy is the easiest thing to discuss and the hardest thing to install. Most leadership teams understand what they should be doing. The gap is in the thinking frameworks, leadership disciplines, and organizational habits that make disciplined execution possible. Understanding is not the constraint. Practice is.",
      "MorningEdge's Executive Development engagements are built around behavioral change, not information delivery. Whether it is a keynote for a leadership conference, a workshop for a founding team, or a sustained development program for an executive cohort, the design is the same: shift how leaders think, what they prioritize, and how they act.",
      "Topics include operational strategy, AI adoption and governance, performance systems, leadership under uncertainty, delegation and accountability, and building organizations that execute consistently. Every program is designed to produce results that outlast the event itself.",
    ],
    deliverables: [
      "Executive keynotes and conference sessions",
      "Leadership workshops and intensives",
      "Founding team strategy and alignment programs",
      "Executive cohort development programs",
      "Custom frameworks and leadership tools",
    ],
    outcome: "The result: sharper thinking, stronger disciplines, and leadership that executes with intention.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── HEADER ── */}
      <section className="bg-white pt-16 pb-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col items-start gap-6">
              <PillBadge>Services</PillBadge>
              <h1
                className="text-[#0A0A0A] font-black leading-[1.05] tracking-tight max-w-3xl"
                style={{ fontSize: "clamp(2.4rem, 5.5vw, 72px)", letterSpacing: "-0.03em" }}
              >
                Three disciplines.<br />
                <span className="text-[#1A1AB5]">One outcome.</span>
              </h1>
              <p className="text-[#4A4A4A] text-lg leading-relaxed max-w-2xl">
                Every MorningEdge engagement is designed to remove a specific constraint between where your organization is and where it needs to be. We work across three interconnected service areas.
              </p>
            </div>
          </FadeIn>

          {/* Quick nav pills */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap gap-2.5 mt-10">
              {services.map((s) => (
                <a
                  key={s.slug}
                  href={`#${s.slug}`}
                  className="inline-flex items-center gap-2 bg-[#F5F6F8] border border-[#EEF0F2] text-[#0A0A0A] rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#1A1AB5] hover:text-white hover:border-[#1A1AB5] transition-colors cursor-pointer"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SERVICES ── */}
      {services.map((service, i) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`py-16 lg:py-20 px-4 sm:px-6 lg:px-10 scroll-mt-24 ${i % 2 === 0 ? "bg-[#F5F6F8]" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto">
            {/* Photo banner */}
            <FadeIn>
              <div className="relative rounded-[28px] overflow-hidden h-[260px] lg:h-[340px] mb-10">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className={`object-cover ${service.position}`}
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-[#0A0A0A]/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    <div className="w-11 h-11 rounded-full bg-white text-[#1A1AB5] flex items-center justify-center shadow-sm mb-4">
                      {service.icon}
                    </div>
                    <h2 className="text-white font-black tracking-tight" style={{ fontSize: "clamp(1.7rem, 3vw, 44px)", letterSpacing: "-0.02em" }}>
                      {service.title}
                    </h2>
                  </div>
                  <span className="hidden sm:inline-flex bg-white/15 backdrop-blur border border-white/25 text-white rounded-full px-4 py-2 text-xs font-semibold">
                    0{i + 1} / 03
                  </span>
                </div>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
              {/* Content */}
              <FadeIn className="lg:col-span-3">
                <div>
                  <p className="text-[#1A1AB5] text-base lg:text-lg font-bold mb-7 leading-snug">
                    &ldquo;{service.tagline}&rdquo;
                  </p>
                  <div className="flex flex-col gap-4 mb-8">
                    {service.paragraphs.map((p, j) => (
                      <p key={j} className="text-[#4A4A4A] leading-relaxed text-sm sm:text-[15px]">
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="bg-[#1A1AB5]/5 border border-[#1A1AB5]/15 rounded-2xl p-6">
                    <p className="text-[#1A1AB5] text-xs font-bold uppercase tracking-widest mb-2.5">Engagement Outcomes</p>
                    <p className="text-[#0A0A0A] text-sm font-semibold leading-relaxed">{service.outcome}</p>
                  </div>
                </div>
              </FadeIn>

              {/* Deliverables card */}
              <FadeIn delay={0.1} className="lg:col-span-2">
                <div className="bg-[#0A0A0A] rounded-[28px] p-8 lg:p-9 lg:sticky lg:top-24">
                  <PillBadge dark>What We Deliver</PillBadge>
                  <div className="flex flex-col gap-3.5 mt-7">
                    {service.deliverables.map((d, j) => (
                      <div key={j} className="flex items-start gap-3.5">
                        <span className="w-6 h-6 rounded-full bg-[#22D3EE]/15 text-[#22D3EE] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <p className="text-gray-300 text-sm leading-relaxed">{d}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-9 pt-7 border-t border-white/10">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-3 bg-white text-[#0A0A0A] rounded-full pl-6 pr-2 py-2 text-sm font-semibold hover:bg-[#22D3EE] transition-colors cursor-pointer"
                    >
                      Engage MorningEdge
                      <span className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                        <ArrowRight size={15} />
                      </span>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA CARD ── */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="relative bg-[#0A0A0A] rounded-[32px] overflow-hidden px-8 py-14 lg:px-16 lg:py-18 text-center">
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-[#1A1AB5]/25 blur-3xl" />
              <div className="relative flex flex-col items-center gap-6">
                <PillBadge dark>Start Here</PillBadge>
                <h2
                  className="text-white font-black tracking-tight max-w-2xl"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 44px)", letterSpacing: "-0.02em", lineHeight: 1.1 }}
                >
                  Not sure which engagement is right?
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                  Tell us what you are building and where you are stuck. We will identify the right entry point and whether MorningEdge is the right fit.
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 bg-white text-[#0A0A0A] rounded-full pl-7 pr-2 py-2 text-sm font-semibold hover:bg-[#22D3EE] transition-colors cursor-pointer"
                >
                  Start the Conversation
                  <span className="w-9 h-9 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                    <ArrowRight size={16} />
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
