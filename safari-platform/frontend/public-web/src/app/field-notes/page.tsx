import type { Metadata } from "next";
import { MarketingChrome } from "@/components/layout/MarketingChrome";
import { FieldNotesGrid } from "@/components/sections/FieldNotesGrid";
import { PressSection } from "@/components/sections/PressSection";
import { getArticles, getPressItems, getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights | Safari Strives",
  description:
    "Stories from the ground in Rubavu — on ventures, the hub, the lab, and making local enterprise visible.",
};

export default async function FieldNotesPage() {
  const [articles, pressItems, site] = await Promise.all([
    getArticles(),
    getPressItems(),
    getSiteSettings(),
  ]);

  return (
    <MarketingChrome solid>
      <main>
        <FieldNotesGrid articles={articles} />
        <PressSection items={pressItems} contactEmail={site.email} />
      </main>
    </MarketingChrome>
  );
}
