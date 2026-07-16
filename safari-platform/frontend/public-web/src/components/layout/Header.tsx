"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button, Container, Logo } from "@safari/ui";
import { APP_URLS, cn } from "@safari/shared";
import { navLinks, site } from "@/data/site";
import { MobileMenu } from "@/components/layout/MobileMenu";

type HeaderProps = {
  /** Light-background pages: dark nav + pill bar from first paint */
  solid?: boolean;
};

export function Header({ solid = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <>
      <header className="fixed inset-x-0 top-0 z-30 pt-4">
        <Container>
          <div
            className={cn(
              "flex items-center justify-between gap-4 transition-all duration-300",
              isSolid
                ? "rounded-[var(--radius-card)] bg-background px-4 py-3 shadow-sm md:px-6"
                : "py-2",
            )}
          >
            <Logo src={site.logo} alt={site.name} />

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
                    isSolid
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
                href={APP_URLS.applicantLogin}
                variant="secondary"
                className={cn(
                  "hidden sm:inline-flex",
                  !isSolid && "border-white/40 text-white hover:bg-white/10",
                )}
              >
                Apply Now
              </Button>
              <Button
                href={site.donateHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="hidden sm:inline-flex"
              >
                Donate
              </Button>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className={cn(
                  "rounded-full p-2 transition-colors lg:hidden",
                  isSolid
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
