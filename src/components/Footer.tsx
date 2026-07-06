import Image from "next/image";
import Link from "next/link";
import ParallaxBg from "@/components/ParallaxBg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative text-[#FFFFFF] overflow-hidden">
      {/* Continuous parallax image from CTA strip */}
      <ParallaxBg
        src="/pictures/cta-bg.jpg"
        overlay="bg-[#0A0A0A]/93"
        position="center 60%"
        strength={15}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="MorningEdge" width={32} height={32} className="h-8 w-8 object-contain" />
            <div className="flex flex-col leading-none">
              <span className="text-[#FFFFFF] font-black text-sm tracking-wide" style={{ fontFamily: "var(--font-cormorant)" }}>MorningEdge</span>
              <span className="text-[#22D3EE] text-[9px] font-medium uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-dm-sans)" }}>Systems</span>
            </div>
          </div>
          <p className="text-[#9CA3AF] text-sm max-w-xs leading-relaxed" style={{ fontFamily: "var(--font-dm-sans)" }}>
            A business operations and AI systems consultancy. We build the structures, systems, and strategies that allow organizations to scale with intention.
          </p>
          <div className="flex flex-col gap-1.5 text-sm" style={{ fontFamily: "var(--font-dm-sans)" }}>
            <a href="mailto:hello@morningedgesystems.com" className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors">hello@morningedgesystems.com</a>
            <a href="tel:+2348100526153" className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors">+234 810 052 6153</a>
            <span className="text-[#9CA3AF]">Lagos, Nigeria</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#22D3EE] font-medium mb-2" style={{ fontFamily: "var(--font-dm-sans)" }}>Navigation</p>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#22D3EE] font-medium mb-2" style={{ fontFamily: "var(--font-dm-sans)" }}>Connect</p>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/company/morningedge" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter / X" className="text-[#9CA3AF] hover:text-[#FFFFFF] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <div className="mt-4">
            <Link
              href="/contact"
              className="inline-block border border-[#FFFFFF]/30 text-[#FFFFFF] rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-[#0A0A0A] transition-colors cursor-pointer"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Start an Engagement
            </Link>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 py-6">
        <p className="text-center text-xs text-[#9CA3AF]" style={{ fontFamily: "var(--font-dm-sans)" }}>
          &copy; 2026 MorningEdge Systems. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
