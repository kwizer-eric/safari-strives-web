import Link from "next/link";
import { cn } from "@safari/shared";
import { CmsImage } from "@/components/ui/CmsImage";

/**
 * Card/stack width. Laptop and below use a smaller multiplier (shorter cards,
 * since the media is 1:1); large desktops (2xl) keep the original scale.
 */
export const PROGRAM_CARD_WIDTH_CLASS =
  "w-[calc(((100%-1.75rem)/1.5)*0.78)] 2xl:w-[calc(((100%-1.75rem)/1.5)*0.9)]";

type ProgramHorizontalCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  className?: string;
  fillHeight?: boolean;
};

export function ProgramHorizontalCard({
  title,
  description,
  image,
  imageAlt,
  href,
  className,
  fillHeight = false,
}: ProgramHorizontalCardProps) {
  return (
    <article
      className={cn(
        !fillHeight && PROGRAM_CARD_WIDTH_CLASS,
        "shrink-0 snap-start border border-border bg-white",
        fillHeight && "h-full w-full",
        className,
      )}
    >
      <Link href={href} className="group flex h-full flex-col">
        {/* Square media only — card height comes from image + text below. */}
        <div className="relative aspect-square w-full shrink-0 overflow-hidden">
          <CmsImage
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 63vw, 40vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6 md:gap-4 md:p-6">
          <h3 className="text-lg font-bold leading-[1.15] tracking-tight text-foreground md:text-xl">
            {title}
          </h3>
          <p
            className={cn(
              "text-sm leading-relaxed text-muted md:text-[0.9rem] md:leading-6",
              fillHeight && "flex-1",
            )}
          >
            {description}
          </p>
        </div>
      </Link>
    </article>
  );
}
