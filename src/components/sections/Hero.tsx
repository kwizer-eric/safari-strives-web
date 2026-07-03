import Image from "next/image";
import { home } from "@/data/home";
import { Container } from "@/components/layout/Container";

export function Hero() {
  const { hero } = home;

  return (
    <section
      aria-labelledby="hero-heading"
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
        <div className="absolute inset-0 bg-dark/60" />
      </div>

      <Container className="relative flex min-h-[92vh] flex-col justify-end pb-20 pt-32 md:pb-28">
        <div className="max-w-4xl">
          <h1
            id="hero-heading"
            className="text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {hero.headline}
          </h1>
        </div>
      </Container>
    </section>
  );
}
