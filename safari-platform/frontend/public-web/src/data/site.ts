export const site = {
  name: "Safari Strives",
  logo: "/logo/logo.png",
  tagline: {
    line1: "Every Person,",
    line2: "Every Opportunity",
  },
  description: "A nonprofit enterprise hub.",
  email: "safaristrives@gmail.com",
  locations: ["Rubavu, Rwanda", "Crestwood, Illinois"],
  social: {
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
} as const;

export const footerSocial = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Facebook", href: site.social.facebook },
  { label: "Instagram", href: site.social.instagram },
] as const;

export const navLinks = [
  { label: "Ventures", href: "/ventures" },
  { label: "Our Model", href: "/our-model" },
  { label: "Field Notes", href: "/field-notes" },
  { label: "About", href: "/about" },
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
      { label: "Board", href: "/about#board" },
      { label: "Partners", href: "/about#partners" },
    ],
  },
  insights: {
    title: "Insights",
    links: [
      { label: "The Field Notes", href: "/field-notes" },
      { label: "Contact", href: "#contact" },
    ],
  },
} as const;
