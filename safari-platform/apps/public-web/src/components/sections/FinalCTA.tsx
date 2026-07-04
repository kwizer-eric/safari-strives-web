import { Button, Container } from "@safari/ui";
import { home } from "@/data/home";

export function FinalCTA() {
  const { finalCta } = home;

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="bg-dark py-16 md:py-24"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="final-cta-heading"
            className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
          >
            {finalCta.line1}
          </h2>
          <p className="mb-10 text-lg text-white/80 md:text-xl">
            {finalCta.line2}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              href="http://localhost:3002/login"
              variant="secondary"
              className="border-white/40 text-white hover:bg-white/10"
            >
              Apply Now
            </Button>
            <Button href="#" variant="primary">
              Donate
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
