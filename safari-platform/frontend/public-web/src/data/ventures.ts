export type Venture = {
  id: string;
  founder: string;
  ventureName: string;
  category: string;
  location?: string;
  image: string;
  imageAlt: string;
};

export const ventures: Venture[] = [
  {
    id: "umubyeyi",
    founder: "Umubyeyi",
    ventureName: "Isano Naturals",
    category: "Cosmetics",
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
    ctaHref: "http://localhost:3002/login",
  },
} as const;
