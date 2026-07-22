export const site = {
  name: "Safari Strives",
  logo: "/logo/logo.png",
  logoWhite: "/logo/logowhite.png",
  tagline: {
    line1: "Every Person,",
    line2: "Every Opportunity",
  },
  description: "A nonprofit enterprise hub.",
  email: "safaristrives@gmail.com",
  donateHref:
    "https://www.paypal.com/donate/?hosted_button_id=69TB3LC2P9C7A",
  /** Default Apply Now / Apply Here destination (Google Form, Typeform, etc.). */
  applyUrl: "/applicant/login",
  locations: ["Rubavu, Rwanda", "Crestwood, Illinois"],
  social: {
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
} as const;

export const APPLY_URL_STORAGE_KEY = "safari-apply-url";

export const footerSocial = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Facebook", href: site.social.facebook },
  { label: "Instagram", href: site.social.instagram },
] as const;

export const navLinks = [
  { label: "Ventures", href: "/ventures" },
  { label: "Our Model", href: "/our-model" },
  { label: "Blog", href: "/field-notes" },
  { label: "About", href: "/about" },
] as const;

export const ourModelLinks = [
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
] as const;

export const footerColumns = {
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
      { label: "Our Mission", href: "/about#mission" },
      { label: "Team", href: "/about#team" },
      { label: "Partners", href: "/about#partners" },
    ],
  },
  insights: {
    title: "Insights",
    links: [
      { label: "Blog", href: "/field-notes" },
      { label: "Contact", href: "#contact" },
    ],
  },
} as const;
