import { projects } from "@/data/projects";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-background py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="Our latest projects"
          title="Safari Strives's impact on communities"
          actionLabel="See all"
          actionHref="#"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
