import { Container } from "@safari/ui";
import { home } from "@/data/home";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";

export function Hero() {
  const { hero } = home;

  return (
    <section
      aria-labelledby="hero-heading"
      className="sticky top-0 z-0 h-svh min-h-svh"
    >
      <div className="absolute inset-0 overflow-hidden">
        <HeroBackgroundVideo
          src={hero.heroVideo}
          posterSrc={hero.image}
          label={hero.imageAlt}
        />
        <div className="absolute inset-0 bg-dark/60" />
      </div>

      <Container className="relative flex h-full min-h-svh flex-col justify-end pb-20 pt-32 md:pb-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <h1
            id="hero-heading"
            className="max-w-2xl text-5xl font-bold leading-[1.05] tracking-tight text-white md:max-w-3xl md:text-6xl lg:text-7xl"
          >
            {hero.headline}
          </h1>

          <p className="max-w-sm text-sm leading-relaxed text-white/90 md:max-w-md md:text-base md:leading-7">
            {hero.body}
          </p>
        </div>
      </Container>
    </section>
  );
}
