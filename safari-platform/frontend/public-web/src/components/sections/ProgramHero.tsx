import Image from "next/image";
import { Play } from "lucide-react";
import { Button, Container } from "@safari/ui";
import type { ProgramPageContent } from "@/data/programs-content";

type ProgramHeroProps = {
  hero: ProgramPageContent["hero"];
};

export function ProgramHero({ hero }: ProgramHeroProps) {
  return (
    <section
      aria-labelledby="program-hero-heading"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={hero.videoPoster}
          alt={hero.videoPosterAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark/65" />
      </div>

      <Container className="relative flex min-h-[85vh] flex-col justify-end pb-16 pt-32 md:pb-24">
        <div className="mb-8 inline-flex items-center gap-3 self-start rounded-full bg-white/10 px-4 py-2 backdrop-blur">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-dark">
            <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/90">
            Watch the film
          </span>
        </div>

        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/80">
            {hero.eyebrow}
          </p>
          <h1
            id="program-hero-heading"
            className="mb-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {hero.headline}
          </h1>
          {hero.body && (
            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              {hero.body}
            </p>
          )}
          {hero.subhead && (
            <p className="mb-8 max-w-2xl text-lg text-white/90 md:text-xl">
              {hero.subhead}
            </p>
          )}

          {(hero.primaryCta || hero.contactEmail) && (
            <div className="flex flex-wrap items-center gap-6">
              {hero.primaryCta && (
                <Button
                  href={hero.primaryCta.href}
                  variant="primary"
                  showArrow
                >
                  {hero.primaryCta.label}
                </Button>
              )}
              {hero.contactEmail && (
                <p className="text-sm text-white/80">
                  For more information, contact{" "}
                  <a
                    href={`mailto:${hero.contactEmail}`}
                    className="font-semibold text-white underline underline-offset-4 hover:text-accent"
                  >
                    {hero.contactEmail}
                  </a>
                </p>
              )}
            </div>
          )}

          {hero.videoCaption && (
            <p className="mt-8 max-w-2xl text-xs italic text-white/60">
              {hero.videoCaption}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
