"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";
import ThemeToggle from "@/components/ThemeToggle";

/**
 * One menu button rather than a row of links.
 *
 * Six items, a theme toggle and the call to action never fitted across a
 * laptop header without colliding with the wordmark, so the links live behind
 * a button at every width. What stays on the bar is what a visitor acts on:
 * the mark, the theme, and booking.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  // Close on navigation, so the panel never survives a page change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-50 border-b border-(--line) bg-(--ground)/90 backdrop-blur">
      <div className="relative z-50 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="MorningEdge Systems home">
          <Image src="/logo-mark.png" alt="" width={36} height={36} className="theme-invert h-8 w-8 object-contain" />
          {/* Two-line wordmark: MorningEdge over Systems */}
          <span className="flex flex-col leading-none" style={{ fontFamily: "var(--font-serif)" }}>
            <span className="text-[17px] font-medium tracking-tight text-(--ink)">MorningEdge</span>
            <span className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-(--ink-soft)">Systems</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link
            href="/contact"
            className="pressable hidden whitespace-nowrap rounded-lg bg-(--navy) px-4 py-2.5 text-sm font-medium text-white shadow-[0_8px_22px_-8px_rgba(26,26,181,0.55)] hover:bg-(--navy-dark) sm:inline-flex"
          >
            Book a diagnostic
          </Link>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            className="pressable inline-flex items-center gap-2 rounded-lg border border-(--line) bg-(--surface) px-3 py-2.5 text-sm font-medium text-(--ink) shadow-soft hover:border-(--ink)/35"
          >
            {open ? <X size={17} aria-hidden="true" /> : <Menu size={17} aria-hidden="true" />}
            <span className="hidden sm:inline">Menu</span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="site-menu"
          /* Absolute so the header keeps the height of its bar. If the panel
             grew the header, the header itself would sit over the page and
             swallow the clicks meant to close it. */
          className="pointer-events-none absolute inset-x-0 top-full z-50 border-b border-(--line) bg-(--ground)"
        >
          {/* The bar spans the width, but only the column of links takes the
              pointer, so a click on the empty side falls through and closes. */}
          <nav
            className="pointer-events-none mx-auto flex w-full max-w-6xl justify-end px-6 py-4 lg:px-8"
            aria-label="Primary"
          >
            <div className="pointer-events-auto flex w-full flex-col sm:w-80">
                {nav.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`border-b border-(--line) py-3.5 text-base transition-colors sm:text-[15px] ${
                      isActive(link.href) ? "text-(--navy-text)" : "text-(--ink) hover:text-(--navy-text)"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="pressable mt-4 rounded-lg bg-(--navy) px-5 py-3.5 text-center text-sm font-medium text-white shadow-[0_8px_22px_-8px_rgba(26,26,181,0.55)] sm:hidden"
                >
                  Book a diagnostic
                </Link>
          </div>
        </nav>
      </div>
      )}
    </header>

    {/* Outside the header on purpose: the header carries backdrop-blur, which
        makes it the containing block for fixed children and would shrink this
        to the height of the bar. */}
    {open && (
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-40 cursor-default bg-transparent"
      />
    )}
    </>
  );
}
