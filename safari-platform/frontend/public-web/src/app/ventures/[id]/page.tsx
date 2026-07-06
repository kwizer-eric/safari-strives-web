import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VentureDetailHero } from "@/components/sections/VentureDetailHero";
import { VentureDetailStory } from "@/components/sections/VentureDetailStory";
import { VentureDetailHighlights } from "@/components/sections/VentureDetailHighlights";
import { VentureDetailMore } from "@/components/sections/VentureDetailMore";
import { VenturesMission } from "@/components/sections/VenturesMission";
import {
  getOtherVentures,
  getVentureById,
  ventures,
} from "@/data/ventures";

type VentureDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return ventures.map((venture) => ({ id: venture.id }));
}

export async function generateMetadata({
  params,
}: VentureDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const venture = getVentureById(id);

  if (!venture) {
    return {};
  }

  return {
    title: `${venture.ventureName} | Safari Strives Ventures`,
    description: venture.tagline,
  };
}

export default async function VentureDetailPage({
  params,
}: VentureDetailPageProps) {
  const { id } = await params;
  const venture = getVentureById(id);

  if (!venture) {
    notFound();
  }

  const otherVentures = getOtherVentures(id);

  return (
    <>
      <Header />
      <main>
        <VentureDetailHero venture={venture} />
        <VentureDetailStory venture={venture} />
        <VentureDetailHighlights venture={venture} />
        <VentureDetailMore ventures={otherVentures} />
        <VenturesMission />
      </main>
      <Footer />
    </>
  );
}
