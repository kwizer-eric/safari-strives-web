import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@safari/shared";
import type { Article } from "@/data/articles";

type BlogCardProps = {
  article: Article;
  className?: string;
};

export function BlogCard({ article, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white",
        className,
      )}
    >
      <div className="relative flex aspect-[5/3] items-center justify-center bg-cream">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-lg font-bold leading-snug text-foreground">
          {article.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
        <Link
          href="#"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          Read more
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
