import { Container } from "@safari/ui";
import type { ModelPageContent } from "@/data/model-page";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";

type ModelPageHeroProps = {
  hero: ModelPageContent["hero"];
  headingId: string;
};

export function ModelPageHero({ hero, headingId }: ModelPageHeroProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="sticky top-0 z-0 min-h-[92vh]"
    >
      <div className="absolute inset-0 overflow-hidden">
        <HeroBackgroundVideo
          src={hero.heroVideo}
          posterSrc={hero.image}
          label={hero.imageAlt}
        />
        <div className="absolute inset-0 bg-dark/60" />
      </div>

      <Container className="relative flex min-h-[92vh] flex-col justify-end pb-20 pt-32 md:pb-28">
        <div className="max-w-4xl">
          <h1
            id={headingId}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {hero.headline.line1}
            <br />
            {hero.headline.line2}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            {hero.subhead.line1}
            {hero.subhead.line2 ? (
              <>
                <br />
                {hero.subhead.line2}
              </>
            ) : null}
          </p>
        </div>
      </Container>
    </section>
  );
}
