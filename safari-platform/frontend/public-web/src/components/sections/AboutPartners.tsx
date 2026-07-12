import { cn } from "@safari/shared";
import { Container } from "@safari/ui";
import { aboutPage, partners } from "@/data/about";

function gridCellBorderClass(index: number) {
  return cn(
    index % 2 === 0 && "border-r border-border",
    index < 4 && "border-b border-border",
    "md:border-b-0",
    index % 4 !== 3 && "md:border-r md:border-border",
    index < 4 && "md:border-b md:border-border",
  );
}

export function AboutPartners() {
  const { partners: partnersCopy } = aboutPage;

  return (
    <section
      id="partners"
      aria-labelledby="about-partners-heading"
      className="scroll-mt-28 bg-background py-20 md:py-28"
    >
      <Container>
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {partnersCopy.eyebrow}
          </p>
          <h2
            id="about-partners-heading"
            className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            {partnersCopy.title}
          </h2>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            {partnersCopy.intro}
          </p>
        </div>

        <div className="grid grid-cols-2 border border-border md:grid-cols-4">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={cn(
                "flex min-h-[120px] items-center justify-center p-6 md:min-h-[140px]",
                gridCellBorderClass(index),
              )}
            >
              <div className="text-center">
                <span className="block text-sm font-semibold text-foreground md:text-base">
                  {partner.name}
                </span>
                <span className="mt-1 block text-[10px] font-medium uppercase tracking-wider text-muted">
                  {partner.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
