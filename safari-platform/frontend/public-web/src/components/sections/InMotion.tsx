import Image from "next/image";
import { Check } from "lucide-react";
import { Container } from "@safari/ui";
import { home } from "@/data/home";

export function InMotion() {
  const { inMotion } = home;

  return (
    <section
      id="in-motion"
      aria-label="In Motion"
      className="relative z-10 bg-black py-16 md:-mt-[100vh] md:py-24"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-stretch lg:gap-10">
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-white/70">
              {inMotion.eyebrow}
            </p>
            <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              {inMotion.title}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
              {inMotion.body}
            </p>

            <div className="mt-8 space-y-4">
              {inMotion.sectors.map((sector) => (
                <div key={sector} className="flex items-center gap-4">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="text-lg leading-tight text-white">{sector}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-2xl lg:min-h-0 lg:h-full">
            <Image
              src={inMotion.image}
              alt={inMotion.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
