export const site = {
  name: "Safari Strives",
  logo: "/logo/logo.png",
  tagline: {
    line1: "Every Person,",
    line2: "Every Opportunity",
  },
  description: "A nonprofit enterprise hub in Rubavu, Rwanda.",
  email: "safaristrives@gmail.com",
  locations: ["Rubavu, Rwanda", "Crestwood, Illinois"],
  legal: "Safari Strives is a registered 501(c)(3) nonprofit organization.",
  social: {
    facebook: "#",
    instagram: "#",
    linkedin: "#",
    x: "#",
  },
} as const;

export const navLinks = [
  { label: "Ventures", href: "/ventures" },
  { label: "Our Model", href: "/our-model" },
  { label: "Field Notes", href: "/#insights" },
  { label: "About", href: "/#about" },
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
      { label: "Our Mission", href: "#about" },
      { label: "Team", href: "#" },
      { label: "Board", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  insights: {
    title: "Insights",
    links: [
      { label: "The Field Notes", href: "#insights" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "#contact" },
    ],
  },
} as const;
