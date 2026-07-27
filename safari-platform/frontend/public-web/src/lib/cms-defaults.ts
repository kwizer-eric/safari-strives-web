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
  applyUrl: "/applicant/login",
  locations: [],
  social: {
    linkedin: "#",
    facebook: "#",
    instagram: "#",
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
  footerColumns: {
    programs: {
      title: "Programs",
      links: [
        { label: "Venture Accelerator", href: "/our-model" },
        { label: "Green Enterprise Lab", href: "/green-enterprise-lab" },
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
    heroVideo: "",
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
  board: { eyebrow: "", title: "Board", intro: "" },
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
  heroImage: "",
  heroImageAlt: "",
  mission: {
    eyebrow: "",
    body: "",
    ctaLabel: "",
    ctaHref: "#",
  },
};

const PROGRAM_TITLES: Record<string, string> = {
  "our-model": "Venture Accelerator",
  "green-enterprise-lab": "Green Enterprise Lab",
  "the-hub": "The Hub",
};

export function defaultModelPage(slug: string): ModelPageContent {
  const title = PROGRAM_TITLES[slug] ?? slug.replace(/-/g, " ");
  return {
    hero: {
      headline: { line1: title, line2: "" },
      subhead: { line1: "" },
      heroVideo: "",
      image: "",
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
