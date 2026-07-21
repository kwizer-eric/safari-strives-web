import { Container } from "@safari/ui";
import type { ModelPageContent } from "@/data/model-page";

const bodyClass = "text-base leading-relaxed text-muted md:text-lg";

type ModelPageAudienceProps = {
  audience: ModelPageContent["audience"];
  headingId: string;
};

export function ModelPageAudience({
  audience,
  headingId,
}: ModelPageAudienceProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="relative z-10 bg-white py-24 md:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-20">
          <div>
            <h2
              id={headingId}
              className="text-base font-bold leading-relaxed text-accent md:text-lg"
            >
              {audience.title}
            </h2>
          </div>
          <div className={`space-y-5 ${bodyClass}`}>
            {audience.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
