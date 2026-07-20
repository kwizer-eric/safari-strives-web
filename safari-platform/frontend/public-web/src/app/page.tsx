import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Explore } from "@/components/sections/Explore";
import { InMotion } from "@/components/sections/InMotion";
import { FeaturedInsights } from "@/components/sections/FeaturedInsights";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { TestimonialsMarquee } from "@/components/sections/TestimonialsMarquee";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Explore />
        <InMotion />
        <FeaturedInsights />
        <FinalCTA />
        <TestimonialsMarquee />
      </main>
      <Footer />
    </>
  );
}
