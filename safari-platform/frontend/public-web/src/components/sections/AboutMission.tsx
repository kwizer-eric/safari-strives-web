import { ArrowUpRight } from "lucide-react";
import { Container } from "@safari/ui";
import type { AboutPagePayload } from "@/types/content";

const missionTextClass = "text-base leading-relaxed text-muted md:text-lg";

type AboutMissionProps = {
  mission: AboutPagePayload["mission"];
};

export function AboutMission({ mission }: AboutMissionProps) {

  return (
    <section
      id="mission"
      aria-labelledby="about-mission-heading"
      className="relative z-10 scroll-mt-28 bg-white py-24 md:py-32"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-20">
          <div>
            <h2
              id="about-mission-heading"
              className="text-base font-bold leading-relaxed text-accent md:text-lg"
            >
              {mission.label}
            </h2>
          </div>

          <div className={`space-y-5 ${missionTextClass}`}>
            {mission.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div>
            <h3 className="text-base font-bold leading-relaxed text-accent md:text-lg">
              {mission.practitionerLed.label}
            </h3>
          </div>

          <div className={missionTextClass}>
            <p>{mission.practitionerLed.body}</p>
          </div>

          <div className="hidden lg:block" aria-hidden="true" />

          <div className="border-t border-border">
            {mission.locations.map((location) => (
              <article
                key={location.place}
                className="grid gap-3 border-b border-border py-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.6fr)_auto] md:items-center md:gap-8 md:py-6"
              >
                <h3 className="text-sm text-foreground">{location.label}</h3>
                <p className="text-sm text-muted">{location.region}</p>
                <p className="text-sm text-muted">{location.place}</p>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-foreground"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
