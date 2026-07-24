import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@safari/ui";
import type { Venture } from "@/types/content";

type VentureDetailMoreProps = {
  ventures: Venture[];
};

export function VentureDetailMore({ ventures }: VentureDetailMoreProps) {
  if (ventures.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="more-ventures-heading"
      className="border-t border-border bg-background py-20 md:py-28"
    >
      <Container>
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              More ventures
            </p>
            <h2
              id="more-ventures-heading"
              className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl"
            >
              Meet more founders in the portfolio.
            </h2>
          </div>
          <Link
            href="/ventures"
            className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-accent"
          >
            View all ventures
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {ventures.map((venture) => {
            const location = venture.location ? `, ${venture.location}` : "";

            return (
              <Link
                key={venture.id}
                href={`/ventures/${venture.id}`}
                className="group flex flex-col rounded-[var(--radius-card)] border border-border bg-card p-6 transition-colors hover:border-accent/40"
              >
                <p className="mb-2 text-lg font-semibold leading-snug text-foreground">
                  {venture.founder}{" "}
                  <span className="text-muted">/ {venture.ventureName}</span>
                </p>
                <p className="mb-4 text-sm text-muted">
                  {venture.category}
                  {location}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                  View
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
