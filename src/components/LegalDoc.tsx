import { type ReactNode } from "react";
import Reveal from "@/components/Reveal";
import { Container } from "@/components/primitives";

export function LegalDoc({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-[#E4DED0]">
        <Container className="py-20 lg:py-24">
          <Reveal className="max-w-4xl">
            <h1 className="mt-5 text-balance text-4xl leading-[1.1] sm:text-5xl">{title}</h1>
            <p className="mt-6 text-sm text-[#8A8578]">Last updated {updated}</p>
          </Reveal>
        </Container>
      </section>

      <section>
        <Container className="py-16 lg:py-20">
          <Reveal>
            <div className="legal measure">{children}</div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
