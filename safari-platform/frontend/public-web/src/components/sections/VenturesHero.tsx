import { Container } from "@safari/ui";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";
import type { VenturesPagePayload } from "@/types/content";

type VenturesHeroProps = {
  page: VenturesPagePayload;
};

export function VenturesHero({ page }: VenturesHeroProps) {
  return (
    <section
      aria-labelledby="ventures-hero-heading"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <HeroBackgroundVideo
          src={page.heroVideo}
          label={page.heroImageAlt || "Ventures hero video"}
        />
        <div className="pointer-events-none absolute inset-0 bg-dark/65" />
      </div>

      <Container className="relative flex min-h-[92vh] flex-col justify-end pb-20 pt-32 md:pb-28">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/80">
            {page.eyebrow}
          </p>
          <h1
            id="ventures-hero-heading"
            className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {page.headline}
          </h1>
        </div>
      </Container>
    </section>
  );
}
