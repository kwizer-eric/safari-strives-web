import { DEFAULT_BACKEND_URL } from "@safari/shared";
import type { Article, Testimonial } from "@/types/content";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? `${DEFAULT_BACKEND_URL}/api/v1`;

export type HomeHero = {
  headline: string;
  body: string;
  image: string;
  imageAlt: string;
  heroVideo: string;
};

export type HomePillar = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
};

export type HomeInMotionCard = {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
};

export type HomePayload = {
  hero: HomeHero;
  opening?: {
    title: string;
    body: string;
  };
  explore: {
    title: string;
    pillars: HomePillar[];
  };
  inMotion: {
    eyebrow: string;
    title: string;
    cards: HomeInMotionCard[];
  };
  featuredInsights: {
    title: string;
  };
  finalCta: {
    line1: string;
    line2: string;
  };
};

export type CmsPage<TPayload = Record<string, unknown>> = {
  id: number;
  slug: string;
  title: string;
  is_published: boolean;
  payload: TPayload;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type CmsCollection<TPayload = Record<string, unknown>> = {
  id: number;
  key: string;
  label: string;
  is_published: boolean;
  payload: TPayload;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

async function cmsFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "content-type": "application/json",
        ...(init?.headers ?? {}),
      },
      // no-store on reads so `next build` does not prerender against a live API.
      cache: "no-store",
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`CMS request failed (${res.status}): ${path}`);
    }
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getPublishedCmsPage<TPayload>(
  slug: string,
): Promise<CmsPage<TPayload> | null> {
  return cmsFetch<CmsPage<TPayload>>(`/cms/pages/${slug}`);
}

export async function getPublishedCmsCollection<TPayload>(
  key: string,
): Promise<CmsCollection<TPayload> | null> {
  return cmsFetch<CmsCollection<TPayload>>(`/cms/collections/${key}`);
}

/** Admin list/patch — no-store so the editor always sees fresh DB state. */
function adminHeaders(token: string): HeadersInit {
  return {
    "content-type": "application/json",
    authorization: `Bearer ${token}`,
  };
}

async function throwAdminCmsError(
  res: Response,
  fallback: string,
): Promise<never> {
  let detail = "";
  try {
    const body = (await res.json()) as { detail?: unknown };
    if (typeof body.detail === "string") detail = body.detail;
  } catch {
    /* non-JSON body */
  }

  if (res.status === 401) {
    throw new Error(
      "Session expired or invalid. Sign out, sign in again, then save.",
    );
  }
  throw new Error(detail || `${fallback} (${res.status})`);
}

export async function listAdminCmsPages(token: string): Promise<CmsPage[]> {
  const res = await fetch(`${API_URL}/admin/cms/pages`, {
    cache: "no-store",
    headers: adminHeaders(token),
  });
  if (!res.ok) await throwAdminCmsError(res, "Failed to list CMS pages");
  return res.json() as Promise<CmsPage[]>;
}

export async function patchAdminCmsPage<TPayload = Record<string, unknown>>(
  token: string,
  pageId: number,
  body: { payload?: TPayload; title?: string; is_published?: boolean },
): Promise<CmsPage<TPayload>> {
  const res = await fetch(`${API_URL}/admin/cms/pages/${pageId}`, {
    method: "PATCH",
    headers: adminHeaders(token),
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) await throwAdminCmsError(res, "Failed to update CMS page");
  return res.json() as Promise<CmsPage<TPayload>>;
}

export async function listAdminCmsCollections(
  token: string,
): Promise<CmsCollection[]> {
  const res = await fetch(`${API_URL}/admin/cms/collections`, {
    cache: "no-store",
    headers: adminHeaders(token),
  });
  if (!res.ok) await throwAdminCmsError(res, "Failed to list CMS collections");
  return res.json() as Promise<CmsCollection[]>;
}

export async function patchAdminCmsCollection<
  TPayload = Record<string, unknown>,
>(
  token: string,
  collectionId: number,
  body: {
    payload?: TPayload;
    label?: string;
    is_published?: boolean;
  },
): Promise<CmsCollection<TPayload>> {
  const res = await fetch(`${API_URL}/admin/cms/collections/${collectionId}`, {
    method: "PATCH",
    headers: adminHeaders(token),
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    await throwAdminCmsError(res, "Failed to update CMS collection");
  }
  return res.json() as Promise<CmsCollection<TPayload>>;
}

export function findCmsPageBySlug<TPayload = Record<string, unknown>>(
  pages: CmsPage[],
  slug: string,
): CmsPage<TPayload> | undefined {
  return pages.find((page) => page.slug === slug) as
    | CmsPage<TPayload>
    | undefined;
}

export function findCmsCollectionByKey<TPayload = Record<string, unknown>>(
  collections: CmsCollection[],
  key: string,
): CmsCollection<TPayload> | undefined {
  return collections.find((item) => item.key === key) as
    | CmsCollection<TPayload>
    | undefined;
}

export function parseArticleDate(date: string): number {
  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function latestArticles(items: Article[], limit = 3): Article[] {
  return [...items]
    .sort((a, b) => parseArticleDate(b.date) - parseArticleDate(a.date))
    .slice(0, limit);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// --- Typed program pages (relational Page model) ---

export type ProgramFeature = {
  id?: number;
  title: string;
  description: string;
  display_order: number;
  icon?: string | null;
  image_url?: string | null;
};

export type ProgramPage = {
  id: number;
  slug: string;
  is_published: boolean;
  hero_eyebrow: string | null;
  hero_title: string;
  hero_subhead: string | null;
  hero_body: string | null;
  hero_video_url: string | null;
  hero_media_alt: string | null;
  hero_media_caption: string | null;
  hero_cta_label: string | null;
  hero_cta_link: string | null;
  contact_email: string | null;
  intro_eyebrow: string | null;
  intro_title: string | null;
  intro_body: string | null;
  features_eyebrow: string | null;
  features_title: string | null;
  closer_eyebrow: string | null;
  closer_title: string;
  closer_body: string | null;
  closer_primary_cta_label: string | null;
  closer_primary_cta_link: string | null;
  closer_secondary_cta_label: string | null;
  closer_secondary_cta_link: string | null;
  features: ProgramFeature[];
  sections: {
    id?: number;
    eyebrow: string | null;
    title: string | null;
    body: string | null;
    display_order: number;
  }[];
};

export type ProgramPageSummary = {
  id: number;
  slug: string;
  is_published: boolean;
  hero_title: string;
};

export async function listAdminProgramPages(
  token: string,
): Promise<ProgramPageSummary[]> {
  const res = await fetch(`${API_URL}/admin/pages`, {
    cache: "no-store",
    headers: adminHeaders(token),
  });
  if (!res.ok) await throwAdminCmsError(res, "Failed to list program pages");
  return res.json() as Promise<ProgramPageSummary[]>;
}

export async function getAdminProgramPage(
  token: string,
  pageId: number,
): Promise<ProgramPage> {
  const res = await fetch(`${API_URL}/admin/pages/${pageId}`, {
    cache: "no-store",
    headers: adminHeaders(token),
  });
  if (!res.ok) await throwAdminCmsError(res, "Failed to load program page");
  return res.json() as Promise<ProgramPage>;
}

export async function putAdminProgramPage(
  token: string,
  pageId: number,
  body: Omit<ProgramPage, "id">,
): Promise<ProgramPage> {
  const res = await fetch(`${API_URL}/admin/pages/${pageId}`, {
    method: "PUT",
    headers: adminHeaders(token),
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) await throwAdminCmsError(res, "Failed to save program page");
  return res.json() as Promise<ProgramPage>;
}

export type { Testimonial };
