import { Container } from "@safari/ui";
import { aboutPage } from "@/data/about";

export function AboutMission() {
  const { mission } = aboutPage;

  return (
    <section
      id="mission"
      aria-labelledby="about-mission-heading"
      className="scroll-mt-28 border-b border-border bg-background py-20 md:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              {mission.eyebrow}
            </p>
            <h2
              id="about-mission-heading"
              className="mb-8 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl"
            >
              {mission.title}
            </h2>

            <blockquote className="relative border-l-4 border-accent bg-cream px-6 py-5">
              <p className="text-base font-semibold leading-relaxed text-foreground md:text-lg">
                &ldquo;{mission.paragraphs[0]}&rdquo;
              </p>
            </blockquote>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7">
            {mission.paragraphs.slice(1).map((paragraph, index) => (
              <p
                key={index}
                className="text-base leading-relaxed text-muted md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {mission.values.map((value, index) => (
            <article
              key={value.title}
              className="relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-cream p-8"
            >
              <span className="mb-4 block text-sm font-semibold text-accent">
                {String(index + 1).padStart(2, "0")} /
              </span>
              <h3 className="mb-3 text-lg font-bold uppercase tracking-wide text-foreground">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted md:text-base">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
