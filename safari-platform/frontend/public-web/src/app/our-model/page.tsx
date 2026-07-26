import type { Metadata } from "next";
import { MarketingChrome } from "@/components/layout/MarketingChrome";
import { ModelPageHero } from "@/components/sections/ModelPageHero";
import { ModelPageAudience } from "@/components/sections/ModelPageAudience";
import { ModelPageFeatures } from "@/components/sections/ModelPageFeatures";
import { ModelPageCloser } from "@/components/sections/ModelPageCloser";
import { getProgramPage } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Venture Accelerator | Safari Strives",
  description:
    "A four-month, execution-focused program for operating entrepreneurs in Rwanda's secondary cities who are ready to strengthen their businesses and grow.",
};

export default async function VentureAcceleratorPage() {
  const page = await getProgramPage("our-model");

  return (
    <MarketingChrome>
      <main>
        <ModelPageHero
          hero={page.hero}
          headingId="venture-accelerator-hero-heading"
        />
        <ModelPageAudience
          audience={page.audience}
          headingId="venture-accelerator-audience-heading"
        />
        <ModelPageFeatures
          differentiators={page.differentiators}
          headingId="venture-accelerator-features-heading"
        />
        <ModelPageCloser
          closer={page.closer}
          headingId="venture-accelerator-closer-heading"
        />
      </main>
    </MarketingChrome>
  );
}
