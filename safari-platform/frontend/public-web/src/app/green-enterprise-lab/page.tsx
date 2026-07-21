import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ModelPageHero } from "@/components/sections/ModelPageHero";
import { ModelPageAudience } from "@/components/sections/ModelPageAudience";
import { ModelPageFeatures } from "@/components/sections/ModelPageFeatures";
import { ModelPageCloser } from "@/components/sections/ModelPageCloser";
import { greenEnterpriseLabPage } from "@/data/green-enterprise-lab";

export const metadata: Metadata = {
  title: "Green Enterprise Lab | Safari Strives",
  description:
    "Safari Strives' demonstration platform and cash-flow engine: poultry, packaged eggs, organic fertilizer, and market-ready green enterprise.",
};

export default function GreenEnterpriseLabPage() {
  const page = greenEnterpriseLabPage;

  return (
    <>
      <Header />
      <main>
        <ModelPageHero
          hero={page.hero}
          headingId="green-enterprise-lab-hero-heading"
        />
        <ModelPageAudience
          audience={page.audience}
          headingId="green-enterprise-lab-audience-heading"
        />
        <ModelPageFeatures
          differentiators={page.differentiators}
          headingId="green-enterprise-lab-features-heading"
        />
        <ModelPageCloser
          closer={page.closer}
          headingId="green-enterprise-lab-closer-heading"
        />
      </main>
      <Footer />
    </>
  );
}
