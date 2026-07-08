import Link from "next/link";
import { Container } from "@safari/ui";
import { aboutSections } from "@/data/about";

export function AboutNav() {
  return (
    <nav
      aria-label="About page sections"
      className="sticky top-[4.5rem] z-20 border-b border-border bg-background/95 backdrop-blur"
    >
      <Container>
        <ul className="flex gap-2 overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {aboutSections.map((section) => (
            <li key={section.id} className="shrink-0">
              <Link
                href={`#${section.id}`}
                className="inline-flex rounded-full border border-border bg-cream px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted transition-colors hover:border-accent/40 hover:text-accent"
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
