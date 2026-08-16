import { Container } from "@safari/ui";
import { PressCard } from "@/components/ui/PressCard";
import type { PressItem } from "@/types/content";

type PressSectionProps = {
  items: PressItem[];
  contactEmail: string;
};

const DEFAULT_PRESS_EMAIL = "safaristrives@gmail.com";

export function PressSection({ items, contactEmail }: PressSectionProps) {
  const email = contactEmail.trim() || DEFAULT_PRESS_EMAIL;

  return (
    <section
      aria-labelledby="press-heading"
      className="bg-background pb-16 md:pb-24"
    >
      <Container>
        <div className="mb-10 md:mb-12">
          <h2
            id="press-heading"
            className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Press
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Updates, announcements, and media resources from Safari Strives.
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <PressCard key={item.id} item={item} />
            ))}
          </div>
        ) : null}

        <div className={items.length > 0 ? "mt-16 md:mt-24" : "mt-2"}>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            Media inquiries
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            For interviews, press requests, or speaking opportunities, contact{" "}
            <a
              href={`mailto:${email}`}
              className="font-semibold text-foreground underline-offset-4 hover:text-accent hover:underline"
            >
              {email}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
