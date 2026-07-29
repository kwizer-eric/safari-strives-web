"use client";

import { Button, Container } from "@safari/ui";
import { ApplyButton } from "@/components/ui/ApplyButton";

type FinalCTAProps = {
  finalCta: {
    line1: string;
    line2: string;
  };
  donateHref: string;
};

export function FinalCTA({ finalCta, donateHref }: FinalCTAProps) {
  if (!finalCta.line1.trim() && !finalCta.line2.trim()) return null;

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative z-20 bg-background pt-10 pb-6 md:pt-24 md:pb-10"
    >
      <Container>
        <div className="rounded-[var(--radius-card)] bg-accent px-4 py-10 md:px-0 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="final-cta-heading"
              className="mb-3 text-xl font-bold leading-tight text-white sm:text-2xl md:mb-4 md:text-4xl lg:text-5xl"
            >
              {finalCta.line1}
            </h2>
            <p className="mb-6 text-sm text-white/80 sm:text-base md:mb-10 md:text-xl">
              {finalCta.line2}
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              <ApplyButton
                variant="secondary"
                className="border-white/40 text-white hover:bg-white/10"
              >
                Apply Now
              </ApplyButton>
              <Button
                href={donateHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="bg-white text-accent hover:bg-cream hover:text-accent-hover"
              >
                Donate
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
