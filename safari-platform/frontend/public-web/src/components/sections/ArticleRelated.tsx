import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@safari/ui";
import type { Article } from "@/types/content";
import { BlogCard } from "@/components/ui/BlogCard";

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
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <h2
            id="related-articles-heading"
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            More to explore
          </h2>
          <Link
            href="/field-notes"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
          >
            View all articles
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
