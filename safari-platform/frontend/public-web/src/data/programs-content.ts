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

const APPLY_URL = "http://localhost:3002/login";
const CONTACT_EMAIL = "safaristrives@gmail.com";

export const acceleratorPage: ProgramPageContent = {
  slug: "our-model",
  hero: {
    eyebrow: "The Accelerator Program",
    headline: "Interested in joining our community?",
    videoPoster:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=80",
    videoPosterAlt:
      "Founders working with a mentor during an accelerator session",
    videoCaption:
      "Short clips of founders, products in the making, mentor conversations, and hub tools in use.",
    primaryCta: { label: "Apply Here", href: APPLY_URL },
    contactEmail: CONTACT_EMAIL,
  },
  intro: {
    eyebrow: "Fueling operating entrepreneurs",
    title: "Who is this for",
    paragraphs: [
      "The Venture Accelerator is for operating entrepreneurs with real customers and a clear willingness to do the work. We do not just hand over capital — we want founders ready to build stronger systems around the business they already have.",
    ],
  },
  features: {
    eyebrow: "Our approach",
    title: "Why our model is different",
    items: [
      {
        title: "Founder-led growth",
        body: "Founders stay in charge of their business. Safari Strives adds structure, mentorship, and tools around it.",
      },
      {
        title: "Practitioner-led support",
        body: "For three years, we have operated our own enterprises — managing cash flow, inventory, production, and costs. We have tested what we build.",
      },
      {
        title: "Milestone-based support",
        body: "Support is connected to progress. Each founder must show action, evidence, and discipline before receiving deeper support. Safari Strives provides milestone-based grants, not loans, so capital strengthens the business instead of burdening it.",
      },
      {
        title: "Global expert network",
        body: "Founders receive guidance from operators, professors, accountants, designers, market-access partners, technical advisors, and business mentors.",
      },
      {
        title: "Evidence-informed design",
        body: "Safari Strives is informed by the Global Accelerator Learning Initiative's research on high-performing accelerators: strong selection, structured mentorship, network access, and measurable enterprise progress. Our model localizes those principles in Rubavu, supporting operating businesses with practical tools, accountability, and proof-building rooted in the market they serve.",
      },
    ],
  },
  closer: {
    eyebrow: "Join the cohort",
    title: "Apply to the Venture Accelerator",
    body: "Safari Strives also welcomes mentors, advisors, buyers, and partners who can help entrepreneurs scale.",
    primaryCta: { label: "Apply Here", href: APPLY_URL },
    secondaryCta: {
      label: "Become a mentor or partner",
      href: `mailto:${CONTACT_EMAIL}`,
    },
  },
};

export const gelPage: ProgramPageContent = {
  slug: "green-enterprise-lab",
  hero: {
    eyebrow: "Green Enterprise Lab",
    headline:
      "Commercializing practical solutions for local enterprise, food systems, and waste-to-value growth.",
    videoPoster:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1920&q=80",
    videoPosterAlt: "Poultry operations at the Green Enterprise Lab",
    videoCaption:
      "Short clips of poultry production, egg collection, packaging, recordkeeping, feed tracking, manure collection, product testing, and local distribution.",
  },
  intro: {
    eyebrow: "About the lab",
    title: "A demonstration platform and a cash-flow engine",
    paragraphs: [
      "The Green Enterprise Lab begins with a practical question: what happens when a community does not only train entrepreneurs, but also builds real enterprises that entrepreneurs can learn from?",
      "The lab serves two roles. First, it is Safari Strives' demonstration platform, where founders can learn from real operating systems. Second, it is a cash-flow engine designed to help support the hub, the Venture Accelerator, and daily operations.",
    ],
  },
  extraSections: [
    {
      eyebrow: "Why it matters",
      title: "Why green enterprise matters",
      paragraphs: [
        "In many local markets, small producers sell raw outputs with little differentiation. Eggs go out loose, with no packaging or brand behind them. Manure has value and gets used, but rarely as a processed, graded product. Buyers have few reasons to trust one supplier over another.",
        "The Green Enterprise Lab is built to close that gap. We package our eggs. We process manure into organic fertilizer instead of leaving it raw. We built our own feed-processing equipment rather than buying feed at market price.",
      ],
    },
  ],
  features: {
    eyebrow: "In the field",
    title: "What we are testing",
    items: [
      {
        title: "Market-ready products",
        body: "Packaging eggs, improving presentation, and using buyer-facing photos, videos, labels, and product information so local products look easier to recognize, trust, and purchase.",
      },
      {
        title: "Circular value",
        body: "Transforming poultry manure into organic fertilizer instead of leaving it as a raw input, with clearer quality, packaging, and practical use for farmers and local buyers.",
      },
      {
        title: "Cost and production discipline",
        body: "Using feed-processing equipment, production records, and monthly tracking to reduce costs, control inputs, and understand feed, yield, labor, output, waste, and cash flow.",
      },
      {
        title: "Repeat buyer channels",
        body: "Moving from one-off sales to stronger relationships with shops, institutions, restaurants, distributors, and other buyers who need reliable supply.",
      },
    ],
  },
  closer: {
    eyebrow: "In closing",
    title: "We are building businesses that teach by doing.",
    primaryCta: {
      label: "Partner with the lab",
      href: `mailto:${CONTACT_EMAIL}`,
    },
  },
};

export const hubPage: ProgramPageContent = {
  slug: "the-hub",
  hero: {
    eyebrow: "The Hub",
    headline: "A hub built for enterprise growth.",
    body: "The Safari Strives Hub gives entrepreneurs the space, tools, media support, and professional environment they need to build businesses people can trust.",
    videoPoster:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
    videoPosterAlt: "Founders working inside the Safari Strives hub",
    videoCaption:
      "Short clips of the hub, computers, founders working, media room setup, product filming, packaging, tools, meetings, and mentor sessions.",
  },
  intro: {
    eyebrow: "Main description",
    title: "Part office, part intervention",
    paragraphs: [
      "The hub is not just our office. It is part of the intervention. Entrepreneurs cannot compete seriously without reliable internet, records, tools, product photos, packaging support, and a professional place to meet buyers, mentors, and partners. Safari Strives brings those missing pieces into one place.",
    ],
  },
  features: {
    eyebrow: "Inside the hub",
    title: "What the space includes",
    items: [
      {
        title: "Founders' lounge",
        body: "A professional place for founders to work, meet, think, and exchange ideas. The Hub includes reliable internet, meeting and study spaces, desktop computers, whiteboards, projectors, and administrative support.",
      },
      {
        title: "Media room",
        body: "A dedicated room for product photos, short videos, founder interviews, social media content, buyer-facing clips, and professional storytelling.",
      },
      {
        title: "Production and packaging tools",
        body: "Tools for printing, labeling, sealing, weighing, cutting, tailoring, heat press, sublimation, and product preparation — the practical equipment founders cannot easily buy alone.",
      },
      {
        title: "Amenities",
        body: "Clean bathrooms, showers, parking, and kitchen amenities that help founders work with focus, comfort, and dignity.",
      },
    ],
  },
  closer: {
    eyebrow: "Why the hub",
    title:
      "The next generation of scalable Rwandan enterprises needs more than advice.",
    body: "It needs space, tools, visibility, and structure.",
    primaryCta: { label: "Visit the hub", href: `mailto:${CONTACT_EMAIL}` },
    secondaryCta: { label: "Apply to the Accelerator", href: APPLY_URL },
  },
};
