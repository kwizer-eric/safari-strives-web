import type { Metadata } from "next";
import { MarketingChrome } from "@/components/layout/MarketingChrome";
import { FieldNotesGrid } from "@/components/sections/FieldNotesGrid";
import { getArticles } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Field Notes | Safari Strives",
  description:
    "Stories from the ground in Rubavu — on ventures, the hub, the lab, and making local enterprise visible.",
};

export default async function FieldNotesPage() {
  const articles = await getArticles();

  return (
    <MarketingChrome solid>
      <main>
        <FieldNotesGrid articles={articles} />
      </main>
    </MarketingChrome>
  );
}
