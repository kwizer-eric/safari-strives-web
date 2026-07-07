import { Container } from "@safari/ui";
import { ventures } from "@/data/ventures";
import { VentureCard } from "@/components/ui/VentureCard";

export function VenturesGrid() {
  return (
    <section
      aria-label="Ventures"
      className="bg-background py-16 md:py-24"
    >
      <Container>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ventures.map((venture) => (
            <VentureCard key={venture.id} venture={venture} />
          ))}
        </div>
      </Container>
    </section>
  );
}
