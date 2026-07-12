import { Button, Container } from "@safari/ui";
import { aboutPage } from "@/data/about";

export function AboutCloser() {
  const { closer } = aboutPage;

  return (
    <section
      aria-labelledby="about-closer-heading"
      className="relative overflow-hidden bg-accent py-24 md:py-32"
    >
      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2
            id="about-closer-heading"
            className="mb-6 text-balance text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
          >
            {closer.title}
          </h2>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            {closer.body}
          </p>
          <Button
            href={closer.primaryCta.href}
            variant="primary"
            className="bg-white px-8 py-3.5 text-base text-accent-hover shadow-xl shadow-black/10 hover:bg-cream hover:text-accent"
          >
            {closer.primaryCta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
