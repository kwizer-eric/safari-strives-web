import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProgramHero } from "@/components/sections/ProgramHero";
import { ProgramIntro } from "@/components/sections/ProgramIntro";
import { ProgramFeatureGrid } from "@/components/sections/ProgramFeatureGrid";
import { ProgramCloser } from "@/components/sections/ProgramCloser";
import { acceleratorPage } from "@/data/programs-content";

export const metadata: Metadata = {
  title: "Our Model — The Accelerator Program | Safari Strives",
  description:
    "The Venture Accelerator is a four-month support cycle for operating entrepreneurs in Rubavu. Founder-led growth, practitioner-led support, milestone-based grants.",
};

export default function OurModelPage() {
  return (
    <>
      <Header />
      <main>
        <ProgramHero hero={acceleratorPage.hero} />
        {acceleratorPage.intro && (
          <ProgramIntro section={acceleratorPage.intro} />
        )}
        <ProgramFeatureGrid features={acceleratorPage.features} />
        <ProgramCloser closer={acceleratorPage.closer} />
      </main>
      <Footer />
    </>
  );
}
