"use client";

import { useState } from "react";
import { Button, Container } from "@safari/ui";
import { YouTubeVideoModal } from "@/components/ui/YouTubeVideoModal";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";
import { youtubeIdFromMediaUrl } from "@/lib/media-url";
import type { AboutPagePayload } from "@/types/content";

type AboutHeroProps = {
  hero: AboutPagePayload["hero"];
};

export function AboutHero({ hero }: AboutHeroProps) {
  const [videoOpen, setVideoOpen] = useState(false);
  const watchVideoId = youtubeIdFromMediaUrl(hero.videoId) ?? "";
  // Prefer dedicated video URL, then image (may be a Cloudinary video), then YouTube id.
  const mediaSrc =
    hero.heroVideo.trim() ||
    hero.image.trim() ||
    (watchVideoId ? `https://www.youtube.com/watch?v=${watchVideoId}` : "");

  return (
    <>
      <section
        aria-labelledby="about-hero-heading"
        className="sticky top-0 z-0 min-h-[92vh]"
      >
        <div className="absolute inset-0 overflow-hidden">
          {mediaSrc ? (
            <HeroBackgroundVideo
              src={mediaSrc}
              label={hero.imageAlt || "About hero"}
            />
          ) : (
            <div
              className="h-full w-full bg-dark"
              role="img"
              aria-label={hero.imageAlt || "About hero"}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-dark/60" />
        </div>

        <Container className="relative flex min-h-[92vh] flex-col justify-end pb-20 pt-32 md:pb-28">
          <h1 id="about-hero-heading" className="sr-only">
            {[hero.headline.line1, hero.headline.line2]
              .map((line) => line.trim())
              .filter(Boolean)
              .join(" ")}
          </h1>
          {watchVideoId ? (
            <div className="max-w-4xl">
              <Button
                variant="secondary"
                onClick={() => setVideoOpen(true)}
                className="border-white/40 text-white hover:bg-white/10"
              >
                {hero.watchVideoLabel}
              </Button>
            </div>
          ) : null}
        </Container>
      </section>

      <YouTubeVideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoId={watchVideoId}
        videoStart={hero.videoStart}
        title="We Don't Advise From a Distance."
      />
    </>
  );
}
