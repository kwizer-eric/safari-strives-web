import { notFound } from "next/navigation";
import type { Article, Testimonial } from "@/types/content";
import {
  getPublishedCmsCollection,
  getPublishedCmsPage,
  latestArticles,
  type HomePayload,
} from "@/lib/cms";

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
 * Homepage content from the CMS only — no static mock fallbacks.
 * Missing/unpublished CMS (API 404 or empty items) → notFound().
 * Network / misconfigured API URL errors propagate to error.tsx.
 */
export async function getHomeContent(): Promise<HomeContent> {
  const [page, articlesCollection, testimonialsCollection] = await Promise.all([
    getPublishedCmsPage<HomePayload>("home"),
    getPublishedCmsCollection<{ items: Article[] }>("articles"),
    getPublishedCmsCollection<{ items: Testimonial[] }>("testimonials"),
  ]);

  const home = asHomePayload(page?.payload);
  if (!home) notFound();

  const articleItems = articlesCollection?.payload?.items;
  if (!Array.isArray(articleItems) || articleItems.length === 0) notFound();

  const testimonialItems = testimonialsCollection?.payload?.items;
  if (!Array.isArray(testimonialItems) || testimonialItems.length === 0) {
    notFound();
  }

  return {
    home,
    featuredArticles: latestArticles(articleItems, 3),
    testimonials: testimonialItems,
  };
}
