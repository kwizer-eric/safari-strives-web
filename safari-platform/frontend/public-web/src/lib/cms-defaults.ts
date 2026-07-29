import type {
  AboutPagePayload,
  ModelPageContent,
  SiteSettings,
  VenturesPagePayload,
} from "@/types/content";
import type { HomePayload } from "@/lib/cms";

/** Minimal chrome so Header/Footer never crash when CMS `site` is missing. */
export const DEFAULT_SITE: SiteSettings = {
  name: "Safari Strives",
  logo: "/logo/logo.png",
  logoWhite: "/logo/logowhite.png",
  tagline: { line1: "", line2: "" },
  description: "",
  email: "",
  donateHref: "#",
  applyUrl: "",
  locations: [],
  social: {
    linkedin: "https://www.linkedin.com/company/safari-strives",
    youtube: "https://www.youtube.com/channel/UCP1uOh3zroBYxl_5PFYKKrw",
    instagram: "https://www.instagram.com/safaristrives/",
  },
  navLinks: [
    { label: "About", href: "/about" },
    { label: "Ventures", href: "/ventures" },
    { label: "Our Model", href: "/our-model" },
    { label: "Field Notes", href: "/field-notes" },
  ],
  ourModelLinks: [
    {
      title: "Venture Accelerator",
      description: "Model-to-market support for founders in Rubavu",
      href: "/our-model",
    },
    {
      title: "Generative Enterprise Lab",
      description: "Hands-on enterprise building on the ground",
      href: "/green-enterprise-lab",
    },
    {
      title: "The Hub",
      description: "Shared workspace and community for local businesses",
      href: "/the-hub",
    },
  ],
  footerColumns: {
    programs: {
      title: "Programs",
      links: [
        { label: "Venture Accelerator", href: "/our-model" },
        { label: "Generative Enterprise Lab", href: "/green-enterprise-lab" },
        { label: "The Hub", href: "/the-hub" },
      ],
    },
    about: {
      title: "About",
      links: [
        { label: "About", href: "/about" },
        { label: "Ventures", href: "/ventures" },
      ],
    },
    insights: {
      title: "Insights",
      links: [{ label: "Field Notes", href: "/field-notes" }],
    },
  },
};

/** Empty-safe homepage shell — sections omit when arrays are empty. */
export const DEFAULT_HOME: HomePayload = {
  hero: {
    headline: "Safari Strives",
    body: "",
    image: "",
    imageAlt: "",
    heroVideo:
      "https://res.cloudinary.com/efzpryhb/video/upload/v1785062087/Opener_bxjmis.mp4",
  },
  explore: {
    title: "",
    pillars: [],
  },
  inMotion: {
    eyebrow: "",
    title: "",
    cards: [],
  },
  featuredInsights: {
    title: "Field Notes",
  },
  finalCta: {
    line1: "",
    line2: "",
  },
};

export const DEFAULT_ABOUT: AboutPagePayload = {
  hero: {
    eyebrow: "",
    headline: { line1: "About", line2: "Safari Strives" },
    watchVideoLabel: "",
    subhead: "",
    image: "",
    imageAlt: "",
    heroVideo: "",
    videoId: "",
    videoStart: 0,
    legalNote: "",
  },
  mission: {
    label: "",
    paragraphs: [],
    practitionerLed: { label: "", body: "" },
    locations: [],
  },
  team: { eyebrow: "", title: "Team", intro: "" },
  board: { eyebrow: "Board", title: "Our Board", intro: "" },
  partners: { eyebrow: "", title: "Partners", intro: "" },
  closer: {
    title: "",
    body: "",
    primaryCta: { label: "", href: "#" },
  },
};

export const DEFAULT_VENTURES_PAGE: VenturesPagePayload = {
  eyebrow: "",
  headline: "Ventures",
  heroVideo: "",
  heroImage:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80",
  heroImageAlt: "Entrepreneurs collaborating",
  mission: {
    eyebrow: "",
    body: "",
    ctaLabel: "",
    ctaHref: "#",
  },
};

const PROGRAM_TITLES: Record<string, string> = {
  "our-model": "Venture Accelerator",
  "green-enterprise-lab": "Generative Enterprise Lab",
  "the-hub": "The Hub",
};

const PROGRAM_FALLBACK_IMAGES: Record<string, string> = {
  "our-model":
    "https://images.unsplash.com/photo-1634936016780-65f6a77ebdd4?w=1920&q=80",
  "green-enterprise-lab":
    "https://images.unsplash.com/photo-1580918577344-fe0a66733a2a?w=1920&q=80",
  "the-hub":
    "https://images.unsplash.com/photo-1675434301763-594b4d0c5819?w=1920&q=80",
};

export function defaultModelPage(slug: string): ModelPageContent {
  const title = PROGRAM_TITLES[slug] ?? slug.replace(/-/g, " ");
  const image = PROGRAM_FALLBACK_IMAGES[slug] ?? "";
  return {
    hero: {
      headline: { line1: title, line2: "" },
      subhead: { line1: "" },
      heroVideo: "",
      image,
      imageAlt: title,
    },
    audience: {
      title: "",
      paragraphs: [],
    },
    differentiators: {
      title: { line1: "", line2: "" },
      items: [],
    },
    closer: {
      title: "",
      body: { line1: "" },
    },
  };
}
