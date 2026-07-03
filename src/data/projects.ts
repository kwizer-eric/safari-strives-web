export type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    id: "mexico-health",
    title: "Improving Community Health in Mexico",
    category: "Healthcare Access",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    imageAlt: "Community health initiative in Mexico",
  },
  {
    id: "india-relief",
    title: "Supporting Communities in Need in India",
    category: "Emergency Relief",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
    imageAlt: "Emergency relief efforts in India",
  },
  {
    id: "kenya-education",
    title: "Improving Healthcare Access in Kenya",
    category: "Education for All",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    imageAlt: "Education program in Kenya",
  },
];
