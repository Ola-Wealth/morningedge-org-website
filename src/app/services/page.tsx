import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { Settings2, BrainCircuit, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "MorningEdge Systems delivers three core services: Operations Architecture, AI Systems Integration, and Executive Development — for organizations serious about building businesses that execute.",
  alternates: { canonical: "https://morningedgesystems.com/services" },
  openGraph: {
    title: "Services | MorningEdge Systems",
    description:
      "Operations architecture, AI systems integration, and executive development. Three disciplines. One outcome: a business built to execute.",
    url: "https://morningedgesystems.com/services",
  },
};

const services = [
  {
    icon: <Settings2 size={28} />,
    title: "Operations Architecture",
    slug: "operations",
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
    icon: <BrainCircuit size={28} />,
    title: "AI Systems Integration",
    slug: "ai-systems",
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
    icon: <GraduationCap size={28} />,
    title: "Executive Development",
    slug: "executive-development",
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
      {/* Header */}
      <section className="bg-[#0A0A0A] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-[#22D3EE] text-xs font-bold uppercase tracking-[0.2em] mb-6">Services</p>
            <h1
              className="text-5xl lg:text-6xl font-black text-white max-w-3xl leading-tight mb-8"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Three disciplines. One outcome.
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              Every MorningEdge engagement is designed to remove a specific constraint between where your organization is and where it needs to be. We work across three interconnected service areas.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      {services.map((service, i) => (
        <section
          key={service.slug}
          id={service.slug}
          className={i % 2 === 0 ? "bg-white py-24 px-6" : "bg-[#F7F7F7] py-24 px-6"}
        >
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                {/* Content */}
                <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                  <div className="text-[#1A1AB5] w-12 h-12 flex items-center justify-center bg-[#1A1AB5]/10 mb-6">
                    {service.icon}
                  </div>
                  <h2
                    className="text-4xl font-bold text-[#0A0A0A] mb-4"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {service.title}
                  </h2>
                  <p className="text-[#1A1AB5] text-sm font-semibold mb-8 italic">&ldquo;{service.tagline}&rdquo;</p>
                  <div className="flex flex-col gap-4 mb-8">
                    {service.paragraphs.map((p, j) => (
                      <p key={j} className="text-[#4A4A4A] leading-relaxed text-sm">
                        {p}
                      </p>
                    ))}
                  </div>
                  <div className="bg-[#1A1AB5]/5 border border-[#1A1AB5]/20 p-6">
                    <p className="text-[#1A1AB5] text-xs font-bold uppercase tracking-widest mb-3">Engagement Outcomes</p>
                    <p className="text-[#0A0A0A] text-sm font-semibold leading-relaxed">{service.outcome}</p>
                  </div>
                </div>

                {/* Deliverables */}
                <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                  <div className="bg-[#0A0A0A] p-10">
                    <p className="text-[#22D3EE] text-xs font-bold uppercase tracking-[0.2em] mb-6">What We Deliver</p>
                    <div className="flex flex-col gap-4">
                      {service.deliverables.map((d, j) => (
                        <div key={j} className="flex items-start gap-4">
                          <span className="text-[#22D3EE] font-bold text-sm mt-0.5 flex-shrink-0">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          <p className="text-gray-300 text-sm leading-relaxed">{d}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-10 pt-8 border-t border-white/10">
                      <Link
                        href="/contact"
                        className="inline-block bg-[#1A1AB5] text-white px-8 py-4 text-sm font-semibold hover:bg-[#1515A3] transition-colors"
                      >
                        Engage MorningEdge
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-[#0A0A0A] py-24 px-6 text-center">
        <FadeIn>
          <p className="text-[#22D3EE] text-xs font-bold uppercase tracking-[0.2em] mb-6">Start Here</p>
          <h2
            className="text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Not sure which engagement is right?
          </h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Tell us what you are building and where you are stuck. We will identify the right entry point and whether MorningEdge is the right fit.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#1A1AB5] text-white px-10 py-5 text-sm font-semibold hover:bg-[#1515A3] transition-colors"
          >
            Start the Conversation
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
