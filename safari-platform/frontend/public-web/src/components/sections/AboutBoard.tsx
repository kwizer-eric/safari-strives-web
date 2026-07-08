import Image from "next/image";
import { Container } from "@safari/ui";
import { aboutPage, boardMembers } from "@/data/about";

export function AboutBoard() {
  const { board } = aboutPage;

  return (
    <section
      id="board"
      aria-labelledby="about-board-heading"
      className="scroll-mt-28 border-y border-border bg-background py-20 md:py-28"
    >
      <Container>
        <div className="mb-12 grid gap-8 md:mb-16 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              {board.eyebrow}
            </p>
            <h2
              id="about-board-heading"
              className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              {board.title}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-muted md:col-span-8 md:text-lg">
            {board.intro}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {boardMembers.map((member) => (
            <article
              key={member.id}
              className="group flex gap-5 rounded-[var(--radius-card)] border border-border bg-cream p-6 transition-colors hover:border-accent/40 md:p-8"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-accent/20 bg-white">
                <Image
                  src={member.image}
                  alt={member.imageAlt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  {member.role}
                </p>
                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                  {member.location}
                </p>
                <p className="text-sm leading-relaxed text-muted">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
