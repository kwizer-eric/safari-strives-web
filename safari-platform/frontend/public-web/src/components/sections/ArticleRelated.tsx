import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@safari/ui";
import type { Article } from "@/data/articles";

type ArticleRelatedProps = {
  articles: Article[];
};

export function ArticleRelated({ articles }: ArticleRelatedProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-articles-heading"
      className="border-t border-border bg-background py-16 md:py-24"
    >
      <Container>
        <div className="mb-10 md:mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Keep reading
          </p>
          <h2
            id="related-articles-heading"
            className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            More from the field
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/field-notes/${article.id}`}
              className="group flex flex-col rounded-[var(--radius-card)] border border-border bg-card p-6 transition-colors hover:border-accent/40"
            >
              <span className="mb-3 inline-block w-fit rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                {article.category}
              </span>
              <h3 className="mb-3 text-lg font-bold leading-snug text-foreground">
                {article.title}
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted line-clamp-2">
                {article.excerpt}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                Read note
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
