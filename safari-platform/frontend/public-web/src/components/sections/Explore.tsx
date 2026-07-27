import { ProgramScrollSection } from "@/components/sections/ProgramScrollSection";
import type { HomePillar } from "@/lib/cms";

type ExploreProps = {
  explore: {
    title: string;
    pillars: readonly HomePillar[];
  };
};

export function Explore({ explore }: ExploreProps) {
  if (!explore.pillars.length) return null;
  return (
    <ProgramScrollSection title={explore.title} pillars={explore.pillars} />
  );
}
