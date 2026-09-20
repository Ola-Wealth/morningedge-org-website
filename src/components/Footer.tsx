import Link from "next/link";
import { site, nav } from "@/lib/site";

const pillarLinks = [
  { href: "/ai-edge", label: "The AI Edge" },
  { href: "/operations-core/erp", label: "Enterprise Resource Planning" },
  { href: "/operations-core/ai-integration", label: "AI Integration" },
  { href: "/adoption-standard", label: "The Adoption Standard" },
];

const firmLinks = [
  { href: "/approach", label: "Approach" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="texture-dots [--dot:rgba(255,255,255,0.06)] border-t border-(--line) bg-[#17150F] text-[#E9E4D8]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2 flex flex-col gap-5">
            <span className="flex flex-col leading-none" style={{ fontFamily: "var(--font-serif)" }}>
              <span className="text-xl font-medium tracking-tight text-white">MorningEdge</span>
              <span className="mt-1 text-xs font-medium uppercase tracking-[0.22em] text-[#B4AE9E]">Systems</span>
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-[#B4AE9E]">
              We build business operations. We make the people produce more, and we put the company on one system. Two products. One outcome.
            </p>
            <div className="flex flex-col gap-1.5 text-sm">
              <a href={`mailto:${site.email}`} className="text-[#B4AE9E] transition-colors hover:text-white">
                {site.email}
              </a>
              <a href={site.phoneHref} className="text-[#B4AE9E] transition-colors hover:text-white">
                {site.phone}
              </a>
              <span className="text-[#B4AE9E]">{site.location}</span>
            </div>
          </div>

          <nav className="flex flex-col gap-3" aria-label="Services">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A8578]">What we do</p>
            {pillarLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-[#B4AE9E] transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>

          <nav className="flex flex-col gap-3" aria-label="Firm">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A8578]">Firm</p>
            {firmLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-[#B4AE9E] transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#B4AE9E] transition-colors hover:text-white"
            >
              LinkedIn
            </a>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-[#8A8578] md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.legalName} ({site.rc}). All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/legal/privacy" className="transition-colors hover:text-white">Privacy</Link>
            <Link href="/legal/terms" className="transition-colors hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
