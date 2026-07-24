"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { cn } from "@safari/shared";
import { Container } from "@safari/ui";
import type { AboutPagePayload, AboutPerson } from "@/types/content";

function TeamCard({ person }: { person: AboutPerson }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const resetOnDesktop = () => {
      if (desktopQuery.matches) setExpanded(false);
    };

    desktopQuery.addEventListener("change", resetOnDesktop);
    return () => desktopQuery.removeEventListener("change", resetOnDesktop);
  }, []);

  const handleToggle = () => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setExpanded((open) => !open);
    }
  };

  return (
    <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          expanded ? "pointer-events-none opacity-0" : "opacity-100",
          "md:pointer-events-auto md:opacity-100 md:group-hover:pointer-events-none md:group-hover:opacity-0",
        )}
      >
        <Image
          src={person.image}
          alt={person.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />

        <div className="absolute bottom-0 left-0 p-5">
          <h3 className="text-lg font-bold leading-tight text-white md:text-xl">
            {person.name}
          </h3>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/90 md:text-[11px]">
            {person.role}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-0 flex flex-col bg-[#d4e6db] p-5 transition-opacity duration-500 md:p-6",
          expanded
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
          "md:pointer-events-none md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:opacity-100",
        )}
      >
        <div className="pr-14">
          <h3 className="text-lg font-bold leading-tight text-foreground md:text-xl">
            {person.name}
          </h3>
          <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/80 md:text-[11px]">
            {person.role}
          </p>
        </div>

        <p className="mt-auto text-sm leading-relaxed text-foreground/90 md:text-[15px] md:leading-relaxed">
          {person.bio}
        </p>
      </div>

      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={expanded}
        aria-label={
          expanded ? `Hide bio for ${person.name}` : `Show bio for ${person.name}`
        }
        className={cn(
          "absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          expanded
            ? "bg-foreground text-white"
            : "bg-white text-foreground",
          "md:bg-white md:text-foreground md:group-hover:bg-foreground md:group-hover:text-white",
        )}
      >
        <Plus
          className={cn(
            "h-4 w-4",
            expanded ? "hidden" : "block",
            "md:block md:group-hover:hidden",
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
        <Minus
          className={cn(
            "h-4 w-4",
            expanded ? "block" : "hidden",
            "md:hidden md:group-hover:block",
          )}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>
    </article>
  );
}

type AboutTeamProps = {
  team: AboutPagePayload["team"];
  members: AboutPerson[];
};

export function AboutTeam({ team, members }: AboutTeamProps) {
  return (
    <section
      id="team"
      aria-labelledby="about-team-heading"
      className="relative z-10 scroll-mt-28 bg-background py-20 md:py-28"
    >
      <Container>
        <div className="mb-12 max-w-3xl md:mb-16">
          <h2
            id="about-team-heading"
            className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            {team.title}
          </h2>
          <p className="text-base leading-relaxed text-muted md:text-lg">
            {team.intro.split("\n").map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {members.map((person) => (
            <TeamCard key={person.id} person={person} />
          ))}
        </div>
      </Container>
    </section>
  );
}
