import Image from "next/image";
import { MapPin } from "lucide-react";
import { Container } from "@safari/ui";
import { aboutPage, teamMembers, type AboutPerson } from "@/data/about";

function TeamCard({
  person,
  variant = "default",
}: {
  person: AboutPerson;
  variant?: "featured" | "default";
}) {
  const isFeatured = variant === "featured";

  return (
    <article
      className={`group overflow-hidden rounded-[var(--radius-card)] border border-border bg-white transition-colors hover:border-accent/40 ${
        isFeatured ? "md:grid md:grid-cols-2 md:items-stretch" : "flex flex-col"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-cream ${
          isFeatured ? "min-h-[280px] md:min-h-full" : "aspect-[4/5]"
        }`}
      >
        <Image
          src={person.image}
          alt={person.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 50vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
      </div>

      <div className={`flex flex-col gap-3 ${isFeatured ? "p-8 md:justify-center md:p-10" : "p-6"}`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          {person.role}
        </p>
        <h3
          className={`font-bold leading-snug text-foreground ${
            isFeatured ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {person.name}
        </h3>
        <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
          <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          {person.location}
        </p>
        <p className="text-sm leading-relaxed text-muted md:text-base">
          {person.bio}
        </p>
      </div>
    </article>
  );
}

export function AboutTeam() {
  const { team } = aboutPage;
  const featured = teamMembers.find((member) => member.featured);
  const rest = teamMembers.filter((member) => !member.featured);

  return (
    <section
      id="team"
      aria-labelledby="about-team-heading"
      className="scroll-mt-28 bg-cream py-20 md:py-28"
    >
      <Container>
        <div className="mb-12 max-w-3xl md:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {team.eyebrow}
          </p>
          <h2
            id="about-team-heading"
            className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            {team.title}
          </h2>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            {team.intro}
          </p>
        </div>

        {featured && (
          <div className="mb-6">
            <TeamCard person={featured} variant="featured" />
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {rest.map((person) => (
            <TeamCard key={person.id} person={person} />
          ))}
        </div>
      </Container>
    </section>
  );
}
