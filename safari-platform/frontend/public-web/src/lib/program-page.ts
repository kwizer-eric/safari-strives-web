import type { PageResponse } from "@/lib/api";

export type ProgramFeature = {
  eyebrow?: string;
  title: string;
  body: string;
};

export type ProgramSection = {
  eyebrow?: string;
  title?: string;
  paragraphs: string[];
};

export type ProgramPageContent = {
  slug: string;
  hero: {
    eyebrow: string;
    headline: string;
    subhead?: string;
    body?: string;
    videoPoster: string;
    videoPosterAlt: string;
    videoCaption?: string;
    primaryCta?: { label: string; href: string };
    contactEmail?: string;
  };
  intro?: ProgramSection;
  features: {
    eyebrow?: string;
    title: string;
    items: ProgramFeature[];
  };
  extraSections?: ProgramSection[];
  closer: {
    eyebrow?: string;
    title: string;
    body?: string;
    primaryCta?: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
  };
};

/** Multi-paragraph body fields are stored as paragraphs joined by a blank
 * line ("\n\n"); split back into the array the frontend renders. */
function toParagraphs(body: string | null): string[] {
  if (!body) return [];
  return body.split("\n\n").filter(Boolean);
}

function toCta(label: string | null, href: string | null) {
  if (!label || !href) return undefined;
  return { label, href };
}

/** Maps the flat API response shape into the nested shape the presentational
 * program-page components expect (same shape programs-content.ts used to
 * hardcode). */
export function toProgramPageContent(page: PageResponse): ProgramPageContent {
  const intro = page.intro_body
    ? {
        eyebrow: page.intro_eyebrow ?? undefined,
        title: page.intro_title ?? undefined,
        paragraphs: toParagraphs(page.intro_body),
      }
    : undefined;

  const extraSections = page.sections.length
    ? page.sections
        .slice()
        .sort((a, b) => a.display_order - b.display_order)
        .map((section) => ({
          eyebrow: section.eyebrow ?? undefined,
          title: section.title ?? undefined,
          paragraphs: toParagraphs(section.body),
        }))
    : undefined;

  return {
    slug: page.slug,
    hero: {
      eyebrow: page.hero_eyebrow ?? "",
      headline: page.hero_title,
      subhead: page.hero_subhead ?? undefined,
      body: page.hero_body ?? undefined,
      videoPoster: page.hero_video_url ?? "",
      videoPosterAlt: page.hero_media_alt ?? "",
      videoCaption: page.hero_media_caption ?? undefined,
      primaryCta: toCta(page.hero_cta_label, page.hero_cta_link),
      contactEmail: page.contact_email ?? undefined,
    },
    intro,
    features: {
      eyebrow: page.features_eyebrow ?? undefined,
      title: page.features_title ?? "",
      items: page.features
        .slice()
        .sort((a, b) => a.display_order - b.display_order)
        .map((feature) => ({
          title: feature.title,
          body: feature.description,
        })),
    },
    extraSections,
    closer: {
      eyebrow: page.closer_eyebrow ?? undefined,
      title: page.closer_title,
      body: page.closer_body ?? undefined,
      primaryCta: toCta(page.closer_primary_cta_label, page.closer_primary_cta_link),
      secondaryCta: toCta(page.closer_secondary_cta_label, page.closer_secondary_cta_link),
    },
  };
}
