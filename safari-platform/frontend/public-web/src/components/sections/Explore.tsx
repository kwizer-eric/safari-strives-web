import { ProgramScrollSection } from "@/components/sections/ProgramScrollSection";
import type { HomePillar } from "@/lib/cms";

type ExploreProps = {
  explore: {
    title: string;
    pillars: readonly HomePillar[];
  };
};

export function Explore({ explore }: ExploreProps) {
  return (
    <ProgramScrollSection title={explore.title} pillars={explore.pillars} />
  );
}
