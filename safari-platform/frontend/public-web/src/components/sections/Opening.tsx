import { Container } from "@safari/ui";
import { home } from "@/data/home";

export function Opening() {
  const { opening } = home;

  return (
    <section
      id="about"
      aria-labelledby="opening-heading"
      className="relative z-10 bg-background py-20 md:py-28"
    >
      <Container className="px-5 md:px-6">
        <div className="mx-auto w-full max-w-6xl text-center">
          <p className="mb-8 text-sm font-semibold uppercase tracking-widest text-accent">
            {opening.title}
          </p>
          <h2
            id="opening-heading"
            className="text-balance text-[1.75rem] font-normal leading-[1.3] tracking-tight text-foreground md:text-[2rem] lg:text-[2.125rem]"
          >
            {opening.body}
          </h2>
        </div>
      </Container>
    </section>
  );
}
