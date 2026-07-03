import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stats = [
  {
    value: "+120",
    label: "Communities helped in the last 15 years.",
  },
  {
    value: "+2m$",
    label: "Raised in the past 15 years.",
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-cream py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="About us"
          title="A nonprofit organisation"
          actionLabel="Learn more"
          actionHref="#"
        />

        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <h3
              id="about-heading"
              className="mb-4 text-xl font-bold text-foreground"
            >
              Our mission
            </h3>
            <p className="text-base leading-relaxed text-muted">
              At Safari Strives, our mission is to support underserved
              communities through education, healthcare, and economic development
              initiatives. With a focus on sustainability and collaboration, we
              aim to uplift individuals and families, giving them the tools to
              thrive.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-foreground">
              Why support us?
            </h3>
            <p className="text-base leading-relaxed text-muted">
              By donating to Safari Strives, you&apos;re directly impacting the
              lives of families, helping to fund education, provide healthcare,
              and support critical community projects. Your generosity allows us
              to continue our mission and expand our reach.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-foreground">
              The beginning of our story
            </h3>
            <p className="text-base leading-relaxed text-muted">
              Founded in 2010, Safari Strives began with a small team of
              dedicated volunteers who wanted to make a difference in their local
              community. Since then, we&apos;ve grown into a global nonprofit,
              operating in over 15 countries and impacting thousands of lives
              each year.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {stats.map((stat) => (
            <div
              key={stat.value}
              className="rounded-[var(--radius-card)] bg-card py-8"
            >
              <p className="mb-2 text-4xl font-bold text-foreground md:text-5xl">
                {stat.value}
              </p>
              <p className="text-base text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
