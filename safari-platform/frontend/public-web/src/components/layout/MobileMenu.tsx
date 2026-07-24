"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { Button, Logo } from "@safari/ui";
import { cn } from "@safari/shared";
import { ApplyButton } from "@/components/ui/ApplyButton";
import type { SiteSettings } from "@/types/content";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  site: SiteSettings;
};

export function MobileMenu({ isOpen, onClose, site }: MobileMenuProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-dark/50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />
      <nav
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-card p-6 shadow-xl transition-transform duration-300 sm:max-w-md",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center justify-between">
          <Logo src={site.logo} alt={site.name} />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-foreground hover:bg-cream"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="flex flex-col gap-2">
          {site.navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block rounded-lg px-3 py-3 text-lg font-medium text-foreground transition-colors hover:bg-cream"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-3 pt-8">
          <ApplyButton variant="secondary" className="w-full">
            Apply Now
          </ApplyButton>
          <Button
            href={site.donateHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="w-full"
          >
            Donate
          </Button>
        </div>
      </nav>
    </>
  );
}
