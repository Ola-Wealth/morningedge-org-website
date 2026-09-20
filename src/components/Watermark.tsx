import Image from "next/image";

/**
 * The brand mark, very faint, sitting behind a section's content. Purely
 * decorative: hidden from assistive tech and never intercepts the pointer.
 */
export default function Watermark({
  className = "",
  size = 760,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={size}
        height={size}
        className="h-full w-full opacity-[0.045]"
        priority={false}
      />
    </div>
  );
}
