import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@safari/shared";
import type { Venture } from "@/data/ventures";

type VentureCardProps = {
  venture: Venture;
  className?: string;
};

export function VentureCard({ venture, className }: VentureCardProps) {
  const href = `/ventures/${venture.id}`;
  const location = venture.location ? `, ${venture.location}` : "";

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-card",
        className,
      )}
    >
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden">
        <Image
          src={venture.image}
          alt={venture.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 py-5">
        <h3 className="text-lg font-semibold leading-snug text-foreground">
          {venture.founder}{" "}
          <span className="text-muted">/ {venture.ventureName}</span>
        </h3>
        <p className="text-sm text-muted">
          {venture.category}
          {location}
        </p>
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          View
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
