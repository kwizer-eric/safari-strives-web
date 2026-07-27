import { notFound } from "next/navigation";
import type {
  AboutPagePayload,
  AboutPartner,
  AboutPerson,
  Article,
  ModelPageContent,
  SiteSettings,
  Testimonial,
  Venture,
  VenturesPagePayload,
} from "@/types/content";
import { getPage, type PageResponse } from "@/lib/api";
import {
  getPublishedCmsCollection,
  getPublishedCmsPage,
  latestArticles,
} from "@/lib/cms";
import {
  DEFAULT_ABOUT,
  DEFAULT_SITE,
  DEFAULT_VENTURES_PAGE,
  defaultModelPage,
} from "@/lib/cms-defaults";
import { looksLikeImageUrl } from "@/lib/media-url";

/** Missing/empty collection → [] (never take the site down). */
function readItems<T>(
  collection: { payload?: { items?: T[] } } | null,
): T[] {
  const items = collection?.payload?.items;
  return Array.isArray(items) ? items : [];
}

/** Always returns SiteSettings — merges CMS onto defaults. */
export async function getSiteSettings(): Promise<SiteSettings> {
  const collection =
    await getPublishedCmsCollection<Partial<SiteSettings>>("site");
  const payload = collection?.payload;

  return {
    name: payload?.name?.trim() || DEFAULT_SITE.name,
    logo: payload?.logo ?? DEFAULT_SITE.logo,
    logoWhite: payload?.logoWhite ?? DEFAULT_SITE.logoWhite,
    tagline: payload?.tagline ?? DEFAULT_SITE.tagline,
    description: payload?.description ?? DEFAULT_SITE.description,
    email: payload?.email ?? DEFAULT_SITE.email,
    donateHref: payload?.donateHref ?? DEFAULT_SITE.donateHref,
    applyUrl: payload?.applyUrl ?? DEFAULT_SITE.applyUrl,
    locations: payload?.locations ?? DEFAULT_SITE.locations,
    social: payload?.social ?? DEFAULT_SITE.social,
    navLinks:
      Array.isArray(payload?.navLinks) && payload.navLinks.length > 0
        ? payload.navLinks
        : DEFAULT_SITE.navLinks,
    ourModelLinks: payload?.ourModelLinks ?? DEFAULT_SITE.ourModelLinks,
    footerColumns: payload?.footerColumns ?? DEFAULT_SITE.footerColumns,
  };
}

export async function getAboutContent(): Promise<{
  page: AboutPagePayload;
  team: AboutPerson[];
  partners: AboutPartner[];
}> {
  const [page, teamCol, partnersCol] = await Promise.all([
    getPublishedCmsPage<AboutPagePayload>("about"),
    getPublishedCmsCollection<{ items: AboutPerson[] }>("team-members"),
    getPublishedCmsCollection<{ items: AboutPartner[] }>("partners"),
  ]);

  const pagePayload =
    page?.payload?.hero && page.payload.mission
      ? page.payload
      : DEFAULT_ABOUT;

  // Keep partners even without logos — seed often ships names only.
  const partners = readItems(partnersCol).map((partner) => ({
    ...partner,
    href: partner.href?.trim() || "#",
    logo: partner.logo?.trim() || "",
  }));

  return {
    page: pagePayload,
    team: readItems(teamCol),
    partners,
  };
}

export async function getVenturesContent(): Promise<{
  page: VenturesPagePayload;
  ventures: Venture[];
}> {
  const [page, venturesCol] = await Promise.all([
    getPublishedCmsPage<VenturesPagePayload>("ventures"),
    getPublishedCmsCollection<{ items: Venture[] }>("ventures"),
  ]);

  return {
    page: page?.payload?.headline
      ? {
          ...page.payload,
          heroImage:
            page.payload.heroImage?.trim() ||
            page.payload.heroVideo?.trim() ||
            DEFAULT_VENTURES_PAGE.heroImage,
          heroImageAlt:
            page.payload.heroImageAlt?.trim() ||
            DEFAULT_VENTURES_PAGE.heroImageAlt,
        }
      : DEFAULT_VENTURES_PAGE,
    ventures: readItems(venturesCol),
  };
}

export async function getVentureById(id: string): Promise<{
  page: VenturesPagePayload;
  venture: Venture;
  others: Venture[];
}> {
  const { page, ventures } = await getVenturesContent();
  const venture = ventures.find((item) => item.id === id);
  if (!venture) notFound();
  return {
    page,
    venture,
    others: ventures.filter((item) => item.id !== id).slice(0, 3),
  };
}

export async function getArticles(): Promise<Article[]> {
  const collection = await getPublishedCmsCollection<{ items: Article[] }>(
    "articles",
  );
  return readItems(collection);
}

export async function getArticleById(id: string): Promise<{
  article: Article;
  related: Article[];
}> {
  const articles = await getArticles();
  const article = articles.find((item) => item.id === id);
  if (!article) notFound();
  return {
    article,
    related: latestArticles(
      articles.filter((item) => item.id !== id),
      3,
    ),
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const collection = await getPublishedCmsCollection<{ items: Testimonial[] }>(
    "testimonials",
  );
  return readItems(collection);
}

function toModelPageContent(page: PageResponse): ModelPageContent {
  const titleParts = page.hero_title.split(/\n+/).map((part) => part.trim());
  const closerParts = (page.closer_body ?? "")
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const introParagraphs = (page.intro_body ?? "")
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const mediaUrl = page.hero_video_url ?? "";
  const isImage = looksLikeImageUrl(mediaUrl);

  return {
    hero: {
      headline: {
        line1: titleParts[0] || page.hero_title,
        line2: titleParts[1] || "",
      },
      subhead: {
        line1: page.hero_subhead ?? page.hero_body ?? "",
      },
      // Video is primary; only treat clearly-photo URLs as still backgrounds.
      heroVideo: isImage ? "" : mediaUrl,
      image: isImage ? mediaUrl : "",
      imageAlt: page.hero_media_alt ?? page.hero_title,
    },
    audience: {
      title: page.intro_title ?? "",
      paragraphs: introParagraphs,
    },
    differentiators: {
      title: {
        line1: page.features_title ?? "",
        line2: "",
      },
      items: [...page.features]
        .sort((a, b) => a.display_order - b.display_order)
        .map((feature) => ({
          title: feature.title,
          body: feature.description,
        })),
    },
    closer: {
      title: page.closer_title,
      body: {
        line1: closerParts[0] ?? page.closer_body ?? "",
        line2: closerParts[1],
      },
      primaryCta:
        page.closer_primary_cta_label && page.closer_primary_cta_link
          ? {
              label: page.closer_primary_cta_label,
              href: page.closer_primary_cta_link,
            }
          : undefined,
      secondaryCta:
        page.closer_secondary_cta_label && page.closer_secondary_cta_link
          ? {
              label: page.closer_secondary_cta_label,
              href: page.closer_secondary_cta_link,
            }
          : undefined,
    },
  };
}

export async function getProgramPage(
  slug: string,
): Promise<ModelPageContent> {
  const page = await getPage(slug);
  if (!page) return defaultModelPage(slug);
  const content = toModelPageContent(page);
  // Empty CMS media → keep title from API but use slug photo fallback.
  if (!content.hero.heroVideo && !content.hero.image) {
    const fallback = defaultModelPage(slug);
    return {
      ...content,
      hero: {
        ...content.hero,
        image: fallback.hero.image,
        imageAlt: content.hero.imageAlt || fallback.hero.imageAlt,
      },
    };
  }
  return content;
}
