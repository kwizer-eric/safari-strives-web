export type AboutValue = {
  title: string;
  body: string;
};

export type AboutPerson = {
  id: string;
  name: string;
  role: string;
  bio: string;
  location: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export type AboutPartner = {
  id: string;
  name: string;
  type: string;
  description: string;
  highlight?: string;
};

export const aboutPage = {
  hero: {
    eyebrow: "About Safari Strives",
    headline: "Every Person, Every Opportunity.",
    subhead:
      "A nonprofit enterprise hub building the infrastructure secondary-city founders need to scale — starting in Rubavu, Rwanda.",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80",
    imageAlt: "Community members and founders gathered together",
  },
  mission: {
    eyebrow: "Our mission",
    title: "Help ventures escape the commodity trap.",
    paragraphs: [
      "Our mission is to help promising ventures escape the commodity trap: when a business looks like every other business, customers only compare prices. Safari Strives helps entrepreneurs make their value visible.",
      "In secondary cities like Rubavu, founders are already working — selling, hiring, and taking risks. What is missing is not talent. It is infrastructure: space, tools, records, media capacity, and operator-led support that turns hard work into scalable enterprise.",
      "We build conditions, not just advice. The hub, the accelerator, and the Green Enterprise Lab work together so founders can learn from real operating systems and present their businesses professionally to buyers.",
    ],
    values: [
      {
        title: "Infrastructure first",
        body: "Reliable space, internet, production tools, and media capacity — the equipment and environment founders could not assemble alone.",
      },
      {
        title: "Operator-led support",
        body: "Mentorship from people who have managed cash flow, inventory, production, and costs in their own enterprises.",
      },
      {
        title: "Visible value",
        body: "Packaging, photography, records, and brand clarity that help customers choose on quality — not price alone.",
      },
    ] satisfies AboutValue[],
  },
  team: {
    eyebrow: "Team",
    title: "The people building the hub.",
    intro:
      "A cross-border team connecting Rubavu operations with U.S. nonprofit leadership, program design, and partner relationships.",
  },
  board: {
    eyebrow: "Board",
    title: "Governance and stewardship.",
    intro:
      "Our board provides fiduciary oversight, strategic guidance, and accountability as Safari Strives grows its programs and partnerships.",
  },
  partners: {
    eyebrow: "Partners",
    title: "Institutions that believe in the work.",
    intro:
      "Safari Strives is supported by academic partners, funders, and local institutions that share our conviction: secondary cities deserve venture infrastructure.",
  },
  closer: {
    title: "Build with us.",
    body: "Whether you are a founder, mentor, funder, or partner — there is a place in this work.",
    primaryCta: { label: "Apply to the accelerator", href: "http://localhost:3002/login" },
    secondaryCta: { label: "Contact the team", href: "mailto:safaristrives@gmail.com" },
  },
} as const;

export const teamMembers: AboutPerson[] = [
  {
    id: "director",
    name: "Program Leadership",
    role: "Executive Director",
    location: "U.S. · Rwanda",
    bio: "Leads Safari Strives strategy, nonprofit governance, and the bridge between Rubavu operations and international partners.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
    imageAlt: "Executive director portrait",
    featured: true,
  },
  {
    id: "country-director",
    name: "Rubavu Operations",
    role: "Country Director, Rwanda",
    location: "Rubavu, Rwanda",
    bio: "Oversees daily hub operations, local partnerships, and the relationship between Safari Strives and the Rubavu founder community.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    imageAlt: "Country director portrait",
  },
  {
    id: "program-lead",
    name: "Accelerator Team",
    role: "Program Lead, Venture Accelerator",
    location: "Rubavu, Rwanda",
    bio: "Runs the four-month cohort cycle — milestones, mentor matching, and the capacity-first path that precedes grant support.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    imageAlt: "Program lead portrait",
  },
  {
    id: "hub-manager",
    name: "Hub & Lab",
    role: "Hub & Green Enterprise Lab Manager",
    location: "Rubavu, Rwanda",
    bio: "Manages the hub's tools, media room, and the lab's poultry and waste-to-value operations that demonstrate disciplined enterprise.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    imageAlt: "Hub manager portrait",
  },
  {
    id: "media-lead",
    name: "Brand & Media",
    role: "Media & Brand Lead",
    location: "Rubavu, Rwanda",
    bio: "Helps ventures produce product photography, labels, and buyer-facing content that makes local businesses recognizable.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
    imageAlt: "Media lead portrait",
  },
];

export const boardMembers: AboutPerson[] = [
  {
    id: "board-chair",
    name: "Board Chair",
    role: "Chair, Board of Directors",
    location: "United States",
    bio: "Provides strategic leadership and governance oversight for Safari Strives as a registered nonprofit enterprise hub.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    imageAlt: "Board chair portrait",
  },
  {
    id: "board-treasurer",
    name: "Board Treasurer",
    role: "Treasurer",
    location: "United States",
    bio: "Oversees financial stewardship, reporting, and the responsible deployment of grant and partner funding.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    imageAlt: "Board treasurer portrait",
  },
  {
    id: "board-secretary",
    name: "Board Secretary",
    role: "Secretary",
    location: "United States",
    bio: "Maintains board records, compliance documentation, and the organizational memory of Safari Strives governance.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    imageAlt: "Board secretary portrait",
  },
  {
    id: "advisor-enterprise",
    name: "Enterprise Advisor",
    role: "Advisor, Enterprise Development",
    location: "East Africa · U.S.",
    bio: "Brings operating experience in MSME growth, agricultural value chains, and market-facing brand development.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0111f7cbe7?w=800&q=80",
    imageAlt: "Enterprise advisor portrait",
  },
];

export const partners: AboutPartner[] = [
  {
    id: "yale",
    name: "Yale University",
    type: "Academic partner",
    description:
      "Supports Safari Strives research, program design, and the bridge between academic insight and field operations in Rubavu.",
    highlight: "$45,000 in funding",
  },
  {
    id: "north-central",
    name: "North Central College",
    type: "Academic partner",
    description:
      "Partners on student engagement, cross-cultural learning, and capacity building for the Safari Strives nonprofit model.",
    highlight: "$17,500 in funding",
  },
  {
    id: "local-institutions",
    name: "Rubavu Institutions",
    type: "Local partner",
    description:
      "Shops, schools, clinics, and municipal stakeholders who connect founders to buyers, training pathways, and community trust.",
  },
  {
    id: "mentor-network",
    name: "Practitioner Mentors",
    type: "Program partner",
    description:
      "Operators and sector specialists who mentor cohort ventures on production, finance, branding, and buyer relationships.",
  },
  {
    id: "funder-allies",
    name: "Philanthropic Allies",
    type: "Funding partner",
    description:
      "Donors and grantmakers who believe secondary cities deserve the same venture infrastructure as capital hubs.",
  },
  {
    id: "hub-users",
    name: "Hub Community",
    type: "Community partner",
    description:
      "Founders, applicants, and alumni who use the hub, contribute feedback, and shape how Safari Strives evolves on the ground.",
  },
];

export const aboutSections = [
  { id: "mission", label: "Our Mission" },
  { id: "team", label: "Team" },
  { id: "board", label: "Board" },
  { id: "partners", label: "Partners" },
] as const;
