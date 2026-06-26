"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#F5F5F5] border-b border-[#E5E5E1]">
      <div className="max-w-[1920px] mx-auto px-8 lg:px-12 flex items-center justify-between py-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="MorningEdge" width={32} height={32} className="h-8 w-8 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="text-[#0A0A0A] font-black text-sm tracking-wide" style={{ fontFamily: "var(--font-cormorant)" }}>MorningEdge</span>
            <span className="text-[#1A1AB5] text-[9px] font-medium uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-dm-sans)" }}>Systems</span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm transition-colors tracking-wide ${
                    pathname === link.href
                      ? "text-[#1A1AB5]"
                      : "text-[#4A4A4A] hover:text-[#0A0A0A]"
                  }`}
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="bg-[#0A0A0A] text-[#E0E0CC] px-5 py-2.5 text-xs font-medium uppercase tracking-widest hover:bg-[#101D29] transition-colors"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Engage Us
          </Link>
        </div>

        {/* Mobile */}
        <button
          className="md:hidden text-[#0A0A0A] p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-[#F5F5F5] z-40 flex flex-col items-center justify-center gap-10 border-t border-[#E5E5E1]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-3xl font-light transition-colors ${
                pathname === link.href ? "text-[#1A1AB5]" : "text-[#0A0A0A] hover:text-[#1A1AB5]"
              }`}
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="bg-[#0A0A0A] text-[#E0E0CC] px-8 py-4 text-xs font-medium uppercase tracking-widest"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Engage Us
          </Link>
        </div>
      )}
    </nav>
  );
}
