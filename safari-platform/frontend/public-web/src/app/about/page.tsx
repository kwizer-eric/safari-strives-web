import type { Metadata } from "next";
import { MarketingChrome } from "@/components/layout/MarketingChrome";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutMission } from "@/components/sections/AboutMission";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { AboutPartners } from "@/components/sections/AboutPartners";
import { AboutCloser } from "@/components/sections/AboutCloser";
import { getAboutContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | Safari Strives",
  description:
    "Learn about Safari Strives — our mission, team, and partners building economic independence in Rwanda.",
};

export default async function AboutPage() {
  const { page, team, partners } = await getAboutContent();

  return (
    <MarketingChrome>
      <main>
        <AboutHero hero={page.hero} />
        <AboutMission mission={page.mission} />
        <AboutTeam team={page.team} members={team} />
        <AboutPartners copy={page.partners} partners={partners} />
        <AboutCloser closer={page.closer} />
      </main>
    </MarketingChrome>
  );
}
