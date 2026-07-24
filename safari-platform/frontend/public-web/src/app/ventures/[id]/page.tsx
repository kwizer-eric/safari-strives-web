import type { Metadata } from "next";
import { MarketingChrome } from "@/components/layout/MarketingChrome";
import { VentureDetailHero } from "@/components/sections/VentureDetailHero";
import { VentureDetailStory } from "@/components/sections/VentureDetailStory";
import { VentureDetailHighlights } from "@/components/sections/VentureDetailHighlights";
import { VentureDetailMore } from "@/components/sections/VentureDetailMore";
import { VenturesMission } from "@/components/sections/VenturesMission";
import { getVentureById } from "@/lib/content";

type VentureDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: VentureDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const { venture } = await getVentureById(id);
    return {
      title: `${venture.ventureName} | Safari Strives Ventures`,
      description: venture.tagline,
    };
  } catch {
    return {};
  }
}

export default async function VentureDetailPage({
  params,
}: VentureDetailPageProps) {
  const { id } = await params;
  const { page, venture, others } = await getVentureById(id);

  return (
    <MarketingChrome>
      <main>
        <VentureDetailHero venture={venture} />
        <VentureDetailStory venture={venture} />
        <VentureDetailHighlights venture={venture} />
        <VentureDetailMore ventures={others} />
        <VenturesMission mission={page.mission} />
      </main>
    </MarketingChrome>
  );
}
