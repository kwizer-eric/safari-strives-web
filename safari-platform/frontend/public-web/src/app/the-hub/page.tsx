import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ModelPageHero } from "@/components/sections/ModelPageHero";
import { ModelPageAudience } from "@/components/sections/ModelPageAudience";
import { ModelPageFeatures } from "@/components/sections/ModelPageFeatures";
import { ModelPageCloser } from "@/components/sections/ModelPageCloser";
import { theHubPage } from "@/data/the-hub";

export const metadata: Metadata = {
  title: "The Hub | Safari Strives",
  description:
    "Workspace, media studio, production tools, and a professional environment for founders in Rubavu.",
};

export default function TheHubPage() {
  const page = theHubPage;

  return (
    <>
      <Header />
      <main>
        <ModelPageHero hero={page.hero} headingId="the-hub-hero-heading" />
        <ModelPageAudience
          audience={page.audience}
          headingId="the-hub-audience-heading"
        />
        <ModelPageFeatures
          differentiators={page.differentiators}
          headingId="the-hub-features-heading"
        />
        <ModelPageCloser
          closer={page.closer}
          headingId="the-hub-closer-heading"
        />
      </main>
      <Footer />
    </>
  );
}
