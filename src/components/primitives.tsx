import Link from "next/link";
import { type ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#1A1AB5] ${className}`}>
      <span className="h-px w-6 bg-[#B45309]" aria-hidden="true" />
      {children}
    </p>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-6 py-3.5 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-[#1A1AB5] text-white shadow-[0_6px_18px_-6px_rgba(26,26,181,0.5)] hover:bg-[#14149A] hover:shadow-[0_10px_26px_-8px_rgba(26,26,181,0.6)]"
      : "border border-[#17150F]/20 bg-white text-[#17150F] shadow-soft hover:border-[#17150F]/40";
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </Link>
  );
}
