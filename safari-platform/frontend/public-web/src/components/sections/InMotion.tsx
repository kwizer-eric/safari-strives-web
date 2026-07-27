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
  if (!inMotion.cards.length) return null;

  // Two cycles per group keep one group wider than ultra-wide viewports.
  // Doubling the duration preserves the original card movement speed.
  const loopCards = [...inMotion.cards, ...inMotion.cards];

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

      <div
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--site-gutter,32px)] pb-4 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden md:hidden"
        aria-label="In Motion cards. Swipe horizontally for more."
        tabIndex={0}
      >
        {inMotion.cards.map((card) => (
          <InMotionCard key={card.id} card={card} />
        ))}
      </div>

      <div className="marquee-viewport relative hidden overflow-hidden md:block">
        <div className="grid w-max motion-reduce:w-full">
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              aria-hidden={groupIndex === 1 ? true : undefined}
              className={
                groupIndex === 0
                  ? "marquee-lane marquee-lane-slow col-start-1 row-start-1 flex shrink-0 gap-4 pr-4 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0 md:gap-6 md:pr-6"
                  : "marquee-lane marquee-lane-slow marquee-lane-offset col-start-1 row-start-1 flex shrink-0 gap-4 pr-4 motion-reduce:hidden md:gap-6 md:pr-6"
              }
            >
              {loopCards.map((card, index) => (
                <InMotionCard
                  key={`${card.id}-${index}`}
                  card={card}
                  ariaHidden={
                    groupIndex === 1 || index >= inMotion.cards.length
                  }
                  className={
                    index >= inMotion.cards.length
                      ? "motion-reduce:hidden"
                      : undefined
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
