import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProgramHero } from "@/components/sections/ProgramHero";
import { ProgramIntro } from "@/components/sections/ProgramIntro";
import { ProgramFeatureGrid } from "@/components/sections/ProgramFeatureGrid";
import { ProgramCloser } from "@/components/sections/ProgramCloser";
import { gelPage } from "@/data/programs-content";

export const metadata: Metadata = {
  title: "Green Enterprise Lab | Safari Strives",
  description:
    "Safari Strives' demonstration platform and cash-flow engine: poultry, packaged eggs, organic fertilizer, and market-ready green enterprise.",
};

export default function GreenEnterpriseLabPage() {
  return (
    <>
      <Header />
      <main>
        <ProgramHero hero={gelPage.hero} />
        {gelPage.intro && <ProgramIntro section={gelPage.intro} />}
        {gelPage.extraSections?.map((section, i) => (
          <ProgramIntro
            key={section.title ?? i}
            section={section}
            variant={i % 2 === 0 ? "cream" : "light"}
          />
        ))}
        <ProgramFeatureGrid features={gelPage.features} />
        <ProgramCloser closer={gelPage.closer} />
      </main>
      <Footer />
    </>
  );
}
