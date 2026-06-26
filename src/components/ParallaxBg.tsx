"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

interface ParallaxBgProps {
  src: string;
  /** Tailwind class for the dark overlay, e.g. "bg-[#0A0A0A]/80" */
  overlay: string;
  /** How far the image travels as a % of its own height — default 20 */
  strength?: number;
  /** object-position value — default "center 20%" */
  position?: string;
}

export default function ParallaxBg({
  src,
  overlay,
  strength = 20,
  position = "center 20%",
}: ParallaxBgProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Image travels `strength`% up as section scrolls from bottom → top of viewport
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${strength / 2}%`, `-${strength / 2}%`]
  );

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 w-full"
        style={{ y, height: `${100 + strength}%`, top: `-${strength / 2}%` }}
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          style={{ objectPosition: position }}
          sizes="100vw"
        />
      </motion.div>
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
