import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@safari/shared";
import type { Venture } from "@/types/content";

type VentureCardProps = {
  venture: Venture;
  onOpenVideo: () => void;
  className?: string;
};

export function VentureCard({
  venture,
  onOpenVideo,
  className,
}: VentureCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col bg-card",
        className,
      )}
    >
      <button
        type="button"
        onClick={onOpenVideo}
        className="relative block aspect-[4/5] w-full overflow-hidden rounded-2xl text-left"
        aria-label={`Watch video about ${venture.founder}`}
      >
        <Image
          src={venture.image}
          alt={venture.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </button>

      <div className="flex flex-1 flex-col gap-1 py-5">
        <h3 className="text-lg font-semibold leading-snug text-foreground">
          {venture.founder}
        </h3>
        <p className="text-sm text-muted">{venture.ventureName}</p>
        <button
          type="button"
          onClick={onOpenVideo}
          className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          View more
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
