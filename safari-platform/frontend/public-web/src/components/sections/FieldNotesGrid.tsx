import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@safari/ui";
import {
  articleCategories,
  articles,
  getFeaturedArticle,
  type Article,
} from "@/data/articles";

function NoteCard({
  article,
  variant = "default",
}: {
  article: Article;
  variant?: "default" | "wide" | "tall";
}) {
  const isWide = variant === "wide";
  const isTall = variant === "tall";

  return (
    <Link
      href={`/field-notes/${article.id}`}
      className={`group relative flex overflow-hidden rounded-[var(--radius-card)] border border-border bg-white transition-all duration-500 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 ${
        isWide ? "flex-col md:flex-row md:items-stretch" : "flex-col"
      } ${isTall ? "md:row-span-2" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-cream ${
          isWide
            ? "aspect-[16/10] md:aspect-auto md:w-2/5"
            : isTall
              ? "aspect-[4/3] md:aspect-auto md:min-h-[220px] md:flex-1"
              : "aspect-[5/3]"
        }`}
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={
            isWide
              ? "(max-width: 768px) 100vw, 40vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
      </div>

      <div
        className={`flex flex-1 flex-col gap-3 p-6 ${isWide ? "md:justify-center md:p-8" : ""}`}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-accent">
            {article.category}
          </span>
          <span className="text-muted">{article.date}</span>
        </div>

        <h3
          className={`font-bold leading-snug text-foreground ${
            isWide ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {article.title}
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-muted line-clamp-3">
          {article.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-2">
          <span className="text-xs font-medium text-muted">{article.readTime}</span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
            Read note
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function FieldNotesGrid() {
  const featured = getFeaturedArticle();
  const rest = articles.filter((a) => a.id !== featured.id);
  const [second, third, ...remaining] = rest;

  return (
    <section
      aria-labelledby="field-notes-grid-heading"
      className="border-t border-border bg-background py-16 md:py-24"
    >
      <Container>
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
              All dispatches
            </p>
            <h2
              id="field-notes-grid-heading"
              className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
            >
              From the field
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {articleCategories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-border bg-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {second && (
            <div className="lg:col-span-2">
              <NoteCard article={second} variant="wide" />
            </div>
          )}
          {third && <NoteCard article={third} variant="tall" />}
          {remaining.map((article) => (
            <NoteCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
