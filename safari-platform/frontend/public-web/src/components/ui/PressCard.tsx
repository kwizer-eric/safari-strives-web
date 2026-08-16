import { ArrowRight } from "lucide-react";
import { cn } from "@safari/shared";
import type { PressItem } from "@/types/content";
import { CmsImage } from "@/components/ui/CmsImage";

type PressCardProps = {
  item: PressItem;
  className?: string;
};

export function PressCard({ item, className }: PressCardProps) {
  const href = item.href.trim();
  const linkProps = {
    href,
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white transition-colors hover:border-accent/30",
        className,
      )}
    >
      <a
        {...linkProps}
        className="relative block aspect-[5/3] overflow-hidden bg-cream"
      >
        {item.image.trim() ? (
          <CmsImage
            src={item.image}
            alt={item.imageAlt || item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
      </a>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted">
          {item.date}
        </div>
        <h3 className="text-lg font-bold leading-snug text-foreground">
          <a {...linkProps} className="transition-colors hover:text-accent">
            {item.title}
          </a>
        </h3>
        <a
          {...linkProps}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          Read more
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
