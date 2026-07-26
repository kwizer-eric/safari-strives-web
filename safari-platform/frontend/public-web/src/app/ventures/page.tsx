import type { Metadata } from "next";
import { MarketingChrome } from "@/components/layout/MarketingChrome";
import { VenturesHero } from "@/components/sections/VenturesHero";
import { VenturesGrid } from "@/components/sections/VenturesGrid";
import { VenturesMission } from "@/components/sections/VenturesMission";
import { getAboutContent, getVenturesContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Ventures | Safari Strives",
  description:
    "Meet the entrepreneurs building beyond survival with Safari Strives in Rubavu, Rwanda.",
};

export default async function VenturesPage() {
  const [{ page, ventures }, about] = await Promise.all([
    getVenturesContent(),
    getAboutContent(),
  ]);

  return (
    <MarketingChrome>
      <main>
        <VenturesHero page={page} />
        <VenturesGrid
          ventures={ventures}
          videoId={about.page.hero.videoId}
          videoStart={about.page.hero.videoStart}
        />
        <VenturesMission mission={page.mission} />
      </main>
    </MarketingChrome>
  );
}
