export type Article = {
  id: string;
  title: string;
  date: string;
  image: string;
  imageAlt: string;
};

export const articles: Article[] = [
  {
    id: "rubavu-msmes",
    title: "Why Secondary Cities Like Rubavu Need Venture Infrastructure",
    date: "June 12, 2026",
    image:
      "https://images.unsplash.com/photo-1559027617-c4810631b32a?w=800&q=80",
    imageAlt: "Entrepreneurs working in Rubavu",
  },
  {
    id: "hub-launch",
    title: "Inside the Hub: Tools, Studio, and Space for Founders",
    date: "May 28, 2026",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    imageAlt: "Modern workspace hub",
  },
  {
    id: "cohort-one",
    title: "Meet the First Cohort: Four Ventures, One Support Cycle",
    date: "May 15, 2026",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80",
    imageAlt: "First cohort venture founders",
  },
];
