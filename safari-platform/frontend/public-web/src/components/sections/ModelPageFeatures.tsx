import { Container } from "@safari/ui";
import type { ModelPageContent } from "@/data/model-page";

function FeatureCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <article className="flex min-h-[22rem] flex-col rounded-[1.75rem] bg-white p-6 md:min-h-[24rem] md:p-8">
      <header>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
      </header>

      <div className="flex flex-1 flex-col pt-8 md:pt-10">
        <h3 className="text-2xl font-bold leading-[1.15] tracking-tight text-foreground md:text-[1.65rem]">
          {title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted md:text-[15px] md:leading-relaxed">
          {body}
        </p>
      </div>
    </article>
  );
}

type ModelPageFeaturesProps = {
  differentiators: ModelPageContent["differentiators"];
  headingId: string;
};

export function ModelPageFeatures({
  differentiators,
  headingId,
}: ModelPageFeaturesProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="relative z-10 bg-background py-20 md:py-28"
    >
      <Container>
        <div className="mb-12 max-w-3xl md:mb-20">
          <h2
            id={headingId}
            className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            {differentiators.title.line1}
            <br />
            {differentiators.title.line2}
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7">
          {differentiators.items.map((item, index) => (
            <FeatureCard
              key={item.title}
              index={index}
              title={item.title}
              body={item.body}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
