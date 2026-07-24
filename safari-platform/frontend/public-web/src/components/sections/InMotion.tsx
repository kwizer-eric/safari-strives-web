import { Container } from "@safari/ui";
import { InMotionCard } from "@/components/ui/InMotionCard";
import type { HomeInMotionCard } from "@/lib/cms";

type InMotionProps = {
  inMotion: {
    eyebrow: string;
    title: string;
    cards: readonly HomeInMotionCard[];
  };
};

export function InMotion({ inMotion }: InMotionProps) {
  const duplicated = [...inMotion.cards, ...inMotion.cards];

  return (
    <section
      id="in-motion"
      aria-label="In Motion"
      className="relative z-10 overflow-hidden bg-black py-24 md:py-36"
    >
      <Container>
        <div className="mb-10 max-w-3xl md:mb-14">
          <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-accent">
            {inMotion.eyebrow}
          </p>
          <h2 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            {inMotion.title}
          </h2>
        </div>
      </Container>

      <div className="relative overflow-hidden">
        <div className="flex w-max gap-4 animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center md:gap-6">
          {duplicated.map((card, index) => (
            <InMotionCard key={`${card.id}-${index}`} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
