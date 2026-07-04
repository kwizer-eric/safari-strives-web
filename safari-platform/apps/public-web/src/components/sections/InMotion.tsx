import { Container } from "@safari/ui";
import { home } from "@/data/home";
import { InMotionCard } from "@/components/ui/InMotionCard";

export function InMotion() {
  const { inMotion } = home;
  const duplicated = [...inMotion.visuals, ...inMotion.visuals];

  return (
    <section
      id="in-motion"
      aria-labelledby="in-motion-heading"
      className="overflow-hidden bg-background py-16 md:py-24"
    >
      <Container>
        <h2
          id="in-motion-heading"
          className="mb-10 text-3xl font-bold tracking-tight text-foreground md:mb-12 md:text-4xl"
        >
          {inMotion.title}
        </h2>
      </Container>

      <div className="relative mb-12 overflow-hidden md:mb-16">
        <div className="flex w-max gap-4 animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center md:gap-6">
          {duplicated.map((visual, index) => (
            <InMotionCard
              key={`${visual.id}-${index}`}
              label={visual.label}
              image={visual.image}
              imageAlt={visual.imageAlt}
            />
          ))}
        </div>
      </div>

      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {inMotion.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[var(--radius-card)] border border-border bg-card p-6"
            >
              <p className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
                {stat.value}
              </p>
              <p className="text-sm leading-relaxed text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
