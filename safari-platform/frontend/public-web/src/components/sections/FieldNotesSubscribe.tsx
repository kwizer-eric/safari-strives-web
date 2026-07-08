import { Button, Container } from "@safari/ui";
import { site } from "@/data/site";

export function FieldNotesSubscribe() {
  return (
    <section
      aria-labelledby="field-notes-subscribe-heading"
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-hover) 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-white/8 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/85">
            Stay close to the work
          </p>
          <h2
            id="field-notes-subscribe-heading"
            className="mb-4 text-balance text-3xl font-bold leading-tight text-white md:text-4xl"
          >
            New field notes land here first.
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white/85 md:text-lg">
            Follow along as ventures, the hub, and the lab grow. Reach out anytime
            — we read every message from founders and partners.
          </p>
          <Button
            href={`mailto:${site.email}`}
            variant="primary"
            showArrow
            className="bg-white px-8 py-3.5 text-base text-accent-hover shadow-xl shadow-black/10 hover:bg-cream hover:text-accent"
          >
            Write to us
          </Button>
        </div>
      </Container>
    </section>
  );
}
