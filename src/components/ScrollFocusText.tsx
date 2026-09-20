"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A large statement whose words brighten from muted to ink as the block
 * scrolls through the viewport. Renders fully lit without JavaScript, so the
 * text is always readable, and stays lit for reduced-motion users.
 */
export default function ScrollFocusText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const [lit, setLit] = useState(words.length); // default: all lit (JS-off safe)

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLit(words.length);
      return;
    }

    let raf = 0;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the block's top sits at 82% of the viewport (just entering),
      // 1 when it reaches 25% (settled near the top).
      const start = vh * 0.82;
      const end = vh * 0.25;
      const p = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
      setLit(Math.round(p * words.length));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [words.length]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            color: i < lit ? "var(--ink)" : "var(--ink-faint)",
            transition: "color 0.35s ease",
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
