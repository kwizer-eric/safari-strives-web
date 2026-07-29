import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@safari/shared";
import type { Article } from "@/types/content";
import { CmsImage } from "@/components/ui/CmsImage";
import {
  articleHref,
  articleIsVideo,
  articlePosterUrl,
} from "@/lib/article-link";

type BlogCardProps = {
  article: Article;
  className?: string;
};

export function BlogCard({ article, className }: BlogCardProps) {
  const href = articleHref(article);
  const isVideo = articleIsVideo(article);
  const poster = articlePosterUrl(article);
  const linkProps = isVideo
    ? {
        href,
        target: "_blank" as const,
        rel: "noopener noreferrer",
      }
    : { href };

  const LinkEl = isVideo ? "a" : Link;

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white transition-colors hover:border-accent/30",
        className,
      )}
    >
      <LinkEl
        {...linkProps}
        className="relative block aspect-[5/3] overflow-hidden bg-cream"
      >
        {poster ? (
          <CmsImage
            src={poster}
            alt={article.imageAlt || article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
        {isVideo ? (
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm">
              <Play className="h-5 w-5 fill-current" aria-hidden="true" />
            </span>
          </span>
        ) : null}
      </LinkEl>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted">
          {article.date}
          {isVideo ? " · Video" : ""}
        </div>
        <h3 className="text-lg font-bold leading-snug text-foreground">
          <LinkEl
            {...linkProps}
            className="transition-colors hover:text-accent"
          >
            {article.title}
          </LinkEl>
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
        <LinkEl
          {...linkProps}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          {isVideo ? "Watch" : "Read more"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </LinkEl>
      </div>
    </article>
  );
}
