import { Container } from "@safari/ui";
import type { ProgramSection } from "@/data/programs-content";

type ProgramIntroProps = {
  section: ProgramSection;
  variant?: "light" | "cream";
};

export function ProgramIntro({ section, variant = "light" }: ProgramIntroProps) {
  return (
    <section
      aria-label={section.title ?? section.eyebrow}
      className={
        variant === "cream"
          ? "bg-cream py-20 md:py-28"
          : "bg-background py-20 md:py-28"
      }
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            {section.eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
                {section.eyebrow}
              </p>
            )}
            {section.title && (
              <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
                {section.title}
              </h2>
            )}
          </div>
          <div className="md:col-span-8">
            <div className="flex flex-col gap-5">
              {section.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-muted md:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
