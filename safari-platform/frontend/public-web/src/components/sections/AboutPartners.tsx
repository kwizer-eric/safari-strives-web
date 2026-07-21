import Image from "next/image";
import { cn } from "@safari/shared";
import { Container } from "@safari/ui";
import { aboutPage, partners } from "@/data/about";

export function AboutPartners() {
  const { partners: partnersCopy } = aboutPage;
  // Two identical halves so `animate-marquee` (-50%) loops seamlessly; extra copies fill wide viewports.
  const half = [...partners, ...partners];
  const duplicated = [...half, ...half];

  return (
    <section
      id="partners"
      aria-labelledby="about-partners-heading"
      className="relative z-10 scroll-mt-28 bg-background py-20 md:py-28"
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
          {partnersCopy.intro ? (
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {partnersCopy.intro}
            </p>
          ) : null}
        </div>
      </Container>

      <div className="relative overflow-hidden">
        <div className="flex w-max gap-4 animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center md:gap-6">
          {duplicated.map((partner, index) => (
            <a
              key={`${partner.id}-${index}`}
              href={partner.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${partner.name} (opens in new tab)`}
              className={cn(
                "flex h-[120px] w-[280px] shrink-0 items-center justify-center rounded-[var(--radius-card)] border border-border bg-card p-6 transition-opacity hover:opacity-90 md:h-[140px] md:w-[320px]",
                partner.logoOnWhite && "bg-white",
                partner.logoOnDark && "bg-black",
              )}
            >
              <Image
                src={partner.logo}
                alt=""
                width={220}
                height={80}
                className="h-14 w-auto max-w-[200px] object-contain md:h-16 md:max-w-[240px]"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
