import { Container } from "@safari/ui";
import { aboutPage, partners } from "@/data/about";

export function AboutPartners() {
  const { partners: partnersCopy } = aboutPage;

  return (
    <section
      id="partners"
      aria-labelledby="about-partners-heading"
      className="scroll-mt-28 relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "linear-gradient(180deg, #f3f3f1 0%, #f9f9f7 50%, #ecefe8 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-accent-hover/10 blur-3xl"
      />

      <Container className="relative">
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner) => (
            <article
              key={partner.id}
              className="flex flex-col rounded-[var(--radius-card)] border border-border bg-white p-8 shadow-sm transition-colors hover:border-accent/40"
            >
              <span className="mb-4 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                {partner.type}
              </span>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                {partner.name}
              </h3>
              {partner.highlight && (
                <p className="mb-3 text-sm font-semibold text-accent">
                  {partner.highlight}
                </p>
              )}
              <p className="text-sm leading-relaxed text-muted md:text-base">
                {partner.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
