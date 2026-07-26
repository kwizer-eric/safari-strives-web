import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@safari/shared";
import type { Article } from "@/types/content";

type BlogCardProps = {
  article: Article;
  className?: string;
};

export function BlogCard({ article, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white transition-colors hover:border-accent/30",
        className,
      )}
    >
      <Link
        href={`/field-notes/${article.id}`}
        className="relative block aspect-[5/3] overflow-hidden bg-cream"
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted">
          {article.date}
        </div>
        <h3 className="text-lg font-bold leading-snug text-foreground">
          <Link
            href={`/field-notes/${article.id}`}
            className="transition-colors hover:text-accent"
          >
            {article.title}
          </Link>
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
        <Link
          href={`/field-notes/${article.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          Read more
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
