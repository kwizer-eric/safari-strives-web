"use client";

import { Container } from "@safari/ui";
import { ApplyButton } from "@/components/ui/ApplyButton";
import type { VenturesPagePayload } from "@/types/content";

type VenturesMissionProps = {
  mission: VenturesPagePayload["mission"];
};

export function VenturesMission({ mission }: VenturesMissionProps) {
  return (
    <section
      aria-labelledby="ventures-mission-heading"
      className="relative z-10 bg-accent py-20 md:py-32"
    >
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
            {mission.eyebrow}
          </p>

          <h2
            id="ventures-mission-heading"
            className="mb-4 text-balance text-3xl font-bold leading-[1.2] tracking-tight text-white md:text-4xl lg:text-[2.5rem]"
          >
            Ventures that escape the commodity trap.
          </h2>

          <p className="mb-10 max-w-2xl text-balance text-base leading-relaxed text-white/85 md:text-lg">
            {mission.body}
          </p>

          <ApplyButton
            variant="primary"
            className="bg-white px-8 py-3.5 text-base text-accent-hover hover:bg-cream hover:text-accent"
          >
            {mission.ctaLabel}
          </ApplyButton>
        </div>
      </Container>
    </section>
  );
}
