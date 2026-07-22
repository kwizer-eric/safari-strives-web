import type { ModelPageContent } from "@/data/model-page";
import { site } from "@/data/site";

export const ventureAcceleratorPage: ModelPageContent = {
  hero: {
    headline: {
      line1: "The Venture",
      line2: "Accelerator",
    },
    subhead: {
      line1:
        "A four-month, execution-focused program for operating entrepreneurs in Rwanda's secondary cities who are ready",
      line2: "to strengthen their businesses and grow.",
    },
    heroVideo: "/videos/about-hero.mp4",
    image:
      "https://images.unsplash.com/photo-1535745318714-da922ca9cc81?w=1920&q=80",
    imageAlt: "Founders working and building in Rubavu",
  },
  audience: {
    title: "Who Is This For",
    paragraphs: [
      "The Venture Accelerator is for founders already selling, serving customers, and running real businesses outside the capital. We help them strengthen what they have already built through hands-on execution, accountability, and practical support.",
    ],
  },
  differentiators: {
    title: {
      line1: "Why Our Model",
      line2: "Is Different",
    },
    items: [
      {
        title: "Founder-Led Growth",
        body: "Founders lead the work, identifying constraints, researching solutions, testing ideas, and making evidence-based decisions, while learning through peer critique, shared problem-solving, and regular pitching.",
      },
      {
        title: "Practitioner-Led Support",
        body: "We operate in the same community and face many of the same business risks. Our support is shaped by firsthand experience managing cash flow, production, inventory, customers, and growth.",
      },
      {
        title: "Milestone-Based Support",
        body: "Funding follows execution. Founders receive support as they complete verified milestones, demonstrate progress, and show how capital will strengthen the business.",
      },
      {
        title: "Global Expert Network",
        body: "Founders engage with operators, accountants, designers, professors, technical experts, and business practitioners, bringing expertise and networks closer to entrepreneurs in secondary cities.",
      },
      {
        title: "Evidence-Informed Design",
        body: "Our model draws from research on effective accelerators, then localizes those principles for operating businesses in Rubavu, combining mentorship, accountability, practical tools, market testing, and measurable progress.",
      },
    ],
  },
  closer: {
    title: "Join Us",
    body: {
      line1:
        "Apply to join the Venture Accelerator for hands-on execution,",
      line2: "accountability, and practical support.",
    },
    primaryCta: {
      label: "Apply Here",
      href: site.applyUrl,
    },
  },
};
