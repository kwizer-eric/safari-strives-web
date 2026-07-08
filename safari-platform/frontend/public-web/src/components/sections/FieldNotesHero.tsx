import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, NotebookPen } from "lucide-react";
import { Container } from "@safari/ui";
import {
  articles,
  fieldNotesPage,
  getFeaturedArticle,
  type Article,
} from "@/data/articles";

function FeaturedCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/field-notes/${article.id}`}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white shadow-xl shadow-black/5 transition-transform duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Latest
          </span>
          <h2 className="text-balance text-xl font-bold leading-snug text-white md:text-2xl lg:text-3xl">
            {article.title}
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted">
          <span className="text-accent">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.date}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
          Read
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}

export function FieldNotesHero() {
  const featured = getFeaturedArticle();

  return (
    <section
      aria-labelledby="field-notes-hero-heading"
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24"
      style={{
        background:
          "linear-gradient(165deg, #f9f9f7 0%, #f3f3f1 45%, #ecefe8 100%)",
      }}
    >
      {/* Notebook margin line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[10%] top-0 hidden w-px bg-accent/25 md:block lg:left-[14%]"
      />

      {/* Ruled lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent, transparent 39px, rgba(106, 142, 95, 0.35) 39px, rgba(106, 142, 95, 0.35) 40px)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      />

      {/* Accent glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-accent-hover/10 blur-3xl"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/70 px-4 py-2 backdrop-blur">
              <NotebookPen className="h-4 w-4 text-accent" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                {fieldNotesPage.eyebrow}
              </span>
            </div>

            <h1
              id="field-notes-hero-heading"
              className="mb-6 text-balance text-5xl font-bold leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl"
            >
              <span className="block">{fieldNotesPage.headline.split(" ")[0]}</span>
              <span className="block text-accent">
                {fieldNotesPage.headline.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="mb-8 max-w-lg text-base leading-relaxed text-muted md:text-lg">
              {fieldNotesPage.subhead}
            </p>

            <div className="flex flex-wrap gap-3">
              {["Rubavu, Rwanda", `${articles.length} dispatches`, "Updated weekly"].map(
                (label) => (
                  <span
                    key={label}
                    className="rounded-full border border-border bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted"
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>

          <FeaturedCard article={featured} />
        </div>
      </Container>
    </section>
  );
}
