import { cn } from "@safari/shared";
import { Container } from "@safari/ui";
import { CmsImage } from "@/components/ui/CmsImage";
import type { AboutPagePayload, AboutPartner } from "@/types/content";

type AboutPartnersProps = {
  copy: AboutPagePayload["partners"];
  partners: AboutPartner[];
};

export function AboutPartners({ copy, partners }: AboutPartnersProps) {
  if (partners.length === 0) return null;

  // Each group contains two cycles so it stays wider than ultra-wide viewports.
  // The two groups must be geometrically identical for translateX(-50%) to loop.
  const loopPartners = [...partners, ...partners];

  return (
    <section
      id="partners"
      aria-labelledby="about-partners-heading"
      className="relative z-10 scroll-mt-28 bg-background py-20 md:py-28"
    >
      <Container>
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {copy.eyebrow}
          </p>
          <h2
            id="about-partners-heading"
            className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            {copy.title}
          </h2>
          {copy.intro ? (
            <p className="text-base leading-relaxed text-muted md:text-lg">
              {copy.intro}
            </p>
          ) : null}
        </div>
      </Container>

      <div className="marquee-viewport relative overflow-hidden">
        <div className="grid w-max motion-reduce:w-full">
          {[0, 1].map((groupIndex) => (
            <div
              key={groupIndex}
              aria-hidden={groupIndex === 1 ? true : undefined}
              className={cn(
                "marquee-lane col-start-1 row-start-1 flex shrink-0 gap-4 pr-4 md:gap-6 md:pr-6",
                groupIndex === 0 &&
                  "motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0",
                groupIndex === 1 &&
                  "marquee-lane-offset motion-reduce:hidden",
              )}
            >
              {loopPartners.map((partner, index) => {
                const isVisualDuplicate =
                  groupIndex === 1 || index >= partners.length;

                return (
                  <a
                    key={`${partner.id}-${index}`}
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-hidden={isVisualDuplicate ? true : undefined}
                    tabIndex={isVisualDuplicate ? -1 : undefined}
                    aria-label={
                      partner.name.trim()
                        ? `Visit ${partner.name} (opens in new tab)`
                        : "Visit partner website (opens in new tab)"
                    }
                    className={cn(
                      "flex h-[120px] w-[280px] shrink-0 items-center justify-center rounded-[var(--radius-card)] border border-border bg-card p-3 transition-opacity hover:opacity-90 md:h-[140px] md:w-[320px] md:p-4",
                      index >= partners.length && "motion-reduce:hidden",
                      partner.logoOnWhite && "bg-white",
                      partner.logoOnDark && "bg-black",
                    )}
                  >
                    {partner.logo ? (
                      <CmsImage
                        src={partner.logo}
                        alt=""
                        width={220}
                        height={80}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="px-2 text-center text-sm font-semibold leading-snug text-foreground md:text-base">
                        {partner.name || "Partner"}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
