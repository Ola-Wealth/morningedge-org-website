import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ParallaxBg from "@/components/ParallaxBg";
import { Settings2, BrainCircuit, GraduationCap, Search, Compass, Zap, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "MorningEdge Systems | We Build Businesses That Execute.",
  description:
    "MorningEdge is a business operations and AI systems consultancy helping founders, executives, and growing organizations design the systems that scale.",
};

const services = [
  {
    icon: <Settings2 size={22} />,
    title: "Operations Architecture",
    image: "/pictures/service-operations.jpg",
    href: "/services#operations-design",
    description:
      "We map, restructure, and rebuild the internal systems of your organization. Processes are defined. Accountability is built in. Execution becomes repeatable.",
  },
  {
    icon: <BrainCircuit size={22} />,
    title: "AI Systems Integration",
    image: "/pictures/service-ai.jpg",
    href: "/services#ai-systems",
    description:
      "We identify the real bottlenecks in your workflows and deploy AI-enabled solutions that reduce friction, improve decision quality, and compound over time.",
  },
  {
    icon: <GraduationCap size={22} />,
    title: "Executive Development",
    image: "/pictures/IMG_342_1.jpeg",
    href: "/services#executive-development",
    description:
      "Our programs equip leadership teams with the frameworks, disciplines, and strategic tools to lead organizations that execute with consistency and intention.",
  },
];

const approach = [
  {
    icon: <Search size={20} />,
    number: "01",
    title: "Diagnose",
    description: "We begin with what is actually happening inside your business. Not assumptions. Not surface-level symptoms. Diagnosis.",
  },
  {
    icon: <Compass size={20} />,
    number: "02",
    title: "Design",
    description: "We architect the systems, structures, and workflows your specific situation requires. No templates. No off-the-shelf solutions.",
  },
  {
    icon: <Zap size={20} />,
    number: "03",
    title: "Deploy",
    description: "We implement alongside your team, not in isolation from it. Adoption is part of the design.",
  },
  {
    icon: <RefreshCw size={20} />,
    number: "04",
    title: "Sustain",
    description: "Every engagement is built for durability. The goal is a business that runs without depending on our continued involvement.",
  },
];

const stats = [
  { value: "50+", label: "Engagements Delivered" },
  { value: "12+", label: "Industries Served" },
  { value: "3", label: "Core Disciplines" },
  { value: "100%", label: "Outcome-Focused" },
];

export default function HomePage() {
  const serif = { fontFamily: "var(--font-cormorant)" };
  const sans  = { fontFamily: "var(--font-dm-sans)" };

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex flex-col justify-between pt-[100px] pb-16 border-b border-[#E5E5E5] overflow-hidden">
        {/* Cinematic parallax background */}
        <ParallaxBg
          src="/pictures/hero-bg.jpeg"
          overlay="bg-[#0A0A0A]/70"
          position="center center"
          strength={15}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto px-8 lg:px-16 w-full flex flex-col gap-12">

          {/* Label */}
          <span
            className="text-[#22D3EE] text-xs uppercase tracking-[0.25em]"
            style={sans}
          >
            MorningEdge Systems
          </span>

          {/* Headline */}
          <h1
            className="text-white leading-[1em]"
            style={{
              ...sans,
              fontSize: "clamp(2.8rem, 6.5vw, 92px)",
              letterSpacing: "-0.03em",
              fontWeight: 900,
              WebkitTextStroke: "1.2px #FFFFFF",
            }}
          >
            We Build Businesses<br />
            <em className="not-italic text-[#22D3EE]" style={{ WebkitTextStroke: "1.2px #22D3EE" }}>That Execute.</em>
          </h1>

          {/* Bottom bar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end pt-8 border-t border-white/20">
            <p
              className="text-gray-300 text-lg leading-relaxed"
              style={sans}
            >
              MorningEdge is a business operations and AI systems consultancy. We work with founders, executives, and growing organizations to design the systems and structures that turn ambition into consistent execution.
            </p>
            <div className="flex flex-wrap gap-4 lg:justify-end" style={sans}>
              <Link
                href="/contact"
                className="bg-[#1A1AB5] text-white px-8 py-4 text-xs font-medium uppercase tracking-widest hover:bg-[#1515A3] transition-colors"
              >
                Start an Engagement
              </Link>
              <Link
                href="/services"
                className="border border-white text-white px-8 py-4 text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-[#0A0A0A] transition-colors"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MANDATE STRIP ── */}
      <section className="bg-[#0A0A0A] py-16 px-8 lg:px-16">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <p className="text-[#22D3EE] text-xs uppercase tracking-[0.25em]" style={sans}>The MorningEdge Mandate</p>
          <blockquote
            className="text-[#FFFFFF] text-3xl lg:text-4xl font-light leading-snug lg:col-span-2"
            style={{ ...sans, letterSpacing: "-0.002em" }}
          >
            Execution is not an accident. It is architecture.
          </blockquote>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="bg-[#F5F5F5] py-24 px-8 lg:px-16">
        <div className="max-w-[1920px] mx-auto">
          <FadeIn>
            <p className="text-[#1A1AB5] text-xs uppercase tracking-[0.25em] mb-6" style={sans}>What We Do</p>
            <h2
              className="text-[#0A0A0A] mb-4 font-light"
              style={{ ...sans, fontSize: "clamp(2rem, 3.5vw, 64px)", lineHeight: "1.08em", letterSpacing: "-0.002em" }}
            >
              Three disciplines. One purpose.
            </h2>
            <p className="text-[#4A4A4A] max-w-2xl mb-16 text-base leading-relaxed" style={sans}>
              Every MorningEdge engagement addresses a specific constraint standing between where your organization is and where it needs to be.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5E5E5]">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1}>
                <Link href={s.href} className="group bg-[#F5F5F5] flex flex-col h-full">
                  {/* Photo thumbnail */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-[#0A0A0A]/40 group-hover:bg-[#0A0A0A]/55 transition-colors duration-300" />
                    <div className="absolute bottom-4 left-4 text-[#1A1AB5] w-9 h-9 flex items-center justify-center bg-white/90">
                      {s.icon}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-8 flex flex-col gap-4 flex-1">
                    <h3 className="text-[#0A0A0A] text-xl font-semibold" style={sans}>{s.title}</h3>
                    <p className="text-[#4A4A4A] text-sm leading-relaxed flex-1" style={sans}>{s.description}</p>
                    <span
                      className="text-[#1A1AB5] text-xs uppercase tracking-widest group-hover:underline mt-2"
                      style={sans}
                    >
                      Learn More →
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR APPROACH ── */}
      <section className="relative py-24 px-8 lg:px-16 overflow-hidden">
        <ParallaxBg
          src="/pictures/approach-bg.jpg"
          overlay="bg-[#0A0A0A]/85"
          position="center center"
          strength={20}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto">
          <FadeIn>
            <p className="text-[#22D3EE] text-xs uppercase tracking-[0.25em] mb-6" style={sans}>The MorningEdge Approach</p>
            <h2
              className="text-[#FFFFFF] mb-16 font-light"
              style={{ ...sans, fontSize: "clamp(2rem, 3.5vw, 64px)", lineHeight: "1.08em", letterSpacing: "-0.002em" }}
            >
              Four phases. Zero guesswork.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {approach.map((phase, i) => (
              <FadeIn key={phase.number} delay={i * 0.1}>
                <div className="bg-white/5 border border-white/10 p-10 flex flex-col gap-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[#22D3EE] w-9 h-9 flex items-center justify-center bg-[#22D3EE]/10">
                      {phase.icon}
                    </div>
                    <span className="text-5xl font-light text-white/10" style={sans}>{phase.number}</span>
                  </div>
                  <h3 className="text-white text-xl font-semibold" style={sans}>{phase.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed" style={sans}>{phase.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BY THE NUMBERS ── */}
      <section className="bg-[#1A1AB5] py-20 px-8 lg:px-16">
        <div className="max-w-[1920px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08}>
                <div className="border-l border-white/30 pl-8">
                  <p
                    className="text-white mb-1 font-light"
                    style={{ ...sans, fontSize: "clamp(2.5rem, 5vw, 72px)", lineHeight: "1em" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[#DDE0FF] text-xs uppercase tracking-widest" style={sans}>{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD CONSULTANT ── */}
      <section className="bg-[#F5F5F5] py-24 px-8 lg:px-16">
        <div className="max-w-[1920px] mx-auto">
          <FadeIn>
            <p className="text-[#1A1AB5] text-xs uppercase tracking-[0.25em] mb-16" style={sans}>Meet the Lead Consultant</p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative h-[520px] overflow-hidden">
                <Image
                  src="/pictures/IMG_327.jpeg"
                  alt="Olamilekan E. Wealth — Lead Consultant, MorningEdge Systems"
                  fill
                  className="object-cover object-[center_15%]"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] px-8 py-5">
                  <p className="text-white text-xl font-semibold" style={sans}>Olamilekan E. Wealth</p>
                  <p className="text-[#22D3EE] text-[10px] uppercase tracking-widest mt-1" style={sans}>
                    Lead Consultant, MorningEdge Systems
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div className="flex flex-col gap-6">
                <h2
                  className="text-[#0A0A0A] font-light leading-tight"
                  style={{ ...sans, fontSize: "clamp(1.8rem, 3vw, 48px)", lineHeight: "1.08em", letterSpacing: "-0.002em" }}
                >
                  Every MorningEdge engagement is led by someone who has done the work.
                </h2>
                <p className="text-[#4A4A4A] leading-relaxed" style={sans}>
                  Olamilekan E. Wealth founded MorningEdge to bring operational discipline and AI-enabled intelligence to organizations serious about scaling without chaos. With a background spanning business operations, project leadership, and organizational strategy, he leads every engagement personally.
                </p>
                <p className="text-[#4A4A4A] leading-relaxed" style={sans}>
                  His work centers on one question: is this business built to execute? As a consultant, author, and speaker, he brings the clarity of direct experience to every engagement.
                </p>
                <div className="flex flex-col gap-3 pt-4 border-t border-[#E5E5E5]">
                  {["Business Operations Executive", "AI Systems Consultant", "Author and Public Speaker"].map((role) => (
                    <div key={role} className="flex items-center gap-4 text-sm">
                      <span className="w-8 h-px bg-[#1A1AB5] flex-shrink-0" />
                      <span className="text-[#4A4A4A]" style={sans}>{role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="relative py-24 px-8 lg:px-16 overflow-hidden">
        <ParallaxBg
          src="/pictures/cta-bg.jpg"
          overlay="bg-[#0A0A0A]/72"
          position="center 20%"
          strength={25}
        />
        <div className="relative z-10 max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <p className="text-[#22D3EE] text-xs uppercase tracking-[0.25em] mb-6" style={sans}>Ready to Begin</p>
            <h2
              className="text-[#FFFFFF] font-light"
              style={{ ...sans, fontSize: "clamp(2rem, 3.5vw, 64px)", lineHeight: "1.08em", letterSpacing: "-0.002em" }}
            >
              The right engagement starts with the right conversation.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-4 lg:items-end">
              <p className="text-gray-300 text-sm leading-relaxed lg:text-right" style={sans}>
                Tell us about your organization. We will tell you whether and how MorningEdge can help.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-[#1A1AB5] text-white px-10 py-5 text-xs font-medium uppercase tracking-widest hover:bg-[#1515A3] transition-colors"
                style={sans}
              >
                Start the Conversation
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
