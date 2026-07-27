import type { Article, Testimonial } from "@/types/content";
import {
  getPublishedCmsCollection,
  getPublishedCmsPage,
  latestArticles,
  type HomePayload,
} from "@/lib/cms";
import { DEFAULT_HOME } from "@/lib/cms-defaults";

export type HomeContent = {
  home: HomePayload;
  featuredArticles: Article[];
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
 */
export async function getHomeContent(): Promise<HomeContent> {
  const page = await getPublishedCmsPage<HomePayload>("home");
  const home = asHomePayload(page?.payload) ?? DEFAULT_HOME;

  const articlesCollection = await getPublishedCmsCollection<{
    items: Article[];
  }>("articles");
  const testimonialsCollection = await getPublishedCmsCollection<{
    items: Testimonial[];
  }>("testimonials");

  const articleItems = articlesCollection?.payload?.items;
  const testimonialItems = testimonialsCollection?.payload?.items;

  return {
    home,
    featuredArticles: Array.isArray(articleItems)
      ? latestArticles(articleItems, 3)
      : [],
    testimonials: Array.isArray(testimonialItems) ? testimonialItems : [],
  };
}
