import { Container } from "@safari/ui";
import type { Venture } from "@/types/content";

type VentureDetailHighlightsProps = {
  venture: Venture;
};

export function VentureDetailHighlights({
  venture,
}: VentureDetailHighlightsProps) {
  return (
    <section
      aria-labelledby="venture-highlights-heading"
      className="border-t border-border bg-background py-20 md:py-28"
    >
      <Container>
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            What we are building
          </p>
          <h2
            id="venture-highlights-heading"
            className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl"
          >
            How {venture.ventureName} is making value visible.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {venture.highlights.map((item, index) => (
            <article
              key={item.title}
              className="flex flex-col rounded-[var(--radius-card)] border border-border bg-card p-8"
            >
              <span className="mb-4 text-sm font-semibold text-accent">
                {String(index + 1).padStart(2, "0")} /
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
