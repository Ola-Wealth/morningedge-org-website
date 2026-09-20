import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container, ButtonLink } from "@/components/primitives";
import Watermark from "@/components/Watermark";

export default function PageHero({
  title,
  lead,
  image,
  alt,
  imagePosition = "object-center",
  primary = { href: "/contact", label: "Book a diagnostic" },
  secondary,
}: {
  title: string;
  lead: string;
  image: string;
  alt: string;
  imagePosition?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden border-b border-[#E4DED0]">
      <Watermark className="-right-40 -top-32 lg:-right-24 lg:-top-20" size={720} />
      <Container className="relative pt-16 pb-16 lg:pt-24 lg:pb-20">
        {/* Row 1: headline, lead, CTAs, centered and spanning the width */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-[2.5rem] leading-[1.05] tracking-[-0.025em] sm:text-5xl lg:text-[4rem]">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#4A463C] sm:text-xl">{lead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primary.href} size="lg">
              {primary.label} <ArrowRight size={17} />
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </div>

        {/* Row 2: the photograph, full width */}
        <div className="photo-frame mt-14 aspect-[16/10] shadow-soft-lg sm:aspect-[21/9] lg:mt-16">
          <Image
            src={image}
            alt={alt}
            fill
            priority
            className={`object-cover ${imagePosition}`}
            sizes="(max-width: 1280px) 100vw, 1152px"
          />
        </div>
      </Container>
    </section>
  );
}
