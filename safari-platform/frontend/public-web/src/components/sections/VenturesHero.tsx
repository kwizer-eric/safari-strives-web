"use client";

import Image from "next/image";
import { Container } from "@safari/ui";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";
import type { VenturesPagePayload } from "@/types/content";

type VenturesHeroProps = {
  page: VenturesPagePayload;
};

export function VenturesHero({ page }: VenturesHeroProps) {
  const hasVideo = Boolean(page.heroVideo?.trim());
  const hasPhoto = Boolean(page.heroImage?.trim());

  return (
    <section
      aria-labelledby="ventures-hero-heading"
      className="sticky top-0 z-0 min-h-[92vh]"
    >
      <div className="absolute inset-0 overflow-hidden">
        {hasVideo ? (
          <HeroBackgroundVideo
            src={page.heroVideo}
            label={page.heroImageAlt || "Ventures hero video"}
          />
        ) : hasPhoto ? (
          <Image
            src={page.heroImage}
            alt={page.heroImageAlt || "Ventures hero"}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div
            className="h-full w-full bg-dark"
            role="img"
            aria-label={page.heroImageAlt || "Ventures hero"}
          />
        )}
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
