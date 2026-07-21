import type { ModelPageContent } from "@/data/model-page";
import { site } from "@/data/site";

export const theHubPage: ModelPageContent = {
  hero: {
    headline: {
      line1: "A Hub Built For",
      line2: "Enterprise Growth.",
    },
    subhead: {
      line1:
        "The Safari Strives Hub gives entrepreneurs in Rubavu access to the space, tools, technology, and professional environment often concentrated in larger cities.",
    },
    heroVideo: "/videos/about-hero.mp4",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80",
    imageAlt: "Founders working inside the Safari Strives hub",
  },
  audience: {
    title: "About the Hub",
    paragraphs: [
      "The hub is not just our office. It is part of the intervention. Entrepreneurs cannot compete seriously without reliable internet, records, tools, product photos, packaging support, and a professional place to meet buyers, mentors, and partners. Safari Strives brings those missing pieces into one place.",
    ],
  },
  differentiators: {
    title: {
      line1: "What the Space",
      line2: "Includes",
    },
    items: [
      {
        title: "Founders' Lounge",
        body: "A professional space for founders to work, meet, collaborate, pitch, and learn, with reliable internet, computers, shared workspaces, screens, projectors, and whiteboards.",
      },
      {
        title: "Media Room",
        body: "A dedicated space for product photography, short-form video, founder interviews, social media content, and buyer-facing materials.",
      },
      {
        title: "Production and Packaging Tools",
        body: "Shared equipment for printing, labeling, sealing, weighing, cutting, tailoring, sublimation, and product preparation.",
      },
      {
        title: "Amenities",
        body: "Clean bathrooms, showers, parking, and kitchen amenities that help founders work with focus, comfort, and dignity.",
      },
    ],
  },
  closer: {
    title: "Join Us",
    body: {
      line1:
        "The next generation of scalable Rwandan enterprises needs more than advice. It needs space, tools, visibility, and structure.",
    },
    primaryCta: {
      label: "Partner with Us",
      href: `mailto:${site.email}`,
    },
  },
};
