"use client";

import { Button, Container } from "@safari/ui";
import type { ModelPageContent } from "@/types/content";
import { ApplyButton } from "@/components/ui/ApplyButton";

type ModelPageCloserProps = {
  closer: ModelPageContent["closer"];
  headingId: string;
};

function isApplyLabel(label: string) {
  return /apply/i.test(label);
}

export function ModelPageCloser({ closer, headingId }: ModelPageCloserProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="relative z-10 overflow-hidden bg-accent py-24 md:py-32"
    >
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2
            id={headingId}
            className="mb-6 text-balance text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
          >
            {closer.title}
          </h2>
          <p className="mb-10 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            {closer.body.line1}
            {closer.body.line2 ? (
              <>
                <br />
                {closer.body.line2}
              </>
            ) : null}
          </p>
          {(closer.primaryCta || closer.secondaryCta) && (
            <div className="flex flex-wrap justify-center gap-4">
              {closer.primaryCta && (
                <ApplyButton
                  variant="primary"
                  className="bg-white px-8 py-3.5 text-base text-accent-hover hover:bg-cream hover:text-accent"
                >
                  {closer.primaryCta.label}
                </ApplyButton>
              )}
              {closer.secondaryCta &&
                (isApplyLabel(closer.secondaryCta.label) ? (
                  <ApplyButton
                    variant="secondary"
                    className="border-white/50 bg-white/5 px-8 py-3.5 text-base text-white hover:bg-white/15"
                  >
                    {closer.secondaryCta.label}
                  </ApplyButton>
                ) : (
                  <Button
                    href={closer.secondaryCta.href}
                    variant="secondary"
                    className="border-white/50 bg-white/5 px-8 py-3.5 text-base text-white hover:bg-white/15"
                  >
                    {closer.secondaryCta.label}
                  </Button>
                ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
