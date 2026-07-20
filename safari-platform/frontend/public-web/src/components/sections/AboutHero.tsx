"use client";

import { useState } from "react";
import { Button, Container } from "@safari/ui";
import { aboutPage } from "@/data/about";
import { YouTubeVideoModal } from "@/components/ui/YouTubeVideoModal";
import { HeroBackgroundVideo } from "@/components/ui/HeroBackgroundVideo";

export function AboutHero() {
  const { hero } = aboutPage;
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <section
        aria-labelledby="about-hero-heading"
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
              id="about-hero-heading"
              className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              {hero.headline.line1}
              <br />
              {hero.headline.line2}
            </h1>
            <Button
              variant="secondary"
              onClick={() => setVideoOpen(true)}
              className="mt-8 border-white/40 text-white hover:bg-white/10"
            >
              {hero.watchVideoLabel}
            </Button>
          </div>
        </Container>
      </section>

      <YouTubeVideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoId={hero.videoId}
        videoStart={hero.videoStart}
        title="Why Safari Strives exists"
      />
    </>
  );
}
