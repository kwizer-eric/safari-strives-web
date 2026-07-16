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
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
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
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80",
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
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80",
    imageAlt: "Byusa Armstrong on his pig farm",
  },
  {
    id: "josydes",
    founder: "Josiane Mukamana",
    ventureName: "Josydes",
    category: "Fashion",
    location: "Rubavu",
    tagline: "Fashion with fit, finish, and a brand customers return for.",
    story: [
      "Josydes is Josiane's fashion line — tailored pieces and everyday wear made in Rubavu. She had loyal customers, but without consistent sizing charts, lookbooks, or a recognizable label, growth stayed word-of-mouth.",
      "Safari Strives supports Josydes with product photography, brand identity, and the hub tools needed to present collections professionally to shops and online buyers.",
    ],
    highlights: [
      {
        title: "Brand identity",
        body: "Labels, tags, and visual language that make Josydes recognizable at a glance.",
      },
      {
        title: "Collection drops",
        body: "Seasonal lookbooks and styled shoots so buyers see a full line, not random pieces.",
      },
      {
        title: "Retail readiness",
        body: "Pricing, sizing, and presentation standards that meet shop and boutique expectations.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
    imageAlt: "Josydes fashion pieces on display",
  },
  {
    id: "kivu-roastery",
    founder: "Aime Niyibizi",
    ventureName: "Kivu Roastery",
    category: "Specialty coffee",
    location: "Rubavu",
    tagline: "Lake Kivu coffee with origin, roast profile, and a name worth remembering.",
    story: [
      "Kivu Roastery sources and roasts coffee near Lake Kivu. Aime knew the beans were good, but sold mostly as unbranded bulk — buyers had no reason to choose his roast over the next sack.",
      "The work now is to make value visible: named blends, roast dates, packaging, and tasting notes that help cafés and retail buyers understand why Kivu Roastery is different.",
    ],
    highlights: [
      {
        title: "Origin story",
        body: "Clear sourcing and processing details that connect buyers to Lake Kivu coffee.",
      },
      {
        title: "Packaged retail",
        body: "Sealed bags with labels, roast dates, and brew guidance for shop shelves.",
      },
      {
        title: "Café partnerships",
        body: "Repeat supply relationships with restaurants and hotels that want a consistent local roast.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    imageAlt: "Kivu Roastery specialty coffee beans",
  },
  {
    id: "green-grid",
    founder: "Diane Iradukunda",
    ventureName: "GreenGrid Solar",
    category: "Clean energy",
    location: "Rubavu",
    tagline: "Solar solutions packaged for shops, clinics, and small enterprises.",
    story: [
      "GreenGrid Solar installs and maintains solar systems for small businesses around Rubavu. Diane competes in a market where many providers look the same and customers buy on price alone.",
      "Safari Strives helps GreenGrid sharpen its offer — clear service tiers, installation photos, maintenance records, and buyer education that builds trust before the invoice.",
    ],
    highlights: [
      {
        title: "Service packages",
        body: "Defined offerings for shops, homes, and institutions instead of one-size quotes.",
      },
      {
        title: "Installation proof",
        body: "Documented projects and before/after visuals that show reliable workmanship.",
      },
      {
        title: "After-sales trust",
        body: "Maintenance plans and follow-up that turn one install into long-term relationships.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1509390144018-eeaf6cc9a56b?w=800&q=80",
    imageAlt: "Solar panels installed on a small shop",
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
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    imageAlt: "Sunbake sourdough loaves ready for delivery",
  },
  {
    id: "ubwiza",
    founder: "Claudine Mukeshimana",
    ventureName: "Ubwiza Weaves",
    category: "Textiles",
    location: "Rubavu",
    tagline: "Handwoven textiles with patterns, pricing, and presentation that travel.",
    story: [
      "Ubwiza Weaves produces handwoven fabrics and finished pieces in Rubavu. Claudine's weaving skill was never the question — visibility was. Without catalog photos or a coherent collection story, buyers treated every piece as a one-off negotiation.",
      "Safari Strives helps Ubwiza document collections, photograph texture and color accurately, and reach buyers who value craft when they can see it clearly.",
    ],
    highlights: [
      {
        title: "Pattern catalog",
        body: "Named designs and colorways so buyers can reorder what they liked.",
      },
      {
        title: "Texture photography",
        body: "Close, honest product shots that show weave quality online and in lookbooks.",
      },
      {
        title: "Export-ready presentation",
        body: "Pricing sheets and collection notes for shops and design buyers beyond Rubavu.",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=800&q=80",
    imageAlt: "Handwoven textiles from Ubwiza Weaves",
  },
];

export const venturesPage = {
  eyebrow: "Meet the ventures",
  headline: "Entrepreneurs building beyond survival.",
  heroImage:
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80",
  heroImageAlt: "Founders and mentors working together in Rubavu",
  mission: {
    eyebrow: "Our mission",
    body: "Our mission is to help promising ventures escape the commodity trap: when a business looks like every other business, customers only compare prices. Safari Strives helps entrepreneurs make their value visible.",
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
