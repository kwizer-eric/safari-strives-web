import Image from "next/image";
import { cn } from "@safari/shared";

type ExploreStackCardProps = {
  index: number;
  label: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  zIndex: number;
  isLast: boolean;
};

export function ExploreStackCard({
  index,
  label,
  title,
  description,
  image,
  imageAlt,
  zIndex,
  isLast,
}: ExploreStackCardProps) {
  const indexLabel = String(index).padStart(2, "0");

  return (
    <article
      className={cn(
        "sticky top-24 min-h-[42vh] border-t border-border bg-background motion-reduce:relative",
        isLast && "pb-12",
      )}
      style={{ zIndex }}
    >
      <div className="grid min-h-[42vh] grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_2fr]">
        <div className="flex items-start px-[var(--site-gutter)] py-6 md:border-r md:border-border md:py-8">
          <span className="text-sm font-semibold text-foreground">
            {indexLabel} /
          </span>
        </div>

        <div className="relative min-h-[180px] md:min-h-0 md:border-r md:border-border">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 25vw, 25vw"
          />
        </div>

        <div className="col-span-2 flex flex-col justify-center border-t border-border px-[var(--site-gutter)] py-6 md:col-span-1 md:border-t-0 md:py-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
            {label}
          </p>
          <h3 className="mb-4 text-2xl font-normal leading-tight tracking-tight text-foreground md:text-3xl lg:text-4xl">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted md:text-base">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
