"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button, Container } from "@safari/ui";
import { aboutPage } from "@/data/about";

function buildVideoSrc(videoId: string, videoStart: number) {
  const params = new URLSearchParams({
    autoplay: "1",
    start: String(videoStart),
    controls: "1",
    rel: "0",
    cc_load_policy: "0",
    modestbranding: "1",
    playsinline: "1",
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function AboutHero() {
  const { hero } = aboutPage;
  const [videoOpen, setVideoOpen] = useState(false);

  const closeVideo = useCallback(() => setVideoOpen(false), []);

  useEffect(() => {
    if (!videoOpen) return;

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeVideo();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [videoOpen, closeVideo]);

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
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

      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          onClick={closeVideo}
        >
          <button
            type="button"
            onClick={closeVideo}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Close video"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>

          <div
            className="relative aspect-video w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <iframe
              src={buildVideoSrc(hero.videoId, hero.videoStart)}
              title="Why Safari Strives exists"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              className="absolute inset-0 h-full w-full rounded-lg border-0"
            />
          </div>
        </div>
      )}
    </section>
  );
}
