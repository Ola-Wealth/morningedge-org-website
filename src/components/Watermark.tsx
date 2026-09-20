/**
 * The brand mark, very faint, sitting behind a section's content. Purely
 * decorative: hidden from assistive tech and never intercepts the pointer.
 *
 * Drawn as a CSS mask over the ink colour rather than an <img>, so it follows
 * the theme automatically and is never picked up as the page's LCP element.
 */
export default function Watermark({
  className = "",
  size = 760,
}: {
  className?: string;
  size?: number;
}) {
  const mask = "url(/logo-mark.png) center / contain no-repeat";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 select-none ${className}`}
      style={{
        width: size,
        height: size,
        background: "var(--ink)",
        opacity: 0.045,
        WebkitMask: mask,
        mask,
      }}
    />
  );
}
