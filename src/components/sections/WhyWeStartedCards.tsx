import Image from "next/image";
import { Globe, Leaf, Target } from "lucide-react";
import { whyWeStarted } from "@/data/whyWeStarted";
import { cn } from "@/lib/utils";

function IconBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function WhyWeStartedCards() {
  const { stat, vision, mission } = whyWeStarted;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <article className="flex min-h-[420px] flex-col rounded-[var(--radius-card)] bg-cream p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {stat.label}
        </p>
        <div className="mt-auto space-y-4">
          <p className="text-5xl font-bold tracking-tight text-foreground md:text-6xl">
            {stat.value}
          </p>
          <p className="text-base leading-relaxed text-muted">{stat.description}</p>
        </div>
      </article>

      <article className="relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] p-8">
        <Image
          src={vision.image}
          alt={vision.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-dark/45" />
        <IconBadge className="relative mb-auto">
          <Target className="h-5 w-5 text-white" aria-hidden="true" />
        </IconBadge>
        <div className="relative">
          <h3 className="mb-3 text-2xl font-bold uppercase tracking-wide text-white">
            {vision.title}
          </h3>
          <p className="text-base leading-relaxed text-white/90">
            {vision.description}
          </p>
        </div>
      </article>

      <article className="flex min-h-[420px] flex-col justify-between rounded-[var(--radius-card)] bg-accent p-8 text-white">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-medium text-white/80">{mission.tagline}</p>
          <IconBadge>
            <Leaf className="h-5 w-5 text-white" aria-hidden="true" />
          </IconBadge>
        </div>
        <div>
          <h3 className="mb-4 text-2xl font-bold uppercase tracking-wide">
            {mission.title}
          </h3>
          <p className="text-base leading-relaxed text-white/90">
            {mission.description}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <IconBadge>
            <Globe className="h-5 w-5 text-white" aria-hidden="true" />
          </IconBadge>
          <p className="text-sm text-white/80">For people and communities.</p>
        </div>
      </article>
    </div>
  );
}
