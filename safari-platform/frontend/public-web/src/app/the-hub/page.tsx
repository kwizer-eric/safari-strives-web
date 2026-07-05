import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProgramHero } from "@/components/sections/ProgramHero";
import { ProgramIntro } from "@/components/sections/ProgramIntro";
import { ProgramFeatureGrid } from "@/components/sections/ProgramFeatureGrid";
import { ProgramCloser } from "@/components/sections/ProgramCloser";
import { hubPage } from "@/data/programs-content";

export const metadata: Metadata = {
  title: "The Hub | Safari Strives",
  description:
    "Workspace, media studio, production tools, and a professional environment for founders in Rubavu.",
};

export default function TheHubPage() {
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
