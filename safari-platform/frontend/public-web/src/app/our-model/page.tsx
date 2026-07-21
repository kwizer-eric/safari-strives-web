import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ModelPageHero } from "@/components/sections/ModelPageHero";
import { ModelPageAudience } from "@/components/sections/ModelPageAudience";
import { ModelPageFeatures } from "@/components/sections/ModelPageFeatures";
import { ModelPageCloser } from "@/components/sections/ModelPageCloser";
import { ventureAcceleratorPage } from "@/data/venture-accelerator";

export const metadata: Metadata = {
  title: "The Venture Accelerator | Safari Strives",
  description:
    "A four-month, execution-focused program for operating entrepreneurs in Rwanda's secondary cities who are ready to strengthen their businesses and grow.",
};

export default function VentureAcceleratorPage() {
  const page = ventureAcceleratorPage;

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}
