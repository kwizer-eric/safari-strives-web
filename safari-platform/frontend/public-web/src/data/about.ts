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
  logo: string;
  href: string;
  logoOnDark?: boolean;
  logoOnWhite?: boolean;
  highlight?: string;
};

export const aboutPage = {
  hero: {
    eyebrow: "About Safari Strives",
    headline: {
      line1: "We Don't Advise",
      line2: "From a Distance.",
    },
    watchVideoLabel: "Founder video",
    subhead:
      "Safari Strives operates, tests, and builds alongside the founders\nwe support in Rubavu.",
    image:
      "https://images.unsplash.com/photo-1535745318714-da922ca9cc81?w=1920&q=80",
    imageAlt: "Man smiling while taking photo near a sunflower",
    heroVideo: "/videos/about-hero.mp4",
    videoId: "njiqUJcuVc4",
    videoStart: 15,
    legalNote:
      "Safari Strives Inc. is a registered not-for-profit corporation in the State of Illinois, EIN 39-4883848, and a 501(c)(3) public charity recognized by the IRS.",
  },
  mission: {
    label: "Our Journey",
    paragraphs: [
      "Safari Strives began with a question: How do people move from survival into sustainable growth?",
      "For four years, we tested different approaches on the ground in Gisenyi, from livestock and cash transfers to in-kind financing and direct support. Some created short-term gains, but none solved the underlying business constraints.",
      "Then we realized something simple: people were already working and selling. What was missing were the systems, tools, capital, and market access that help businesses grow.",
      "That insight shaped Safari Strives today: building the infrastructure that helps local businesses grow revenue, create jobs, and move beyond survival.",
    ],
    practitionerLed: {
      label: "Practitioner-Led",
      body: "We operate in the same community and face many of the same risks as the entrepreneurs we support. That firsthand experience shapes practical support grounded in real decisions, real constraints, and what it actually takes to grow a business here.",
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
      "Our team combines local expertise with global vision to create\nsustainable change in communities.",
  },
  board: {
    eyebrow: "Board",
    title: "Board of Directors",
    intro:
      "Safari Strives is governed by a board that provides oversight, accountability, and strategic direction for our work in Rwanda and the United States.",
  },
  partners: {
    eyebrow: "Partners",
    title: "Partners Who Make Growth Possible",
    intro: "",
  },
  closer: {
    title: "Become a partner",
    body: "Safari Strives is building a lean, revenue-driven model rooted in Rubavu. Our enterprise supports core operations, while partners help expand founder support, strengthen infrastructure, and open new opportunities. We welcome partners who bring expertise, networks, market access, technical support, or growth and windfall capital.",
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
    id: "yale-tsai",
    name: "Yale-Tsai City",
    type: "Academic partner",
    logo: "/partners/tsai-city.png",
    href: "https://city.yale.edu/",
    logoOnWhite: true,
    description:
      "Supports research, program design, and the bridge between academic insight and field operations in Rwanda.",
  },
  {
    id: "north-central",
    name: "North Central College",
    type: "Academic partner",
    logo: "/partners/north-central-college.svg",
    href: "https://www.northcentralcollege.edu/",
    description:
      "Partners on student engagement, cross-cultural learning, and capacity building for the Safari Strives nonprofit model.",
  },
  {
    id: "church-brethren",
    name: "Church of the Brethren",
    type: "Local partner",
    logo: "/partners/church-of-the-brethren.png",
    href: "https://www.brethren.org/",
    logoOnDark: true,
    description:
      "Manages our work on the ground, verifies households, identifies women entrepreneurs, and witnesses distributions.",
  },
];

export const aboutSections = [
  { id: "mission", label: "Our Mission" },
  { id: "team", label: "Team" },
  { id: "board", label: "Board" },
  { id: "partners", label: "Partners" },
] as const;
