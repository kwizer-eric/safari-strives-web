"use client";

import { useEffect, useState } from "react";
import { Container } from "@safari/ui";
import { cn } from "@safari/shared";
import { Navbar5 } from "@/components/ui/navbar-5";

type HeaderProps = {
  /** Light-background pages: dark nav + pill bar from first paint */
  solid?: boolean;
};

export function Header({ solid = false }: HeaderProps) {
  const [scrolled, setScrolled] = useState(solid);

  useEffect(() => {
    if (solid) return;

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const isSolid = solid || scrolled;

  return (
    <header className="fixed inset-x-0 top-0 z-30 pt-4">
      <Container>
        <div
          className={cn(
            "transition-all duration-300",
            isSolid
              ? "rounded-[var(--radius-card)] bg-background px-4 py-3 shadow-sm md:px-6"
              : "py-2",
          )}
        >
          <Navbar5 isSolid={isSolid} />
        </div>
      </Container>
    </header>
  );
}
