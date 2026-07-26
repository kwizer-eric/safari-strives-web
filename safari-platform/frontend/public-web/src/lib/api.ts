import { DEFAULT_BACKEND_URL } from "@safari/shared";

// DEFAULT_BACKEND_URL has no /api/v1 suffix (it's shared with the demo
// api-client package, which targets a different route shape).
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? `${DEFAULT_BACKEND_URL}/api/v1`;

export type PageFeatureResponse = {
  id: number;
  title: string;
  description: string;
  display_order: number;
  icon: string | null;
  image_url: string | null;
};

export type PageSectionResponse = {
  id: number;
  eyebrow: string | null;
  title: string | null;
  body: string | null;
  display_order: number;
};

export type PageResponse = {
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

  features: PageFeatureResponse[];
  sections: PageSectionResponse[];
};

/**
 * Server-side fetch of a published page by slug. Returns null on 404 (missing
 * or unpublished) or network failure so callers can trigger notFound() instead
 * of crashing the build when the API is unreachable.
 */
export async function getPage(slug: string): Promise<PageResponse | null> {
  try {
    const res = await fetch(`${API_URL}/pages/${slug}`, {
      // no-store: do not statically prerender at build time (Railway has no API yet).
      cache: "no-store",
    });

    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch page '${slug}': ${res.status}`);
    }

    return res.json() as Promise<PageResponse>;
  } catch {
    return null;
  }
}
