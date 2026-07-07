import { Container } from "@safari/ui";
import type { Venture } from "@/data/ventures";

type VentureDetailStoryProps = {
  venture: Venture;
};

export function VentureDetailStory({ venture }: VentureDetailStoryProps) {
  return (
    <section
      aria-label={`About ${venture.ventureName}`}
      className="bg-cream py-20 md:py-28"
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              The venture
            </p>
            <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
              Building beyond the commodity trap.
            </h2>
          </div>
          <div className="md:col-span-8">
            <div className="flex flex-col gap-5">
              {venture.story.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-muted md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
