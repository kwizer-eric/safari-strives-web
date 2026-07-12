import { Button, Container } from "@safari/ui";
import { venturesPage } from "@/data/ventures";

export function VenturesMission() {
  const { mission } = venturesPage;

  return (
    <section
      aria-labelledby="ventures-mission-heading"
      className="relative overflow-hidden py-20 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, #f9f9f7 0%, #f3f3f1 50%, #ecefe8 100%)",
      }}
    >
      {/* Soft accent glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-accent-hover/15 blur-3xl"
      />

      {/* Subtle dot grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(74, 74, 74, 0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 80%)",
        }}
      />

      {/* Decorative corner arcs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 hidden h-64 w-64 -translate-y-1/2 rounded-full border border-accent/30 md:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 hidden h-80 w-80 -translate-y-1/2 rounded-full border border-accent-hover/25 md:block"
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
            {mission.eyebrow}
          </p>

          <h2
            id="ventures-mission-heading"
            className="mb-4 text-balance text-3xl font-bold leading-[1.2] tracking-tight text-foreground md:text-4xl lg:text-[2.5rem]"
          >
            Ventures that escape the commodity trap.
          </h2>

          <p className="mb-10 max-w-2xl text-balance text-base leading-relaxed text-muted md:text-lg">
            {mission.body}
          </p>

          <Button
            href={mission.ctaHref}
            variant="primary"
            showArrow
            className="px-8 py-3.5 text-base shadow-lg shadow-accent/25 hover:shadow-accent/40"
          >
            {mission.ctaLabel}
          </Button>

          <p className="mt-6 text-xs text-muted">
            Rolling admissions. Rubavu, Rwanda.
          </p>
        </div>
      </Container>
    </section>
  );
}
