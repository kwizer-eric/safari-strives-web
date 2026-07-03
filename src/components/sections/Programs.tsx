import { whyWeStarted } from "@/data/whyWeStarted";
import { Container } from "@/components/layout/Container";
import { WhyWeStartedCards } from "@/components/sections/WhyWeStartedCards";

export function Programs() {
  const { intro } = whyWeStarted;

  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="bg-background py-16 md:py-24"
    >
      <Container>
        <div className="mx-auto mb-12 max-w-4xl text-center md:mb-16">
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-accent">
            {intro.eyebrow}
          </p>
          <p
            id="programs-heading"
            className="text-2xl font-normal leading-snug tracking-tight text-foreground md:text-3xl lg:text-4xl"
          >
            {intro.lead}
          </p>
        </div>
        <WhyWeStartedCards />
      </Container>
    </section>
  );
}
