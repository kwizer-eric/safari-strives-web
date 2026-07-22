"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { cn } from "@safari/shared";
import { Button as SafariButton, Logo } from "@safari/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ApplyButton } from "@/components/ui/ApplyButton";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, ourModelLinks, site } from "@/data/site";

type Navbar5Props = {
  isSolid?: boolean;
};

export function Navbar5({ isSolid = true }: Navbar5Props) {
  const linkClass = cn(
    "bg-transparent text-sm font-medium transition-colors",
    "hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent",
    isSolid
      ? "text-foreground/80 hover:text-foreground"
      : "text-white/90 hover:text-white",
  );

  const triggerClass = cn(
    navigationMenuTriggerStyle(),
    "bg-transparent px-0 text-sm font-medium shadow-none",
    "hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent",
    isSolid
      ? "text-foreground/80 hover:text-foreground data-[state=open]:text-foreground"
      : "text-white/90 hover:text-white data-[state=open]:text-white",
  );

  const simpleLinks = navLinks.filter((link) => link.label !== "Our Model");

  return (
    <nav className="flex w-full items-center justify-between gap-4">
      <Logo
        src={isSolid ? site.logo : site.logoWhite}
        alt={site.name}
      />

      <NavigationMenu className="hidden lg:block" useViewport={false}>
        <NavigationMenuList className="gap-10 space-x-0">
          {simpleLinks.slice(0, 1).map((link) => (
            <NavigationMenuItem key={link.label}>
              <NavigationMenuLink asChild>
                <Link href={link.href} className={cn(linkClass, "px-0")}>
                  {link.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className={triggerClass}>
              Our Model
            </NavigationMenuTrigger>
            <NavigationMenuContent
              className={cn(
                "!w-max min-w-0",
                "left-0 top-full z-50 mt-4 overflow-hidden rounded-[var(--radius-card)] border border-border bg-card text-foreground shadow-sm md:mt-5",
              )}
            >
              <div className="flex w-max flex-col gap-0 p-2">
                {ourModelLinks.map((item) => (
                  <NavigationMenuLink asChild key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2 transition-colors hover:bg-cream"
                    >
                      <p className="mb-0.5 font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-sm text-muted">
                        {item.description.split("\n").map((line, index) => (
                          <span key={line}>
                            {index > 0 && <br />}
                            {line}
                          </span>
                        ))}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {simpleLinks.slice(1).map((link) => (
            <NavigationMenuItem key={link.label}>
              <NavigationMenuLink asChild>
                <Link href={link.href} className={cn(linkClass, "px-0")}>
                  {link.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden items-center gap-3 lg:flex">
        <ApplyButton
          variant="secondary"
          className={cn(!isSolid && "border-white/40 text-white hover:bg-white/10")}
        >
          Apply Now
        </ApplyButton>
        <SafariButton
          href={site.donateHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
        >
          Donate
        </SafariButton>
      </div>

      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              !isSolid && "border-white/40 bg-transparent text-white hover:bg-white/10",
            )}
          >
            <MenuIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="max-h-screen overflow-auto">
          <SheetHeader>
            <SheetTitle>
              <Logo src={site.logo} alt={site.name} />
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col p-4">
            <Accordion type="single" collapsible className="mt-4 mb-2">
              <AccordionItem value="our-model" className="border-none">
                <AccordionTrigger className="text-base hover:no-underline">
                  Our Model
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-1">
                    {ourModelLinks.map((item) => (
                      <Link
                        href={item.href}
                        key={item.href}
                        className="rounded-md p-3 transition-colors hover:bg-cream"
                      >
                        <p className="mb-0.5 font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="text-sm text-muted">
                        {item.description.split("\n").map((line, index) => (
                          <span key={line}>
                            {index > 0 && <br />}
                            {line}
                          </span>
                        ))}
                      </p>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex flex-col gap-2">
              {navLinks
                .filter((link) => link.label !== "Our Model")
                .map((link) => (
                  <Link
                    href={link.href}
                    key={link.label}
                    className="rounded-lg px-3 py-3 text-lg font-medium text-foreground transition-colors hover:bg-cream"
                  >
                    {link.label}
                  </Link>
                ))}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <ApplyButton variant="secondary" className="w-full">
                Apply Now
              </ApplyButton>
              <SafariButton
                href={site.donateHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="w-full"
              >
                Donate
              </SafariButton>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
