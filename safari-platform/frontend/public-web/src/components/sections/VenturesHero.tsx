import { Container } from "@safari/ui";
import { venturesPage } from "@/data/ventures";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";

export function VenturesHero() {
  return (
    <section
      aria-labelledby="ventures-hero-heading"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <HeroBackgroundVideo
          src={venturesPage.heroVideo}
          posterSrc={venturesPage.heroImage}
          label={venturesPage.heroImageAlt}
        />
        <div className="absolute inset-0 bg-dark/65" />
      </div>

      <Container className="relative flex min-h-[92vh] flex-col justify-end pb-20 pt-32 md:pb-28">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/80">
            {venturesPage.eyebrow}
          </p>
          <h1
            id="ventures-hero-heading"
            className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {venturesPage.headline}
          </h1>
        </div>
      </Container>
    </section>
  );
}
