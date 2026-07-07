export const home = {
  hero: {
    headline:
      "Secondary cities are overlooked by the entrepreneurship ecosystem.",
    image:
      "https://images.unsplash.com/photo-1509099896299-af46ad97ff57?w=1920&q=80",
    imageAlt: "Group of people in a community",
  },
  opening: {
    title: "One business at a time.",
    body: "In secondary cities like Rubavu, entrepreneurs are already working, selling, hiring, and taking risks. Safari Strives provides the space, tools, media capacity, and operator led support that help local businesses scale.",
  },
  explore: {
    title: "Our programs",
    pillars: [
      {
        id: "accelerator",
        title: "Venture Accelerator",
        description:
          "A four-month support cycle that helps operating MSMEs become organized, visible, differentiated, and ready for growth. Capacity first. Capital last, as a grant.",
        image:
          "https://images.unsplash.com/photo-1634936016780-65f6a77ebdd4?w=800&q=80",
        imageAlt: "Group of people standing in front of a building",
        href: "/our-model",
      },
      {
        id: "lab",
        title: "Green Enterprise Lab",
        description:
          "Our own poultry and waste-to-value business. It funds the program and serves as a demo enterprise.",
        image:
          "https://images.unsplash.com/photo-1580918577344-fe0a66733a2a?w=800&q=80",
        imageAlt: "Group of people in red and brown dress",
        href: "/green-enterprise-lab",
      },
      {
        id: "hub",
        title: "The Hub",
        description:
          "Workspace, internet, production tools, packaging, and a media studio in one place. The equipment a founder could not buy alone, and an environment where founders meet buyers, mentors, and each other in person.",
        image:
          "https://images.unsplash.com/photo-1675434301763-594b4d0c5819?w=800&q=80",
        imageAlt: "Group of people sitting at desks in an office",
        href: "/the-hub",
      },
    ],
  },
  inMotion: {
    title: "In Motion",
    image:
      "https://www.brookings.edu/wp-content/uploads/2024/09/shutterstock_2342135829.jpg",
    imageAlt: "Team collaborating around a laptop in a modern workspace",
    stats: [
      { value: "$45,000", label: "Yale funding" },
      {
        value: "$17,500",
        label: "North Central College funding",
      },
      {
        value: "4,000+",
        label: "birds in current production",
      },
      {
        value: "4 ventures",
        label: "First official cohort, July to October 2026",
      },
    ],
  },
  featuredInsights: {
    title: "Featured Insights",
  },
  finalCta: {
    line1: "Talent is not missing. Infrastructure is",
    line2: "Safari Strives. Build the conditions. Scale the work.",
  },
} as const;
