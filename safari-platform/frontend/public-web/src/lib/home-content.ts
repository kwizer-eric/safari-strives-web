import type { Article, PressItem, Testimonial } from "@/types/content";
import {
  getPublishedCmsCollection,
  getPublishedCmsPage,
  latestFeaturedInsights,
  type FeaturedInsight,
  type HomePayload,
} from "@/lib/cms";
import { DEFAULT_HOME } from "@/lib/cms-defaults";

export type HomeContent = {
  home: HomePayload;
  featuredInsights: FeaturedInsight[];
  testimonials: Testimonial[];
};

function asHomePayload(payload: unknown): HomePayload | null {
  if (!payload || typeof payload !== "object") return null;
  const data = payload as Partial<HomePayload>;
  if (
    !data.hero ||
    !data.explore ||
    !data.inMotion ||
    !data.featuredInsights ||
    !data.finalCta
  ) {
    return null;
  }
  return data as HomePayload;
}

/**
 * Homepage content from the CMS. Missing/unreachable data falls back to
 * DEFAULT_HOME and empty lists — never takes the public site down.
 *
 * Featured Insights pools articles + press and picks the 3 newest by date
 * so a fresh press hit can displace an older blog post on the homepage.
 */
export async function getHomeContent(): Promise<HomeContent> {
  const page = await getPublishedCmsPage<HomePayload>("home");
  const home = asHomePayload(page?.payload) ?? DEFAULT_HOME;

  const [articlesCollection, pressCollection, testimonialsCollection] =
    await Promise.all([
      getPublishedCmsCollection<{ items: Article[] }>("articles"),
      getPublishedCmsCollection<{ items: PressItem[] }>("press"),
      getPublishedCmsCollection<{ items: Testimonial[] }>("testimonials"),
    ]);

  const articleItems = articlesCollection?.payload?.items;
  const pressItems = pressCollection?.payload?.items;
  const testimonialItems = testimonialsCollection?.payload?.items;

  return {
    home,
    featuredInsights: latestFeaturedInsights(
      Array.isArray(articleItems) ? articleItems : [],
      Array.isArray(pressItems) ? pressItems : [],
      3,
    ),
    testimonials: Array.isArray(testimonialItems) ? testimonialItems : [],
  };
}
