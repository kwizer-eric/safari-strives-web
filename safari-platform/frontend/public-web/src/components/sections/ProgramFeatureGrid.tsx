import { Container } from "@safari/ui";
import type { ProgramPageContent } from "@/lib/program-page";

type ProgramFeatureGridProps = {
  features: ProgramPageContent["features"];
};

export function ProgramFeatureGrid({ features }: ProgramFeatureGridProps) {
  return (
    <section
      aria-labelledby="program-features-heading"
      className="bg-background border-t border-border py-20 md:py-28"
    >
      <Container>
        <div className="mb-12 max-w-3xl md:mb-16">
          {features.eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              {features.eyebrow}
            </p>
          )}
          <h2
            id="program-features-heading"
            className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            {features.title}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.items.map((item, i) => (
            <article
              key={item.title}
              className="flex flex-col rounded-[var(--radius-card)] border border-border bg-card p-8"
            >
              <span className="mb-4 text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")} /
              </span>
              <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-foreground">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-muted">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
