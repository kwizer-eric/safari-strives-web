import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Program } from "@/data/programs";

type ProgramCardProps = {
  program: Program;
  className?: string;
};

export function ProgramCard({ program, className }: ProgramCardProps) {
  return (
    <article
      className={cn(
        "group grid gap-6 overflow-hidden rounded-[var(--radius-card)] bg-card py-4 md:grid-cols-2 md:gap-8 md:py-6",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={program.image}
          alt={program.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-5xl font-bold text-foreground/10">
            {program.number}
          </span>
          <Link
            href="#"
            className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-accent"
          >
            Learn more
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <h3 className="mb-3 text-2xl font-bold text-foreground">
          {program.title}
        </h3>
        <p className="mb-4 text-base leading-relaxed text-muted">
          {program.description}
        </p>
        <Link
          href="#"
          className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          Learn more
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
