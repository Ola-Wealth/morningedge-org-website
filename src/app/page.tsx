import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PillBadge from "@/components/PillBadge";
import CountUp from "@/components/CountUp";
import { Settings2, BrainCircuit, GraduationCap, Search, Compass, Zap, RefreshCw, ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "MorningEdge Systems | We Build Businesses That Execute.",
  description:
    "MorningEdge Systems is a business operations and AI consultancy. We build the structures, systems, and strategies that allow organizations to scale with intention. Based in Lagos, Nigeria.",
  alternates: { canonical: "https://www.morningedgesystems.com" },
  openGraph: {
    title: "MorningEdge Systems | We Build Businesses That Execute.",
    description:
      "Operations architecture, AI systems integration, and executive development for founders and executives serious about building businesses that execute.",
    url: "https://www.morningedgesystems.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "MorningEdge Systems",
  url: "https://www.morningedgesystems.com",
  logo: "https://www.morningedgesystems.com/logo.png",
  description:
    "Business operations and AI systems consultancy helping founders, executives, and organizations build structures that scale.",
  email: "hello@morningedgesystems.com",
  telephone: "+2348100526153",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  founder: {
    "@type": "Person",
    name: "Olamilekan E. Wealth",
    jobTitle: "Lead Consultant",
    url: "https://www.morningedgesystems.com",
  },
  serviceType: [
    "Operations Architecture",
    "AI Systems Integration",
    "Executive Development",
  ],
  areaServed: {
    "@type": "Place",
    name: "Global",
  },
  sameAs: ["https://linkedin.com/company/morningedge"],
};

const services = [
  {
    icon: <Settings2 size={20} />,
    title: "Operations Architecture",
    image: "/pictures/service-operations.jpg",
    href: "/services#operations-design",
    description:
      "We map, restructure, and rebuild the internal systems of your organization. Processes are defined. Accountability is built in. Execution becomes repeatable.",
  },
  {
    icon: <BrainCircuit size={20} />,
    title: "AI Systems Integration",
    image: "/pictures/service-ai.jpg",
    href: "/services#ai-systems",
    description:
      "We identify the real bottlenecks in your workflows and deploy AI-enabled solutions that reduce friction, improve decision quality, and compound over time.",
  },
  {
    icon: <GraduationCap size={20} />,
    title: "Executive Development",
    image: "/pictures/IMG_342_1.jpeg",
    href: "/services#executive-development",
    description:
      "Our programs equip leadership teams with the frameworks, disciplines, and strategic tools to lead organizations that execute with consistency and intention.",
  },
];

const approach = [
  {
    icon: <Search size={18} />,
    number: "01",
    title: "Diagnose",
    description: "We begin with what is actually happening inside your business. Not assumptions. Not surface-level symptoms. Diagnosis.",
  },
  {
    icon: <Compass size={18} />,
    number: "02",
    title: "Design",
    description: "We architect the systems, structures, and workflows your specific situation requires. No templates. No off-the-shelf solutions.",
  },
  {
    icon: <Zap size={18} />,
    number: "03",
    title: "Deploy",
    description: "We implement alongside your team, not in isolation from it. Adoption is part of the design.",
  },
  {
    icon: <RefreshCw size={18} />,
    number: "04",
    title: "Sustain",
    description: "Every engagement is built for durability. The goal is a business that runs without depending on our continued involvement.",
  },
];

const stats = [
  { end: 50, suffix: "+", label: "Engagements Delivered" },
  { end: 12, suffix: "+", label: "Industries Served" },
  { end: 3, suffix: "", label: "Core Disciplines" },
  { end: 100, suffix: "%", label: "Outcome-Focused" },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="bg-[#FFFFFF] pt-16 pb-8 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col items-start gap-6 mb-12">
              <PillBadge>Business Operations &amp; AI Consultancy</PillBadge>
              <h1
                className="text-[#0A0A0A] font-black leading-[1.02] tracking-tight"
                style={{ fontSize: "clamp(2.6rem, 6vw, 84px)", letterSpacing: "-0.03em" }}
              >
                We Build Businesses<br />
                <span className="text-[#1A1AB5]">That Execute.</span>
              </h1>
              <div className="flex flex-col md:flex-row md:items-end gap-8 w-full">
                <p className="text-[#4A4A4A] text-lg leading-relaxed max-w-xl">
                  MorningEdge is a business operations and AI systems consultancy. We design the systems and structures that turn ambition into consistent execution.
                </p>
                <div className="flex flex-wrap gap-3 md:ml-auto">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-3 bg-[#1A1AB5] text-white rounded-full pl-7 pr-2 py-2 text-sm font-semibold hover:bg-[#1515A3] transition-colors cursor-pointer"
                  >
                    Start an Engagement
                    <span className="w-9 h-9 rounded-full bg-white text-[#1A1AB5] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                      <ArrowRight size={16} />
                    </span>
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 border border-[#D5D7DB] text-[#0A0A0A] rounded-full px-7 py-3.5 text-sm font-semibold hover:border-[#0A0A0A] transition-colors cursor-pointer"
                  >
                    Our Services
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Hero image card with floating chips */}
          <FadeIn delay={0.15}>
            <div className="relative rounded-[28px] overflow-hidden h-[420px] lg:h-[540px]">
              <Image
                src="/pictures/hero-bg.jpeg"
                alt="MorningEdge Systems consultants working with a leadership team"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-[#0A0A0A]/10 to-transparent" />

              {/* Floating stat chips */}
              <div className="absolute top-6 left-6 hidden sm:flex flex-col gap-3">
                <div className="bg-white/95 backdrop-blur rounded-2xl px-5 py-3.5 shadow-sm">
                  <p className="text-[#0A0A0A] text-2xl font-black leading-none">50+</p>
                  <p className="text-[#6B6B6B] text-[11px] font-medium uppercase tracking-wide mt-1">Engagements Delivered</p>
                </div>
                <div className="bg-white/95 backdrop-blur rounded-2xl px-5 py-3.5 shadow-sm">
                  <p className="text-[#0A0A0A] text-2xl font-black leading-none">12+</p>
                  <p className="text-[#6B6B6B] text-[11px] font-medium uppercase tracking-wide mt-1">Industries Served</p>
                </div>
              </div>

              {/* Bottom overlay copy */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <p className="text-white text-xl lg:text-2xl font-bold max-w-md leading-snug">
                  Execution is not an accident. It is architecture.
                </p>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 bg-white/15 backdrop-blur border border-white/25 text-white rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-[#0A0A0A] transition-colors self-start sm:self-auto cursor-pointer"
                >
                  About the Firm
                  <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── INTRO + MIXED CARD GRID ── */}
      <section className="bg-[#FFFFFF] py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
              <PillBadge>The Firm</PillBadge>
              <p className="text-[#0A0A0A] text-xl lg:text-2xl leading-relaxed font-medium">
                At MorningEdge, we work with founders, executives, and growing organizations serious about scaling without chaos. Since 2022, one question has driven every engagement: is this business built to execute?
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Dark card */}
            <FadeIn delay={0.05}>
              <div className="bg-[#0A0A0A] rounded-[24px] p-8 flex flex-col justify-between h-[340px]">
                <div className="w-10 h-10 rounded-full bg-[#22D3EE]/15 text-[#22D3EE] flex items-center justify-center">
                  <Settings2 size={18} />
                </div>
                <div>
                  <p className="text-white text-xl font-bold leading-snug mb-3">
                    Structured systems, defined accountability, repeatable execution.
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    We move organizations from fragmented effort to structured, scalable operations.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Photo card */}
            <FadeIn delay={0.1}>
              <Link href="/about" className="group relative rounded-[24px] overflow-hidden h-[340px] block cursor-pointer">
                <Image
                  src="/pictures/IMG_324.jpeg"
                  alt="MorningEdge lead consultant facilitating a session"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/75 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <span className="bg-white/15 backdrop-blur border border-white/25 text-white rounded-full px-4 py-2 text-xs font-semibold">
                    Led by experience
                  </span>
                  <span className="w-9 h-9 rounded-full bg-white text-[#0A0A0A] flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            </FadeIn>

            {/* Stat card */}
            <FadeIn delay={0.15}>
              <div className="bg-[#F5F6F8] rounded-[24px] p-8 flex flex-col justify-between h-[340px]">
                <div>
                  <p className="text-[#0A0A0A] font-black leading-none" style={{ fontSize: "clamp(3rem, 5vw, 72px)" }}>3</p>
                  <p className="text-[#1A1AB5] text-sm font-semibold mt-2">Core Disciplines</p>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Operations Architecture", w: "w-[92%]" },
                    { label: "AI Systems Integration", w: "w-[78%]" },
                    { label: "Executive Development", w: "w-[64%]" },
                  ].map((d) => (
                    <div key={d.label}>
                      <p className="text-[#4A4A4A] text-xs font-medium mb-1.5">{d.label}</p>
                      <div className="h-1.5 rounded-full bg-[#E5E7EB]">
                        <div className={`h-full rounded-full bg-[#1A1AB5] ${d.w}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <section className="bg-[#FFFFFF] py-16 px-4 sm:px-6 lg:px-10 border-y border-[#EEF0F2]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <p className="text-center text-[#6B6B6B] text-sm mb-12">A few facts about MorningEdge, in numbers</p>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.06}>
                <div className="text-center">
                  <CountUp
                    end={stat.end}
                    suffix={stat.suffix}
                    className="block text-[#0A0A0A] font-black leading-none"
                    style={{ fontSize: "clamp(2.4rem, 4.5vw, 64px)", letterSpacing: "-0.02em" }}
                  />
                  <p className="text-[#6B6B6B] text-xs font-medium uppercase tracking-widest mt-3">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-[#F5F6F8] py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div className="flex flex-col items-start gap-5">
                <PillBadge>What We Do</PillBadge>
                <h2 className="text-[#0A0A0A] font-black tracking-tight" style={{ fontSize: "clamp(1.9rem, 3.5vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}>
                  Three disciplines.<br />One purpose.
                </h2>
              </div>
              <p className="text-[#4A4A4A] text-base leading-relaxed max-w-md">
                Every MorningEdge engagement addresses a specific constraint standing between where your organization is and where it needs to be.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.08}>
                <Link href={s.href} className="group bg-white rounded-[24px] overflow-hidden flex flex-col h-full cursor-pointer border border-[#EEF0F2] hover:border-[#D5D7DB] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(10,10,10,0.18)]">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white text-[#1A1AB5] flex items-center justify-center shadow-sm">
                      {s.icon}
                    </div>
                  </div>
                  <div className="p-7 flex flex-col gap-3 flex-1">
                    <h3 className="text-[#0A0A0A] text-lg font-bold">{s.title}</h3>
                    <p className="text-[#4A4A4A] text-sm leading-relaxed flex-1">{s.description}</p>
                    <span className="inline-flex items-center gap-2 text-[#1A1AB5] text-sm font-semibold mt-2">
                      Learn more
                      <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className="bg-[#FFFFFF] py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col items-start gap-5 mb-12">
              <PillBadge>The MorningEdge Approach</PillBadge>
              <h2 className="text-[#0A0A0A] font-black tracking-tight" style={{ fontSize: "clamp(1.9rem, 3.5vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}>
                Four phases. Zero guesswork.
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {approach.map((phase, i) => (
              <FadeIn key={phase.number} delay={i * 0.08}>
                <div className="bg-[#F5F6F8] rounded-[24px] p-7 flex flex-col gap-4 h-full transition-all duration-300 hover:bg-[#EFF1F4] hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-full bg-white text-[#1A1AB5] flex items-center justify-center shadow-sm">
                      {phase.icon}
                    </div>
                    <span className="text-[#D5D7DB] text-4xl font-black">{phase.number}</span>
                  </div>
                  <h3 className="text-[#0A0A0A] text-lg font-bold">{phase.title}</h3>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">{phase.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD CONSULTANT ── */}
      <section className="bg-[#F5F6F8] py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <FadeIn direction="left">
              <div className="relative rounded-[28px] overflow-hidden h-[480px] lg:h-[560px]">
                <Image
                  src="/pictures/IMG_327.jpeg"
                  alt="Olamilekan E. Wealth — Lead Consultant, MorningEdge Systems"
                  fill
                  className="object-cover object-[center_15%]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/75 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-xl font-bold">Olamilekan E. Wealth</p>
                  <p className="text-[#22D3EE] text-[11px] font-semibold uppercase tracking-widest mt-1">
                    Lead Consultant, MorningEdge Systems
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div className="flex flex-col items-start gap-6">
                <PillBadge>Meet the Lead Consultant</PillBadge>
                <h2 className="text-[#0A0A0A] font-black tracking-tight leading-tight" style={{ fontSize: "clamp(1.7rem, 2.8vw, 42px)", letterSpacing: "-0.02em", lineHeight: 1.12 }}>
                  Every MorningEdge engagement is led by someone who has done the work.
                </h2>
                <p className="text-[#4A4A4A] leading-relaxed">
                  Olamilekan E. Wealth founded MorningEdge to bring operational discipline and AI-enabled intelligence to organizations serious about scaling without chaos. With a background spanning business operations, project leadership, and organizational strategy, he leads every engagement personally.
                </p>
                <p className="text-[#4A4A4A] leading-relaxed">
                  His work centers on one question: is this business built to execute? As a consultant, author, and speaker, he brings the clarity of direct experience to every engagement.
                </p>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {["Business Operations Executive", "AI Systems Consultant", "Author and Public Speaker"].map((role) => (
                    <span key={role} className="bg-white border border-[#E5E7EB] text-[#4A4A4A] rounded-full px-4 py-2 text-xs font-medium">
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── CTA CARD ── */}
      <section className="bg-[#F5F6F8] pb-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="relative bg-[#0A0A0A] rounded-[32px] overflow-hidden px-8 py-16 lg:px-16 lg:py-20">
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#1A1AB5]/30 blur-3xl" />
              <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-[#22D3EE]/10 blur-3xl" />
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="flex flex-col items-start gap-5">
                  <PillBadge dark>Ready to Begin</PillBadge>
                  <h2 className="text-white font-black tracking-tight" style={{ fontSize: "clamp(1.9rem, 3.5vw, 52px)", letterSpacing: "-0.02em", lineHeight: 1.08 }}>
                    The right engagement starts with the right conversation.
                  </h2>
                </div>
                <div className="flex flex-col lg:items-end gap-5">
                  <p className="text-gray-400 text-sm leading-relaxed lg:text-right max-w-sm">
                    Tell us about your organization. We will tell you whether and how MorningEdge can help.
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
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
