import { Button, Container } from "@safari/ui";
import type { ProgramPageContent } from "@/lib/program-page";

type ProgramCloserProps = {
  closer: ProgramPageContent["closer"];
};

export function ProgramCloser({ closer }: ProgramCloserProps) {
  return (
    <section
      aria-labelledby="program-closer-heading"
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)",
      }}
    >
      {/* Soft light glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-white/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-white/8 blur-3xl"
      />

      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Decorative outline circles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full border border-white/20 md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/2 hidden h-[26rem] w-[26rem] -translate-y-1/2 rounded-full border border-white/15 md:block"
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {closer.eyebrow && (
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-white/85">
              {closer.eyebrow}
            </p>
          )}
          <h2
            id="program-closer-heading"
            className="mb-6 text-balance text-3xl font-bold leading-[1.15] text-white md:text-4xl lg:text-5xl"
          >
            {closer.title}
          </h2>
          {closer.body && (
            <p className="mb-10 max-w-2xl text-balance text-lg leading-relaxed text-white/85 md:text-xl">
              {closer.body}
            </p>
          )}
          {(closer.primaryCta || closer.secondaryCta) && (
            <div className="flex flex-wrap justify-center gap-4">
              {closer.primaryCta && (
                <Button
                  href={closer.primaryCta.href}
                  variant="primary"
                  showArrow
                  className="bg-white px-8 py-3.5 text-base text-accent-hover shadow-xl shadow-black/10 hover:bg-cream hover:text-accent"
                >
                  {closer.primaryCta.label}
                </Button>
              )}
              {closer.secondaryCta && (
                <Button
                  href={closer.secondaryCta.href}
                  variant="secondary"
                  className="border-white/50 bg-white/5 px-8 py-3.5 text-base text-white backdrop-blur hover:bg-white/15"
                >
                  {closer.secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
