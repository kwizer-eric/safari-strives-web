"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { navLinks } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
          <Logo onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-foreground transition-colors hover:bg-cream"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => (
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

        <div className="mt-auto flex flex-col gap-3 border-t border-border pt-6">
          <Button href="#" variant="secondary" className="w-full">
            Apply Now
          </Button>
          <Button href="#" variant="primary" className="w-full">
            Donate
          </Button>
        </div>
      </nav>
    </>
  );
}
