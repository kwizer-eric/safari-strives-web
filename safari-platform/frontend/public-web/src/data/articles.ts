export type ArticleCategory =
  | "Ecosystem"
  | "The Hub"
  | "Ventures"
  | "Green Lab"
  | "Founder Story";

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

export const fieldNotesPage = {
  eyebrow: "Field Notes",
  headline: "Stories from the ground.",
  subhead:
    "Dispatches from Rubavu — on ventures, the hub, the lab, and the work of making local enterprise visible.",
  heroImage:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920&q=80",
  heroImageAlt: "Notebook and pen on a desk",
} as const;

export const articles: Article[] = [
  {
    id: "rubavu-msmes",
    title: "Why Secondary Cities Like Rubavu Need Venture Infrastructure",
    excerpt:
      "Entrepreneurs in secondary cities are already building. What they lack is the infrastructure, tools, and support systems that help ventures scale.",
    date: "June 12, 2026",
    category: "Ecosystem",
    author: "Safari Strives Team",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?w=1920&q=80",
    imageAlt: "A woman standing in front of a group of children",
    sections: [
      {
        type: "paragraph",
        text: "Rubavu is full of operating businesses. Market stalls, tailoring shops, farms, roasteries, and small manufacturers are already moving product and earning income. What is harder to find is the layer between survival and scale: the systems that help a good business look like a good business.",
      },
      {
        type: "heading",
        id: "why-secondary-cities",
        level: 2,
        text: "Why secondary cities are overlooked",
      },
      {
        type: "paragraph",
        text: "In larger cities, founders can rent coworking space, hire a designer, find a photographer, and meet investors over coffee. In Rubavu, those pieces are scattered, expensive, or simply unavailable. Founders patch together solutions — WhatsApp orders, handwritten receipts, product photos taken on a cracked phone screen.",
      },
      {
        type: "quote",
        text: "Talent is not missing in secondary cities. The missing piece is infrastructure — space, tools, records, and visibility.",
      },
      {
        type: "heading",
        id: "what-founders-are-missing",
        level: 2,
        text: "What founders are missing today",
      },
      {
        type: "paragraph",
        text: "Most ventures in secondary cities are not failing for lack of effort. They are constrained by missing infrastructure: reliable workspace, production tools, media capacity, and operator-led support that turns daily work into visible, repeatable enterprise.",
      },
      {
        type: "heading",
        id: "key-gaps",
        level: 3,
        text: "Key gaps we see on the ground:",
      },
      {
        type: "list",
        items: [
          "No shared space with internet, tools, and packaging equipment",
          "Weak product presentation — photography, labels, and buyer-ready materials",
          "Informal records that make growth and grants harder to justify",
          "Limited mentorship from operators who have run real businesses",
        ],
      },
      {
        type: "heading",
        id: "how-safari-strives-responds",
        level: 2,
        text: "How Safari Strives responds",
      },
      {
        type: "paragraph",
        text: "Safari Strives exists to close that gap. Not by replacing what founders already know, but by adding the missing infrastructure: a hub with internet and tools, a media room for product storytelling, operator-led mentorship, and a lab that demonstrates what disciplined enterprise looks like in practice.",
      },
      {
        type: "heading",
        id: "final-thoughts",
        level: 2,
        text: "Final thoughts",
      },
      {
        type: "paragraph",
        text: "Secondary cities do not need another pitch competition. They need conditions — reliable space, visible brands, production records, and buyer-ready presentation. That is the work we are building, one venture at a time.",
      },
    ],
  },
  {
    id: "hub-launch",
    title: "Inside the Hub: Tools, Studio, and Space for Founders",
    excerpt:
      "Workspace, internet, production tools, packaging, and a media studio in one place for founders who could not buy the equipment alone.",
    date: "May 28, 2026",
    category: "The Hub",
    author: "Safari Strives Team",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    imageAlt: "Modern workspace hub",
    sections: [
      {
        type: "paragraph",
        text: "When a founder in Rubavu needs product photos, where do they go? When they need labels printed, packaging sealed, or a quiet room to meet a buyer — what is available? For most, the answer is improvisation.",
      },
      {
        type: "heading",
        id: "what-the-hub-includes",
        level: 2,
        text: "What the hub includes",
      },
      {
        type: "paragraph",
        text: "The Safari Strives Hub brings those missing pieces into one place. Founders' lounge with reliable internet. A media room for photos, short videos, and buyer-facing content. Production and packaging tools that no single small business could justify buying alone.",
      },
      {
        type: "quote",
        text: "The hub is not an office. It is part of the intervention.",
      },
      {
        type: "heading",
        id: "hub-capabilities",
        level: 3,
        text: "Capabilities under one roof:",
      },
      {
        type: "list",
        items: [
          "Founders' lounge with stable internet and shared desktops",
          "Media room for product photography and short-form video",
          "Printers, sealers, scales, and heat press for packaging",
          "Quiet space for buyer meetings and mentor sessions",
        ],
      },
      {
        type: "heading",
        id: "built-into-the-accelerator",
        level: 2,
        text: "Built into the accelerator",
      },
      {
        type: "paragraph",
        text: "We designed the hub as an extension of the accelerator. Founders do not just receive advice here; they produce work here. Labels get printed. Lookbooks get shot. Records get kept on shared desktops with stable power and connectivity.",
      },
      {
        type: "heading",
        id: "why-it-matters",
        level: 2,
        text: "Why it matters",
      },
      {
        type: "paragraph",
        text: "The next generation of scalable Rwandan enterprises needs more than guidance. It needs space, tools, visibility, and structure — under one roof.",
      },
    ],
  },
  {
    id: "cohort-one",
    title: "Meet the First Cohort: Four Ventures, One Support Cycle",
    excerpt:
      "Four operating ventures. One four-month support cycle. Capacity first, capital last as a grant when ventures are ready to grow.",
    date: "May 15, 2026",
    category: "Ventures",
    author: "Safari Strives Team",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    imageAlt: "First cohort venture founders",
    sections: [
      {
        type: "paragraph",
        text: "The first Safari Strives cohort is not a classroom. It is four operating ventures — cosmetics, decor, farming, fashion — each with real customers and real constraints. The accelerator wraps structure around businesses that already exist.",
      },
      {
        type: "heading",
        id: "the-support-cycle",
        level: 2,
        text: "The support cycle",
      },
      {
        type: "paragraph",
        text: "Over four months, each founder works through a support cycle: clarify the offer, improve presentation, tighten records, and build buyer relationships that repeat. Milestone-based grants arrive when there is evidence — not when there is a slide deck.",
      },
      {
        type: "quote",
        text: "Capacity first. Capital last — as a grant when ventures are ready to grow.",
      },
      {
        type: "heading",
        id: "escaping-the-commodity-trap",
        level: 2,
        text: "Escaping the commodity trap",
      },
      {
        type: "paragraph",
        text: "What unites the cohort is not sector. It is the commodity trap: businesses that work hard but look interchangeable on the shelf. Our job is to help each venture make its value visible — through packaging, photography, pricing discipline, and brand clarity.",
      },
      {
        type: "heading",
        id: "growing-carefully",
        level: 2,
        text: "Growing carefully",
      },
      {
        type: "paragraph",
        text: "This is the beginning of a portfolio we intend to grow carefully. Fewer ventures, deeper support, measurable progress.",
      },
    ],
  },
  {
    id: "packaging-lessons",
    title: "What Loose Eggs Taught Us About Packaging",
    excerpt:
      "At the Green Enterprise Lab, selling eggs loose meant buyers compared price and nothing else. Packaging changed the conversation.",
    date: "April 30, 2026",
    category: "Green Lab",
    author: "Safari Strives Team",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1580918577344-fe0a66733a2a?w=800&q=80",
    imageAlt: "Packaged farm products on a shelf",
    sections: [
      {
        type: "paragraph",
        text: "The Green Enterprise Lab runs a real poultry operation — not a simulation. For months, eggs went out loose: no brand, no count guarantee, no story. Buyers haggled on price because there was nothing else to evaluate.",
      },
      {
        type: "heading",
        id: "packaging-changes-the-conversation",
        level: 2,
        text: "Packaging changes the conversation",
      },
      {
        type: "paragraph",
        text: "We started packaging. Standard counts, clean cartons, labels with the farm name and collection date. The cost added a few francs per unit. The effect was larger: shops could display the product. Buyers could remember the name. Repeat orders became possible.",
      },
      {
        type: "quote",
        text: "When products look the same, customers only compare prices.",
      },
      {
        type: "heading",
        id: "lessons-for-the-portfolio",
        level: 2,
        text: "Lessons for the portfolio",
      },
      {
        type: "paragraph",
        text: "The same logic applies across the portfolio. Manure processed into graded fertilizer instead of sold raw. Feed milled in-house instead of bought at market price without records. Every step is a lesson founders can see and copy.",
      },
      {
        type: "heading",
        id: "demonstration-not-simulation",
        level: 2,
        text: "Demonstration, not simulation",
      },
      {
        type: "paragraph",
        text: "The lab funds the hub and accelerator, but its deeper role is demonstration — proof that disciplined operations and visible products change how local markets respond.",
      },
    ],
  },
];

export function getArticleById(id: string): Article | undefined {
  return articles.find((article) => article.id === id);
}

export function getFeaturedArticle(): Article {
  return articles[0];
}

export function getOtherArticles(id: string, limit = 3): Article[] {
  return articles.filter((article) => article.id !== id).slice(0, limit);
}

export const articleCategories: ArticleCategory[] = [
  "Ecosystem",
  "The Hub",
  "Ventures",
  "Green Lab",
  "Founder Story",
];
