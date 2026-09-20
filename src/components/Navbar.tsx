"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-[#E4DED0] bg-[#FAF7F1]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="MorningEdge home">
          <Image src="/logo.png" alt="" width={30} height={30} className="h-7 w-7 object-contain" />
          <span className="text-lg font-medium tracking-tight text-[#17150F]" style={{ fontFamily: "var(--font-serif)" }}>
            MorningEdge
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                isActive(link.href) ? "text-[#1A1AB5]" : "text-[#4A463C] hover:text-[#17150F]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="pressable rounded-lg bg-[#1A1AB5] px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_22px_-8px_rgba(26,26,181,0.55)] hover:bg-[#14149A]"
          >
            Book a diagnostic
          </Link>
        </nav>

        <button
          className="p-1 text-[#17150F] lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#E4DED0] bg-[#FAF7F1] lg:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4" aria-label="Mobile">
            {nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`border-b border-[#E4DED0] py-3.5 text-base ${
                  isActive(link.href) ? "text-[#1A1AB5]" : "text-[#17150F]"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="pressable mt-4 rounded-lg bg-[#1A1AB5] px-5 py-3.5 text-center text-sm font-medium text-white shadow-[0_8px_22px_-8px_rgba(26,26,181,0.55)]"
            >
              Book a diagnostic
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
