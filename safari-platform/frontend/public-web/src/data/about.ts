export type AboutLocation = {
  label: string;
  region: string;
  place: string;
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
    headline: {
      line1: "Why Safari Strives",
      line2: "Exists",
    },
    watchVideoLabel: "Watch video",
    subhead:
      "Safari Strives fosters economic independence in Rwanda through sustainable enterprises, job creation, and zero-interest microloans for women.",
    image:
      "https://images.unsplash.com/photo-1535745318714-da922ca9cc81?w=1920&q=80",
    imageAlt: "Man smiling while taking photo near a sunflower",
    videoId: "njiqUJcuVc4",
    videoStart: 15,
    legalNote:
      "Safari Strives Inc. is a registered not-for-profit corporation in the State of Illinois, EIN 39-4883848, and a 501(c)(3) public charity recognized by the IRS.",
  },
  mission: {
    label: "Case study",
    paragraphs: [
      "World Bank President Ajay Banga has called jobs one of the surest paths out of poverty. In Rwanda, many people have not waited for jobs to appear. They have built their own through shops, tailoring, poultry, local products, and businesses carried through unstable conditions.",
      "But effort alone does not build a scalable business. Rwanda's business landscape remains 87% informal, showing how many enterprises still lack the growth basics: systems, pricing, tools, visibility, buyer access, and leadership discipline.",
      "The deeper issue is concentration. In 2024, 60.7% of Rwanda's formal businesses were in Kigali, compared with 9.7% in the Western Province, where Rubavu sits. The strongest hubs, accelerators, mentors, buyers, and funding pipelines still sit too close to main cities. Safari Strives builds the missing infrastructure in Rubavu, helping founders produce better, sell better, grow revenue, and make their value visible.",
    ],
    practitionerLed: {
      label: "Practitioner-Led",
      body: "Safari Strives builds the conditions around operating entrepreneurs, businesses that already have effort, demand, and local traction, and helps them become organized, visible, and ready for growth. We run our own enterprise on the same street we serve, managing cash flow, inventory, production, and costs for three years. That is what tells us which conditions actually matter.",
    },
    locations: [
      {
        label: "Head office",
        region: "Rwanda",
        place: "Rubavu, Rwanda",
      },
      {
        label: "Corporate Headquarters",
        region: "United States",
        place: "Crestwood, Illinois",
      },
    ] satisfies AboutLocation[],
  },
  team: {
    eyebrow: "Team",
    title: "Our Team",
    intro:
      "Meet the dedicated individuals who make Safari Strives' mission possible. Our team combines local expertise with global vision to create sustainable change in communities.",
  },
  partners: {
    eyebrow: "Partners",
    title: "Institutions that believe in the work.",
    intro:
      "Safari Strives is supported by local institutions, academic partners, and international collaborators who share our conviction that communities deserve reliable pathways to economic independence.",
  },
  closer: {
    title: "Become a partner",
    body: "We welcome partners with expertise, networks, market access, and growth capital to help us reach more founders and expand the Green Enterprise Lab in Rubavu.",
    primaryCta: {
      label: "Partner with Safari Strives",
      href: "mailto:safaristrives@gmail.com",
    },
  },
} as const;

export const teamMembers: AboutPerson[] = [
  {
    id: "elie-imani",
    name: "Elie Imani",
    role: "Executive Director & Co-Founder",
    location: "U.S. · Rwanda",
    bio: "Leads Safari Strives strategy and strengthens the model through graduate research in African Studies at Yale University.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
    imageAlt: "Elie Imani portrait",
  },
  {
    id: "martin-sheehan",
    name: "Martin Sheehan",
    role: "Quality Director",
    location: "United States",
    bio: "Oversees program quality, standards, and the consistency of Safari Strives' field operations.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    imageAlt: "Martin Sheehan portrait",
  },
  {
    id: "rafael-peres",
    name: "Rafael Peres",
    role: "Economic Strategy & Co-founder",
    location: "United States",
    bio: "Shapes economic strategy and the long-term financial model behind Safari Strives' enterprises.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0111f7cbe7?w=800&q=80",
    imageAlt: "Rafael Peres portrait",
  },
  {
    id: "manshimwe-josue",
    name: "Manshimwe Josue",
    role: "Operations Director",
    location: "Rubavu, Rwanda",
    bio: "Manages day-to-day operations on the ground and coordinates the Rwanda team's delivery.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    imageAlt: "Manshimwe Josue portrait",
  },
  {
    id: "carolina-alfaro",
    name: "Carolina Alfaro",
    role: "Quality Director",
    location: "United States",
    bio: "Supports quality assurance across programs, partnerships, and community-facing work.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    imageAlt: "Carolina Alfaro portrait",
  },
  {
    id: "ashraf-kamwithi",
    name: "Ashraf Kamwithi",
    role: "Brand & Strategy Director",
    location: "East Africa",
    bio: "Leads brand development and strategic communications for Safari Strives' ventures and programs.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    imageAlt: "Ashraf Kamwithi portrait",
  },
  {
    id: "hakizimana-joel",
    name: "Hakizimana Joel",
    role: "Advisor",
    location: "Rubavu, Rwanda",
    bio: "Provides local advisory support and community insight for Safari Strives' Rwanda operations.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    imageAlt: "Hakizimana Joel portrait",
  },
  {
    id: "emmanuel-agyekum",
    name: "Emmanuel Agyekum",
    role: "Tech Integration Director",
    location: "United States",
    bio: "Drives technology integration and systems that help Safari Strives scale its impact reliably.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    imageAlt: "Emmanuel Agyekum portrait",
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
    id: "church-brethren",
    name: "Church of the Brethren Rwanda",
    type: "Local partner",
    description:
      "Manages our work on the ground, verifies households, identifies women entrepreneurs, and witnesses distributions.",
  },
  {
    id: "yale",
    name: "Yale University",
    type: "Academic partner",
    description:
      "Supports research, program design, and the bridge between academic insight and field operations in Rwanda.",
    highlight: "$45,000 in funding",
  },
  {
    id: "student-network",
    name: "International Student Research Teams",
    type: "Program partner",
    description:
      "Student teams from Rwanda, Kenya, Tanzania, Portugal, and the United States contribute research and on-the-ground capacity.",
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
    id: "rubavu-institutions",
    name: "Rubavu Institutions",
    type: "Community partner",
    description:
      "Shops, schools, clinics, and municipal stakeholders who connect founders to buyers, training pathways, and community trust.",
  },
  {
    id: "funder-allies",
    name: "Philanthropic Allies",
    type: "Funding partner",
    description:
      "Donors and grantmakers who believe communities deserve reliable pathways to economic independence.",
  },
];

export const aboutSections = [
  { id: "mission", label: "Our Mission" },
  { id: "team", label: "Team" },
  { id: "partners", label: "Partners" },
] as const;
