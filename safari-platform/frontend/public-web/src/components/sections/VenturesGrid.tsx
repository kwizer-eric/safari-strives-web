"use client";

import { useState } from "react";
import { Container } from "@safari/ui";
import { VentureCard } from "@/components/ui/VentureCard";
import { YouTubeVideoModal } from "@/components/ui/YouTubeVideoModal";
import { youtubeIdFromMediaUrl } from "@/lib/media-url";
import type { Venture } from "@/types/content";

type VenturesGridProps = {
  ventures: Venture[];
};

export function VenturesGrid({ ventures }: VenturesGridProps) {
  const [active, setActive] = useState<Venture | null>(null);
  const activeVideoId = active?.videoUrl
    ? youtubeIdFromMediaUrl(active.videoUrl)
    : null;

  return (
    <section
      aria-label="Ventures"
      className="relative z-10 scroll-mt-28 bg-background py-16 md:py-24"
    >
      <Container>
        <div className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-12">
          {ventures.map((venture) => (
            <VentureCard
              key={venture.id}
              venture={venture}
              onOpenVideo={() => setActive(venture)}
            />
          ))}
        </div>
      </Container>

      {active && activeVideoId ? (
        <YouTubeVideoModal
          open
          onClose={() => setActive(null)}
          videoId={activeVideoId}
          title={`${active.founder} — ${active.ventureName}`}
          autoplay
        />
      ) : null}

      {active && !activeVideoId && active.videoUrl ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          onClick={() => setActive(null)}
        >
          <div
            className="relative aspect-video w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              src={active.videoUrl}
              controls
              autoPlay
              className="absolute inset-0 h-full w-full rounded-lg bg-black"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
