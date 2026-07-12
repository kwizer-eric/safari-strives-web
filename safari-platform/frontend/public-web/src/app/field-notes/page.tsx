import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FieldNotesGrid } from "@/components/sections/FieldNotesGrid";

export const metadata: Metadata = {
  title: "Field Notes | Safari Strives",
  description:
    "Stories from the ground in Rubavu — on ventures, the hub, the lab, and making local enterprise visible.",
};

export default function FieldNotesPage() {
  return (
    <>
      <Header solid />
      <main>
        <FieldNotesGrid />
      </main>
      <Footer />
    </>
  );
}
