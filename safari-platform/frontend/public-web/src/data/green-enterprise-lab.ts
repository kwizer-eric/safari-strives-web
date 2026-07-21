import type { ModelPageContent } from "@/data/model-page";
import { site } from "@/data/site";

export const greenEnterpriseLabPage: ModelPageContent = {
  hero: {
    headline: {
      line1: "Green",
      line2: "Enterprise Lab",
    },
    subhead: {
      line1:
        "Commercializing practical solutions for local enterprise,",
      line2: "food systems, and waste-to-value growth.",
    },
    heroVideo: "/videos/about-hero.mp4",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1920&q=80",
    imageAlt: "Poultry operations at the Green Enterprise Lab",
  },
  audience: {
    title: "About the lab",
    paragraphs: [
      "The Green Enterprise Lab begins with a practical question: what happens when a community does not only train entrepreneurs, but also builds real enterprises that entrepreneurs can learn from?",
      "The lab serves two roles.",
      "First, it is Safari Strives' demonstration platform, where founders can learn from real operating systems.",
      "Second, it is a cash-flow engine designed to help support the hub, the Venture Accelerator, and daily operations.",
    ],
  },
  differentiators: {
    title: {
      line1: "What We Are",
      line2: "Testing",
    },
    items: [
      {
        title: "Market-Ready Products",
        body: "Turning farm output into products buyers can recognize, trust, and purchase through stronger grading, packaging, labeling, and presentation.",
      },
      {
        title: "Circular Value",
        body: "Transforming poultry waste into consistent, expert-guided solid and liquid organic fertilizers for farmers and agricultural buyers.",
      },
      {
        title: "Cost Discipline and Repeat Buyers",
        body: "Using feed processing, production tracking, and stronger buyer relationships to control costs, improve efficiency, and build reliable demand.",
      },
      {
        title: "Practical Farm Innovation",
        body: "Exploring practical irrigation, farm monitoring, production records, and AI and data-assisted tools designed around the realities and knowledge of local farmers.",
      },
    ],
  },
  closer: {
    title: "Join Us",
    body: {
      line1:
        "Partner with the Green Enterprise Lab to grow real enterprise,",
      line2:
        "food systems, and waste-to-value solutions that teach by doing.",
    },
    primaryCta: {
      label: "Partner with the Lab",
      href: `mailto:${site.email}`,
    },
  },
};
