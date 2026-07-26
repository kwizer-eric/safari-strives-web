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
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative z-20 bg-background pt-16 pb-8 md:pt-24 md:pb-10"
    >
      <Container>
        <div className="rounded-[var(--radius-card)] bg-accent py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="final-cta-heading"
              className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
            >
              {finalCta.line1}
            </h2>
            <p className="mb-10 text-lg text-white/80 md:text-xl">
              {finalCta.line2}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
