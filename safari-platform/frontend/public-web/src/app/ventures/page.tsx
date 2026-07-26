import type { Metadata } from "next";
import { MarketingChrome } from "@/components/layout/MarketingChrome";
import { VenturesHero } from "@/components/sections/VenturesHero";
import { VenturesGrid } from "@/components/sections/VenturesGrid";
import { VenturesMission } from "@/components/sections/VenturesMission";
import { getVenturesContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Ventures | Safari Strives",
  description:
    "Meet the entrepreneurs building beyond survival with Safari Strives in Rubavu, Rwanda.",
};

export default async function VenturesPage() {
  const { page, ventures } = await getVenturesContent();

  return (
    <MarketingChrome>
      <main>
        <VenturesHero page={page} />
        <VenturesGrid ventures={ventures} />
        <VenturesMission mission={page.mission} />
      </main>
    </MarketingChrome>
  );
}
