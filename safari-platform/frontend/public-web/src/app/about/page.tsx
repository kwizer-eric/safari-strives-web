import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutNav } from "@/components/sections/AboutNav";
import { AboutMission } from "@/components/sections/AboutMission";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { AboutBoard } from "@/components/sections/AboutBoard";
import { AboutPartners } from "@/components/sections/AboutPartners";
import { AboutCloser } from "@/components/sections/AboutCloser";

export const metadata: Metadata = {
  title: "About | Safari Strives",
  description:
    "Learn about Safari Strives — our mission, team, board, and partners building venture infrastructure in Rubavu, Rwanda.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutNav />
        <AboutMission />
        <AboutTeam />
        <AboutBoard />
        <AboutPartners />
        <AboutCloser />
      </main>
      <Footer />
    </>
  );
}
