import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProgramHero } from "@/components/sections/ProgramHero";
import { ProgramIntro } from "@/components/sections/ProgramIntro";
import { ProgramFeatureGrid } from "@/components/sections/ProgramFeatureGrid";
import { ProgramCloser } from "@/components/sections/ProgramCloser";
import { getPage } from "@/lib/api";
import { toProgramPageContent } from "@/lib/program-page";

export const metadata: Metadata = {
  title: "The Hub | Safari Strives",
  description:
    "Workspace, media studio, production tools, and a professional environment for founders in Rubavu.",
};

export default async function TheHubPage() {
  const page = await getPage("the-hub");
  if (!page) {
    notFound();
  }
  const hubPage = toProgramPageContent(page);

  return (
    <>
      <Header />
      <main>
        <ProgramHero hero={hubPage.hero} />
        {hubPage.intro && <ProgramIntro section={hubPage.intro} />}
        <ProgramFeatureGrid features={hubPage.features} />
        <ProgramCloser closer={hubPage.closer} />
      </main>
      <Footer />
    </>
  );
}
