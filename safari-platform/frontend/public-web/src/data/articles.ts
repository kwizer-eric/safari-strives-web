export type ArticleCategory =
  | "Ecosystem"
  | "The Hub"
  | "Ventures"
  | "Green Lab"
  | "Founder Story";

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
  body: string[];
  pullQuote?: string;
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
      "https://images.unsplash.com/photo-1559027617-c4810631b32a?w=800&q=80",
    imageAlt: "Entrepreneurs working in Rubavu",
    pullQuote:
      "Talent is not missing in secondary cities. The missing piece is infrastructure — space, tools, records, and visibility.",
    body: [
      "Rubavu is full of operating businesses. Market stalls, tailoring shops, farms, roasteries, and small manufacturers are already moving product and earning income. What is harder to find is the layer between survival and scale: the systems that help a good business look like a good business.",
      "In larger cities, founders can rent coworking space, hire a designer, find a photographer, and meet investors over coffee. In Rubavu, those pieces are scattered, expensive, or simply unavailable. Founders patch together solutions — WhatsApp orders, handwritten receipts, product photos taken on a cracked phone screen.",
      "Safari Strives exists to close that gap. Not by replacing what founders already know, but by adding the missing infrastructure: a hub with internet and tools, a media room for product storytelling, operator-led mentorship, and a lab that demonstrates what disciplined enterprise looks like in practice.",
      "Secondary cities do not need another pitch competition. They need conditions — reliable space, visible brands, production records, and buyer-ready presentation. That is the work we are building, one venture at a time.",
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
    pullQuote:
      "The hub is not an office. It is part of the intervention.",
    body: [
      "When a founder in Rubavu needs product photos, where do they go? When they need labels printed, packaging sealed, or a quiet room to meet a buyer — what is available? For most, the answer is improvisation.",
      "The Safari Strives Hub brings those missing pieces into one place. Founders' lounge with reliable internet. A media room for photos, short videos, and buyer-facing content. Production and packaging tools — printers, sealers, scales, heat press — that no single small business could justify buying alone.",
      "We designed the hub as an extension of the accelerator. Founders do not just receive advice here; they produce work here. Labels get printed. Lookbooks get shot. Records get kept on shared desktops with stable power and connectivity.",
      "The next generation of scalable Rwandan enterprises needs more than guidance. It needs space, tools, visibility, and structure — under one roof.",
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
    pullQuote:
      "Capacity first. Capital last — as a grant when ventures are ready to grow.",
    body: [
      "The first Safari Strives cohort is not a classroom. It is four operating ventures — cosmetics, decor, farming, fashion — each with real customers and real constraints. The accelerator wraps structure around businesses that already exist.",
      "Over four months, each founder works through a support cycle: clarify the offer, improve presentation, tighten records, and build buyer relationships that repeat. Milestone-based grants arrive when there is evidence — not when there is a slide deck.",
      "What unites the cohort is not sector. It is the commodity trap: businesses that work hard but look interchangeable on the shelf. Our job is to help each venture make its value visible — through packaging, photography, pricing discipline, and brand clarity.",
      "This is the beginning of a portfolio we intend to grow carefully. Fewer ventures, deeper support, measurable progress.",
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
    pullQuote:
      "When products look the same, customers only compare prices.",
    body: [
      "The Green Enterprise Lab runs a real poultry operation — not a simulation. For months, eggs went out loose: no brand, no count guarantee, no story. Buyers haggled on price because there was nothing else to evaluate.",
      "We started packaging. Standard counts, clean cartons, labels with the farm name and collection date. The cost added a few francs per unit. The effect was larger: shops could display the product. Buyers could remember the name. Repeat orders became possible.",
      "The same logic applies across the portfolio. Manure processed into graded fertilizer instead of sold raw. Feed milled in-house instead of bought at market price without records. Every step is a lesson founders can see and copy.",
      "The lab funds the hub and accelerator, but its deeper role is demonstration — proof that disciplined operations and visible products change how local markets respond.",
    ],
  },
  {
    id: "mentor-sessions",
    title: "Mentor Sessions That Start With the Numbers",
    excerpt:
      "Our mentorship model begins with cash flow, inventory, and production records — not inspirational speeches.",
    date: "April 18, 2026",
    category: "Founder Story",
    author: "Safari Strives Team",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    imageAlt: "Mentor reviewing records with a founder",
    pullQuote:
      "We have operated our own enterprises for three years. We mentor from practice, not theory.",
    body: [
      "Founders in Rubavu have heard plenty of advice. What they rarely get is someone sitting with their feed costs, their margin per unit, their weekly output, and their buyer list — line by line.",
      "Safari Strives mentors are operators. We have managed inventory, negotiated with suppliers, missed payroll, and fixed packaging lines. When we meet a venture, the first questions are practical: What do you sell? To whom? At what margin? What breaks when you scale?",
      "Sessions happen at the hub, on-site at farms and workshops, and over WhatsApp when a founder sends a photo of a label proof. The goal is not inspiration. It is evidence — proof that the founder is doing the work and ready for the next milestone.",
      "That is why capacity comes before capital. Grants strengthen businesses that already show discipline. They do not rescue businesses that skip the fundamentals.",
    ],
  },
  {
    id: "commodity-trap",
    title: "Escaping the Commodity Trap",
    excerpt:
      "When every business looks the same, customers only compare prices. Here is how we help ventures make value visible.",
    date: "April 2, 2026",
    category: "Ecosystem",
    author: "Safari Strives Team",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    imageAlt: "Products displayed with clear branding",
    pullQuote:
      "Differentiation is not luxury. It is survival for small enterprises competing on thin margins.",
    body: [
      "The commodity trap is simple: when your product looks like everyone else's, the only conversation is price. Founders work harder, cut margins, and still lose buyers to the stall next door with the same unmarked jar, sack, or bolt of fabric.",
      "Escaping the trap requires visibility — packaging, photography, consistent quality signals, and a story buyers can repeat. It also requires internal discipline: records, costing, and production systems that protect margin when sales grow.",
      "Safari Strives works on both sides. The hub makes presentation possible. The accelerator adds structure. The lab demonstrates what good operations look like in a real enterprise. Ventures in the portfolio get all three.",
      "Our mission is not to make every business glamorous. It is to make every serious business recognizable — so customers choose on value, not just the lowest price.",
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
