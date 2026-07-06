import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@safari/shared";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  actionLabel,
  actionHref = "#",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted">
          {eyebrow}
        </p>
        <h2
          className={cn(
            "text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </div>
      {actionLabel && (
        <Link
          href={actionHref}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
        >
          {actionLabel}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      )}
    </div>
  );
}
