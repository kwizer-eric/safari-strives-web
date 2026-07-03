export type Program = {
  id: string;
  number: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const programs: Program[] = [
  {
    id: "education",
    number: 1,
    title: "Education for All",
    description:
      "We believe that education is the foundation for a better future. Our education initiatives include building schools, providing scholarships, and offering vocational training to help students and adults alike achieve their full potential.",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
    imageAlt: "Students learning in a classroom",
  },
  {
    id: "healthcare",
    number: 2,
    title: "Healthcare Access",
    description:
      "Healthcare is a basic human right. Safari Strives provides free medical services, runs mobile clinics, and trains local healthcare workers to improve the health and well-being of vulnerable communities.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    imageAlt: "Healthcare worker assisting a patient",
  },
  {
    id: "empowerment",
    number: 3,
    title: "Community Empowerment",
    description:
      "Through economic development programs, we help families and communities become self-sufficient. This includes micro-loan initiatives, skills training, and supporting small businesses.",
    image:
      "https://images.unsplash.com/photo-1559027617-c4810631b32a?w=800&q=80",
    imageAlt: "Community members working together",
  },
  {
    id: "water",
    number: 4,
    title: "Clean Water for All",
    description:
      "Access to clean water is essential for health and well-being, yet many communities still lack this basic necessity. Our Clean Water for All program builds sustainable water systems, ensuring that families have reliable access to safe drinking water.",
    image:
      "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=80",
    imageAlt: "Clean water being poured into a glass",
  },
  {
    id: "relief",
    number: 5,
    title: "Emergency Relief",
    description:
      "When disaster strikes, Safari Strives is there. From natural disasters to humanitarian crises, we provide immediate relief and long-term recovery support to help rebuild communities.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    imageAlt: "Volunteers providing emergency relief supplies",
  },
];
