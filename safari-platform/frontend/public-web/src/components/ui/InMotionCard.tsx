import { cn } from "@safari/shared";
import { CmsImage } from "@/components/ui/CmsImage";

export type InMotionCardData = {
  id: string;
  label: string;
  image: string;
  imageAlt: string;
};

type InMotionCardProps = {
  card: InMotionCardData;
  className?: string;
  ariaHidden?: boolean;
};

export function InMotionCard({
  card,
  className,
  ariaHidden,
}: InMotionCardProps) {
  return (
    <article
      aria-hidden={ariaHidden}
      className={cn(
        "relative h-[480px] w-[min(85vw,340px)] shrink-0 snap-start overflow-hidden rounded-2xl md:h-[600px] md:w-[400px] md:snap-none",
        className,
      )}
    >
      <CmsImage
        src={card.image}
        alt={card.imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 340px, 400px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />
      <div className="absolute bottom-0 left-0 p-5 md:p-6">
        <p className="text-sm font-semibold leading-snug text-white md:text-base">
          {card.label}
        </p>
      </div>
    </article>
  );
}
