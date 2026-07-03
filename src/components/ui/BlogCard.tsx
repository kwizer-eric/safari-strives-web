import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Article } from "@/data/articles";

type BlogCardProps = {
  article: Article;
  className?: string;
};

export function BlogCard({ article, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-card",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 py-6">
        <time className="text-sm text-muted" dateTime={article.date}>
          {article.date}
        </time>
        <h3 className="text-xl font-bold leading-snug text-foreground">
          {article.title}
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
