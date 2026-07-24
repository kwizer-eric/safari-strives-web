import { cn } from "@safari/shared";
import type { Testimonial } from "@/types/content";

type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "flex w-[320px] shrink-0 flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-card p-6 md:w-[380px]",
        className,
      )}
    >
      <p className="text-sm font-medium text-muted">{testimonial.role}</p>
      <blockquote className="text-base leading-relaxed text-foreground">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <footer className="text-sm font-semibold text-foreground">
        {testimonial.name}
      </footer>
    </article>
  );
}
