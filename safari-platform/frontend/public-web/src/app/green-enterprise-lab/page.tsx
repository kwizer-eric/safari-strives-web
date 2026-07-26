import type { Metadata } from "next";
import { MarketingChrome } from "@/components/layout/MarketingChrome";
import { ModelPageHero } from "@/components/sections/ModelPageHero";
import { ModelPageAudience } from "@/components/sections/ModelPageAudience";
import { ModelPageFeatures } from "@/components/sections/ModelPageFeatures";
import { ModelPageCloser } from "@/components/sections/ModelPageCloser";
import { getProgramPage } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Green Enterprise Lab | Safari Strives",
  description:
    "Safari Strives' demonstration platform and cash-flow engine: poultry, packaged eggs, organic fertilizer, and market-ready green enterprise.",
};

export default async function GreenEnterpriseLabPage() {
  const page = await getProgramPage("green-enterprise-lab");

  return (
    <MarketingChrome>
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
    </MarketingChrome>
  );
}

