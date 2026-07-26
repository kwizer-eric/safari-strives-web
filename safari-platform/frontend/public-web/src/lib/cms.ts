import { DEFAULT_BACKEND_URL } from "@safari/shared";
import type { Article } from "@/types/content";
import type { Testimonial } from "@/types/content";

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

type CollectionItems<T> = { items: T[] };

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
      // Admin edits should show up on the public site within a minute.
      next: init?.method && init.method !== "GET" ? undefined : { revalidate: 60 },
      cache: init?.method && init.method !== "GET" ? "no-store" : undefined,
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

export async function patchAdminCmsPage(
  token: string,
  pageId: number,
  body: { payload?: HomePayload; title?: string; is_published?: boolean },
): Promise<CmsPage<HomePayload>> {
  const res = await fetch(`${API_URL}/admin/cms/pages/${pageId}`, {
    method: "PATCH",
    headers: adminHeaders(token),
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) await throwAdminCmsError(res, "Failed to update CMS page");
  return res.json() as Promise<CmsPage<HomePayload>>;
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

export async function patchAdminCmsCollection(
  token: string,
  collectionId: number,
  body: {
    payload?: CollectionItems<Testimonial> | CollectionItems<Article>;
    label?: string;
    is_published?: boolean;
  },
): Promise<CmsCollection> {
  const res = await fetch(`${API_URL}/admin/cms/collections/${collectionId}`, {
    method: "PATCH",
    headers: adminHeaders(token),
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    await throwAdminCmsError(res, "Failed to update CMS collection");
  }
  return res.json() as Promise<CmsCollection>;
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
