import Image from "next/image";
import { cn } from "@/lib/utils";

type InMotionCardProps = {
  label: string;
  image: string;
  imageAlt: string;
  className?: string;
};

export function InMotionCard({
  label,
  image,
  imageAlt,
  className,
}: InMotionCardProps) {
  return (
    <article
      className={cn(
        "relative h-[280px] w-[320px] shrink-0 overflow-hidden rounded-[var(--radius-card)] md:h-[320px] md:w-[380px]",
        className,
      )}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="380px"
      />
      <div className="absolute inset-0 bg-dark/40" />
      <p className="absolute bottom-0 left-0 right-0 p-6 text-sm font-medium leading-snug text-white">
        {label}
      </p>
    </article>
  );
}
