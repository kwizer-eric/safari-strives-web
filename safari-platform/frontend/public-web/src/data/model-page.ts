export type ModelPageCta = {
  label: string;
  href: string;
};

export type ModelPageContent = {
  hero: {
    headline: { line1: string; line2: string };
    subhead: { line1: string; line2?: string };
    heroVideo: string;
    image: string;
    imageAlt: string;
  };
  audience: {
    title: string;
    paragraphs: string[];
  };
  differentiators: {
    title: { line1: string; line2: string };
    items: { title: string; body: string }[];
  };
  closer: {
    title: string;
    body: { line1: string; line2?: string };
    primaryCta?: ModelPageCta;
    secondaryCta?: ModelPageCta;
  };
};
