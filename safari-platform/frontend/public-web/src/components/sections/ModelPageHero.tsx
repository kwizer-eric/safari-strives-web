"use client";

import Image from "next/image";
import { Container } from "@safari/ui";
import type { ModelPageContent } from "@/types/content";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";

type ModelPageHeroProps = {
  hero: ModelPageContent["hero"];
  headingId: string;
};

export function ModelPageHero({ hero, headingId }: ModelPageHeroProps) {
  const hasVideo = Boolean(hero.heroVideo?.trim());
  const hasPhoto = Boolean(hero.image?.trim());

  return (
    <section
      aria-labelledby={headingId}
      className="sticky top-0 z-0 h-svh min-h-svh"
    >
      <div className="absolute inset-0 overflow-hidden">
        {hasVideo ? (
          <HeroBackgroundVideo
            src={hero.heroVideo}
            label={hero.imageAlt || "Program hero video"}
          />
        ) : hasPhoto ? (
          <Image
            src={hero.image}
            alt={hero.imageAlt || "Program hero"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized
          />
        ) : (
          <div
            className="h-full w-full bg-dark"
            role="img"
            aria-label={hero.imageAlt || "Program hero"}
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-dark/60" />
      </div>

      <Container className="relative flex h-full min-h-svh flex-col justify-end pb-20 pt-32 md:pb-28">
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
