import { MarketingChrome } from "@/components/layout/MarketingChrome";
import { Hero } from "@/components/sections/Hero";
import { Explore } from "@/components/sections/Explore";
import { InMotion } from "@/components/sections/InMotion";
import { FeaturedInsights } from "@/components/sections/FeaturedInsights";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { TestimonialsMarquee } from "@/components/sections/TestimonialsMarquee";
import { getHomeContent } from "@/lib/home-content";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [{ home, featuredArticles, testimonials }, site] = await Promise.all([
    getHomeContent(),
    getSiteSettings(),
  ]);

  return (
    <MarketingChrome>
      <main>
        <Hero hero={home.hero} />
        <Explore explore={home.explore} />
        <InMotion inMotion={home.inMotion} />
        <FeaturedInsights
          title={home.featuredInsights.title}
          articles={featuredArticles}
        />
        <FinalCTA finalCta={home.finalCta} donateHref={site.donateHref} />
        <TestimonialsMarquee testimonials={testimonials} />
      </main>
    </MarketingChrome>
  );
}
