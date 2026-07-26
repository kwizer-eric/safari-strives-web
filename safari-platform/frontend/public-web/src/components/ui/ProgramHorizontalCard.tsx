import Link from "next/link";
import { cn } from "@safari/shared";
import { CmsImage } from "@/components/ui/CmsImage";

export const PROGRAM_CARD_WIDTH_CLASS =
  "w-[calc(((100%-1.75rem)/1.5)*0.9)]";

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
        <div className="relative aspect-[16/10] overflow-hidden">
          <CmsImage
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 63vw, 40vw"
          />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-7 md:gap-5 md:p-9">
          <h3 className="text-xl font-bold leading-[1.15] tracking-tight text-foreground md:text-[1.65rem] lg:text-3xl">
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
