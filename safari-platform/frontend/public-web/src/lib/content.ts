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

function requireItems<T>(
  collection: { payload?: { items?: T[] } } | null,
  key: string,
): T[] {
  const items = collection?.payload?.items;
  if (!Array.isArray(items) || items.length === 0) {
    notFound();
  }
  return items;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const collection = await getPublishedCmsCollection<Partial<SiteSettings>>("site");
  const payload = collection?.payload;
  if (!payload?.name || !payload.navLinks || !payload.footerColumns) {
    notFound();
  }

  return {
    name: payload.name,
    logo: payload.logo ?? "/logo/logo.png",
    logoWhite: payload.logoWhite ?? "/logo/logowhite.png",
    tagline: payload.tagline ?? { line1: "", line2: "" },
    description: payload.description ?? "",
    email: payload.email ?? "",
    donateHref: payload.donateHref ?? "#",
    applyUrl: payload.applyUrl ?? "/applicant/login",
    locations: payload.locations ?? [],
    social: payload.social ?? {
      linkedin: "#",
      facebook: "#",
      instagram: "#",
    },
    navLinks: payload.navLinks,
    ourModelLinks: payload.ourModelLinks ?? [
      {
        title: "Venture Accelerator",
        description: "Model-to-market support for founders in Rubavu",
        href: "/our-model",
      },
      {
        title: "Green Enterprise Lab",
        description: "Hands-on enterprise building on the ground",
        href: "/green-enterprise-lab",
      },
      {
        title: "The Hub",
        description: "Shared workspace and community for local businesses",
        href: "/the-hub",
      },
    ],
    footerColumns: payload.footerColumns,
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

  if (!page?.payload?.hero || !page.payload.mission) notFound();

  // Only show partners with a real logo URL — seed items ship with empty logos
  // and we must not fall back to the Safari mark (that duplicated six times).
  const partners = requireItems(partnersCol, "partners")
    .map((partner) => ({
      ...partner,
      href: partner.href?.trim() || "#",
      logo: partner.logo?.trim() || "",
    }))
    .filter((partner) => Boolean(partner.logo));

  return {
    page: page.payload,
    team: requireItems(teamCol, "team-members"),
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
  if (!page?.payload?.headline) notFound();
  return {
    page: page.payload,
    ventures: requireItems(venturesCol, "ventures"),
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
  return requireItems(collection, "articles");
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
  return requireItems(collection, "testimonials");
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
  const looksLikeImage = /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(mediaUrl);

  return {
    hero: {
      headline: {
        line1: titleParts[0] || page.hero_title,
        line2: titleParts[1] || "",
      },
      subhead: {
        line1: page.hero_subhead ?? page.hero_body ?? "",
      },
      heroVideo: looksLikeImage ? "" : mediaUrl,
      image: looksLikeImage ? mediaUrl : "",
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
  if (!page) notFound();
  return toModelPageContent(page);
}
