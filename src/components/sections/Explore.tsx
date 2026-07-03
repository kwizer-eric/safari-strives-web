import { home } from "@/data/home";
import { ExploreStackCard } from "@/components/ui/ExploreStackCard";

export function Explore() {
  const { explore } = home;

  return (
    <section id="explore" aria-label="Explore Safari Strives" className="bg-background">
      <div className="border-t border-border">
        {explore.pillars.map((pillar, i) => (
          <ExploreStackCard
            key={pillar.id}
            index={i + 1}
            label={pillar.label}
            title={pillar.title}
            description={pillar.description}
            image={pillar.image}
            imageAlt={pillar.imageAlt}
            zIndex={10 + i * 10}
            isLast={i === explore.pillars.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
