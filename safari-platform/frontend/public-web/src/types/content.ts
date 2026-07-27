/** Shared content types — source of truth is the CMS / program pages API. */

export type ArticleCategory =
  | "Ecosystem"
  | "The Hub"
  | "Ventures"
  | "Green Lab"
  | "Founder Story"
  | string;

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; id: string; level: 2 | 3; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
  category: ArticleCategory;
  author: string;
  readTime: string;
  sections: ArticleBlock[];
};

export type Testimonial = {
  id: string;
  role: string;
  quote: string;
  name: string;
};

export type VentureHighlight = {
  title: string;
  body: string;
};

export type Venture = {
  id: string;
  founder: string;
  ventureName: string;
  category: string;
  location?: string;
  image: string;
  imageAlt: string;
  /** Video shown when the venturist card is clicked (YouTube or direct https). */
  videoUrl?: string;
  tagline: string;
  story: string[];
  highlights: VentureHighlight[];
};

export type AboutPerson = {
  id: string;
  name: string;
  role: string;
  bio: string;
  location: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export type AboutPartner = {
  id: string;
  name: string;
  type: string;
  description: string;
  logo: string;
  href: string;
  logoOnDark?: boolean;
  logoOnWhite?: boolean;
  highlight?: string;
};

export type SiteLink = { label: string; href: string };

export type SiteSettings = {
  name: string;
  logo: string;
  logoWhite: string;
  tagline: { line1: string; line2: string };
  description: string;
  email: string;
  donateHref: string;
  applyUrl: string;
  locations: string[];
  social: {
    linkedin: string;
    youtube: string;
    instagram: string;
  };
  navLinks: SiteLink[];
  ourModelLinks: {
    title: string;
    description: string;
    href: string;
  }[];
  footerColumns: {
    programs: { title: string; links: SiteLink[] };
    about: { title: string; links: SiteLink[] };
    insights: { title: string; links: SiteLink[] };
  };
};

export type ModelPageCta = {
  label: string;
  href: string;
};

export type ModelPageContent = {
  hero: {
    headline: { line1: string; line2: string };
    subhead: { line1: string; line2?: string };
    heroVideo: string;
    image: string;
    imageAlt: string;
  };
  audience: {
    title: string;
    paragraphs: string[];
  };
  differentiators: {
    title: { line1: string; line2: string };
    items: { title: string; body: string }[];
  };
  closer: {
    title: string;
    body: { line1: string; line2?: string };
    primaryCta?: ModelPageCta;
    secondaryCta?: ModelPageCta;
  };
};

export type AboutPagePayload = {
  hero: {
    eyebrow: string;
    headline: { line1: string; line2: string };
    watchVideoLabel: string;
    subhead: string;
    image: string;
    imageAlt: string;
    heroVideo: string;
    videoId: string;
    videoStart: number;
    legalNote: string;
  };
  mission: {
    label: string;
    paragraphs: string[];
    practitionerLed: { label: string; body: string };
    locations: { label: string; region: string; place: string }[];
  };
  team: { eyebrow: string; title: string; intro: string };
  board: { eyebrow: string; title: string; intro: string };
  partners: { eyebrow: string; title: string; intro: string };
  closer: {
    title: string;
    body: string;
    primaryCta: { label: string; href: string };
  };
};

export type VenturesPagePayload = {
  eyebrow: string;
  headline: string;
  heroVideo: string;
  heroImage: string;
  heroImageAlt: string;
  mission: {
    eyebrow: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
};
