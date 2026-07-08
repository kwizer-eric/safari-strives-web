import Image from "next/image";
import { MapPin } from "lucide-react";
import { Container } from "@safari/ui";
import { site } from "@/data/site";
import { aboutPage } from "@/data/about";

export function AboutHero() {
  const { hero } = aboutPage;

  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark/70" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Container className="relative flex min-h-[78vh] flex-col justify-end pb-16 pt-32 md:min-h-[85vh] md:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-8">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
              {hero.eyebrow}
            </p>
            <h1
              id="about-hero-heading"
              className="mb-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              {hero.headline}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              {hero.subhead}
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[var(--radius-card)] border border-white/15 bg-white/10 p-6 backdrop-blur md:p-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/70">
                Where we work
              </p>
              <ul className="space-y-3">
                {site.locations.map((location) => (
                  <li
                    key={location}
                    className="flex items-start gap-2 text-sm text-white/90"
                  >
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    {location}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/15 pt-4 text-xs leading-relaxed text-white/70">
                {site.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
