import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutMission } from "@/components/sections/AboutMission";
import { AboutTeam } from "@/components/sections/AboutTeam";
import { AboutPartners } from "@/components/sections/AboutPartners";
import { AboutCloser } from "@/components/sections/AboutCloser";

export const metadata: Metadata = {
  title: "About | Safari Strives",
  description:
    "Learn about Safari Strives — our mission, team, and partners building economic independence in Rwanda.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <AboutMission />
        <AboutTeam />
        <AboutPartners />
        <AboutCloser />
      </main>
      <Footer />
    </>
  );
}
