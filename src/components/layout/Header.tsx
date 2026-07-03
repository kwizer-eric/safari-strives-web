"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { navLinks } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/layout/Container";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { cn } from "@/lib/utils";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 pt-4">
        <Container>
          <div
            className={cn(
              "flex items-center justify-between gap-4 transition-all duration-300",
              scrolled
                ? "rounded-[var(--radius-card)] bg-background px-4 py-3 shadow-sm md:px-6"
                : "py-2",
            )}
          >
          <Logo
            imageClassName={cn(
              "transition-all duration-300",
              !scrolled && "brightness-0 invert",
            )}
          />

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-10 lg:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  scrolled
                    ? "text-foreground/80 hover:text-foreground"
                    : "text-white/90 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href="#"
              variant="secondary"
              className={cn(
                "hidden sm:inline-flex",
                !scrolled && "border-white/40 text-white hover:bg-white/10",
              )}
            >
              Apply Now
            </Button>
            <Button href="#" variant="primary" className="hidden sm:inline-flex">
              Donate
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className={cn(
                "rounded-full p-2 transition-colors lg:hidden",
                scrolled
                  ? "text-foreground hover:bg-cream"
                  : "text-white hover:bg-white/10",
              )}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
