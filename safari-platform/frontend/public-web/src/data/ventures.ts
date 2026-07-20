import { APP_URLS } from "@safari/shared";

export type VentureHighlight = {
  title: string;
  body: string;
};

export type Venture = {
  id: string;
  founder: string;
  ventureName: string;
  category: string;
  location?: string;
  image: string;
  imageAlt: string;
  tagline: string;
  story: string[];
  highlights: VentureHighlight[];
};

export const ventures: Venture[] = [
  {
    id: "umubyeyi",
    founder: "Umubyeyi",
    ventureName: "Isano Naturals",
    category: "Cosmetics",
    tagline: "Natural skincare made visible, not just sold by the jar.",
    story: [
      "Isano Naturals began with Umubyeyi blending oils and butters for customers who wanted products that felt trustworthy and locally made. The formulas were strong, but on the shelf they looked like every other jar — no story, no label system, no reason to pay more.",
      "Through Safari Strives, Umubyeyi is building a brand customers can recognize: consistent packaging, product photos, ingredient clarity, and a story that explains why these cosmetics are worth choosing.",
    ],
    highlights: [
      {
        title: "Product presentation",
        body: "Professional labels, photography, and packaging that help buyers see quality before they compare prices.",
      },
      {
        title: "Ingredient trust",
        body: "Clear sourcing and usage information so customers understand what they are buying and why it works.",
      },
      {
        title: "Repeat buyers",
        body: "Moving from one-off market sales to customers who come back because the brand feels reliable.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1530785602389-07594beb8b73?w=800&q=80",
    imageAlt: "Founder Umubyeyi preparing natural cosmetics",
  },
  {
    id: "ijisho-artspace",
    founder: "Uwase Chantal",
    ventureName: "IJISHO Artspace",
    category: "Handcrafted decor",
    location: "Rubavu",
    tagline: "Handcrafted decor with a story buyers can see and remember.",
    story: [
      "IJISHO Artspace turns local materials into decor pieces with character — woven baskets, wall art, and home accents made in Rubavu. Chantal's craft is strong, but in open markets every stall looks similar and buyers default to the lowest price.",
      "Safari Strives is helping IJISHO build a visible brand: styled product shots, consistent collections, and buyer-facing content that shows the work behind each piece.",
    ],
    highlights: [
      {
        title: "Collection design",
        body: "Curated product lines instead of one-off pieces, so buyers know what IJISHO stands for.",
      },
      {
        title: "Visual storytelling",
        body: "Photos and short clips that show process, materials, and the makers behind the work.",
      },
      {
        title: "Buyer channels",
        body: "Relationships with shops, hotels, and design buyers who want decor with a clear local identity.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1612928414075-bc722ade44f1?w=800&q=80",
    imageAlt: "Handcrafted decor from IJISHO Artspace",
  },
  {
    id: "byusa-farm",
    founder: "Byusa Armstrong",
    ventureName: "Iterambere Farm",
    category: "Pig farming",
    location: "Rubavu",
    tagline: "A pig farm run with records, discipline, and a plan to scale.",
    story: [
      "Iterambere Farm is Armstrong's operating livestock business in Rubavu. He already sells pork to local buyers, but like many small farms, growth was limited by informal records, inconsistent feed costs, and no clear brand behind the product.",
      "With Safari Strives, Armstrong is tightening production systems — feed tracking, weight records, buyer lists — and building a farm identity customers can trust beyond today's market price.",
    ],
    highlights: [
      {
        title: "Production records",
        body: "Monthly tracking of feed, weight gain, mortality, and output so decisions are based on numbers.",
      },
      {
        title: "Cost control",
        body: "Clearer input costs and yield data to protect margins as the herd grows.",
      },
      {
        title: "Market positioning",
        body: "Packaging and buyer communication that move the farm beyond commodity pork sales.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?w=800&q=80",
    imageAlt: "Byusa Armstrong on his pig farm",
  },
  {
    id: "sunbake",
    founder: "Eric Habimana",
    ventureName: "Sunbake Sourdough",
    category: "Food & bakery",
    location: "Rubavu",
    tagline: "Artisan bread with packaging, consistency, and repeat delivery routes.",
    story: [
      "Sunbake Sourdough started as Eric's home oven and loyal neighbors. Demand grew, but loose loaves in open trays made it hard to charge for quality or supply shops reliably.",
      "The venture is now building a bakery identity — branded bags, standard loaf sizes, production schedules, and buyer lists that move Sunbake from weekend sales to weekday supply.",
    ],
    highlights: [
      {
        title: "Product consistency",
        body: "Standard recipes, batch sizes, and quality checks so every loaf matches the last.",
      },
      {
        title: "Branded packaging",
        body: "Labels and bags that signal freshness and make the bread easy to display.",
      },
      {
        title: "Delivery routes",
        body: "Scheduled drops to cafés and shops instead of waiting for walk-in demand.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1523477800337-966dbabe060b?w=800&q=80",
    imageAlt: "Sunbake sourdough loaves ready for delivery",
  },
];

export const venturesPage = {
  eyebrow: "Meet the ventures",
  headline: "Entrepreneurs building beyond survival.",
  heroVideo: "/videos/ventures-hero.mp4",
  heroImage:
    "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=1920&q=80",
  heroImageAlt: "People collaborating at computers in an office",
  mission: {
    eyebrow: "Our mission",
    body: "Our mission is to help promising ventures escape the commodity trap. When a business looks like every other business, customers only compare prices. Safari Strives helps entrepreneurs make their value visible.",
    ctaLabel: "Apply Here",
    ctaHref: APP_URLS.applicantLogin,
  },
} as const;

export function getVentureById(id: string): Venture | undefined {
  return ventures.find((venture) => venture.id === id);
}

export function getOtherVentures(id: string, limit = 3): Venture[] {
  return ventures.filter((venture) => venture.id !== id).slice(0, limit);
}
