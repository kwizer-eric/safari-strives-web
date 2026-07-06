import { home } from "@/data/home";
import { ProgramScrollSection } from "@/components/sections/ProgramScrollSection";

export function Explore() {
  const { explore } = home;

  return (
    <ProgramScrollSection title={explore.title} pillars={explore.pillars} />
  );
}
