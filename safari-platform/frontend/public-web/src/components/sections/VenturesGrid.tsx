"use client";

import { useState } from "react";
import { Container } from "@safari/ui";
import { VentureCard } from "@/components/ui/VentureCard";
import { YouTubeVideoModal } from "@/components/ui/YouTubeVideoModal";
import type { Venture } from "@/types/content";

type VenturesGridProps = {
  ventures: Venture[];
  videoId: string;
  videoStart: number;
};

export function VenturesGrid({
  ventures,
  videoId,
  videoStart,
}: VenturesGridProps) {
  const [videoOpen, setVideoOpen] = useState(false);

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
              onOpenVideo={() => setVideoOpen(true)}
            />
          ))}
        </div>
      </Container>

      <YouTubeVideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoId={videoId}
        videoStart={videoStart}
        title="Why Safari Strives exists"
        autoplay={false}
      />
    </section>
  );
}
