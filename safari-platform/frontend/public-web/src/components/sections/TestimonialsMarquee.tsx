import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

export function TestimonialsMarquee() {
  const duplicated = [...testimonials, ...testimonials];

  return (
    <section
      aria-label="Community testimonials"
      className="relative z-20 overflow-hidden bg-background py-10 md:py-12"
    >
      <div className="relative overflow-hidden">
        <div className="flex w-max gap-4 animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center md:gap-6">
          {duplicated.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.id}-${index}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
