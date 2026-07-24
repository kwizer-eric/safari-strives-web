import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@safari/ui";
import type { Venture } from "@/types/content";

type VentureDetailHeroProps = {
  venture: Venture;
};

export function VentureDetailHero({ venture }: VentureDetailHeroProps) {
  const location = venture.location ? ` · ${venture.location}` : "";

  return (
    <section
      aria-labelledby="venture-detail-heading"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={venture.image}
          alt={venture.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark/65" />
      </div>

      <Container className="relative flex min-h-[75vh] flex-col justify-between pb-16 pt-32 md:min-h-[80vh] md:pb-24">
        <Link
          href="/ventures"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All ventures
        </Link>

        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/80">
            {venture.category}
            {location}
          </p>
          <h1
            id="venture-detail-heading"
            className="mb-4 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {venture.ventureName}
          </h1>
          <p className="mb-6 text-lg text-white/90 md:text-xl">
            {venture.founder}
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            {venture.tagline}
          </p>
        </div>
      </Container>
    </section>
  );
}
