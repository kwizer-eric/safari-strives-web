import { Button, Container } from "@safari/ui";
import { aboutPage } from "@/data/about";

export function AboutCloser() {
  const { closer } = aboutPage;

  return (
    <section
      aria-labelledby="about-closer-heading"
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-white/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-white/8 blur-3xl"
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2
            id="about-closer-heading"
            className="mb-4 text-balance text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
          >
            {closer.title}
          </h2>
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            {closer.body}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href={closer.primaryCta.href}
              variant="primary"
              showArrow
              className="bg-white px-8 py-3.5 text-base text-accent-hover shadow-xl shadow-black/10 hover:bg-cream hover:text-accent"
            >
              {closer.primaryCta.label}
            </Button>
            <Button
              href={closer.secondaryCta.href}
              variant="secondary"
              className="border-white/50 bg-white/5 px-8 py-3.5 text-base text-white backdrop-blur hover:bg-white/15"
            >
              {closer.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
