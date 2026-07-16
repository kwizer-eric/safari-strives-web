import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { VenturesHero } from "@/components/sections/VenturesHero";
import { VenturesGrid } from "@/components/sections/VenturesGrid";
import { VenturesMission } from "@/components/sections/VenturesMission";

export const metadata: Metadata = {
  title: "Ventures | Safari Strives",
  description:
    "Meet the entrepreneurs building beyond survival with Safari Strives in Rubavu, Rwanda.",
};

export default function VenturesPage() {
  return (
    <>
      <Header />
      <main>
        <VenturesHero />
        <VenturesGrid />
        <VenturesMission />
      </main>
      <Footer />
    </>
  );
}
