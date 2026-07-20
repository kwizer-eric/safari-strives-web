"use client";

import { useState } from "react";
import { Container } from "@safari/ui";
import { aboutPage } from "@/data/about";
import { ventures } from "@/data/ventures";
import { VentureCard } from "@/components/ui/VentureCard";
import { YouTubeVideoModal } from "@/components/ui/YouTubeVideoModal";

export function VenturesGrid() {
  const [videoOpen, setVideoOpen] = useState(false);
  const { hero } = aboutPage;

  return (
    <section
      aria-label="Ventures"
      className="bg-background py-16 md:py-24"
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
        videoId={hero.videoId}
        videoStart={hero.videoStart}
        title="Why Safari Strives exists"
        autoplay={false}
      />
    </section>
  );
}
