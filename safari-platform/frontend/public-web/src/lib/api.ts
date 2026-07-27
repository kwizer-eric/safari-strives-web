import { getApiBaseUrl } from "@/lib/api-base-url";

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
 * Server-side fetch of a published page by slug.
 * Returns null on 404, network failure, or non-OK so marketing routes stay up.
 */
export async function getPage(slug: string): Promise<PageResponse | null> {
  const url = `${getApiBaseUrl()}/pages/${slug}`;
  let res: Response;
  try {
    res = await fetch(url, {
      // no-store: do not statically prerender at build time (Railway has no API yet).
      cache: "no-store",
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error(`[pages] unreachable ${url}: ${detail}`);
    return null;
  }

  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    console.error(`[pages] failed to fetch '${slug}': ${res.status}`);
    return null;
  }

  return res.json() as Promise<PageResponse>;
}
