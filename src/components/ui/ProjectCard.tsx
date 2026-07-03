import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-card",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 py-6">
        <span className="inline-flex w-fit rounded-full bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wide text-foreground">
          {project.category}
        </span>
        <h3 className="text-xl font-bold leading-snug text-foreground">
          {project.title}
        </h3>
        <Link
          href="#"
          className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          Learn more
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
