import Link from "next/link";
import { type ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
}) {
  const base =
    "pressable inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap";
  const sizing = size === "lg" ? "px-7 py-4 text-[15px]" : "px-6 py-3.5 text-sm";
  const styles = {
    primary:
      "bg-(--navy) text-white shadow-[0_8px_22px_-8px_rgba(26,26,181,0.55)] hover:bg-(--navy-dark) hover:shadow-[0_12px_30px_-10px_rgba(26,26,181,0.65)]",
    secondary:
      "border border-(--ink)/15 bg-(--surface) text-(--ink) shadow-soft hover:border-(--ink)/35",
    ghost: "text-(--navy-text) hover:bg-(--navy-text)/6",
  }[variant];
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return (
    <Link href={href} className={`${base} ${sizing} ${styles} ${className}`} {...props}>
      {children}
    </Link>
  );
}

/** Circular icon chip used to illustrate a point. */
export function IconChip({
  children,
  tone = "navy",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  tone?: "navy" | "amber" | "ink";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const tones = {
    navy: "bg-(--navy-text)/8 text-(--navy-text)",
    amber: "bg-(--accent)/10 text-(--accent)",
    ink: "bg-[#17150F] text-white",
  }[tone];
  const sizes = { sm: "h-9 w-9", md: "h-11 w-11", lg: "h-14 w-14" }[size];
  return (
    <span className={`inline-flex flex-shrink-0 items-center justify-center rounded-full ${tones} ${sizes} ${className}`}>
      {children}
    </span>
  );
}
