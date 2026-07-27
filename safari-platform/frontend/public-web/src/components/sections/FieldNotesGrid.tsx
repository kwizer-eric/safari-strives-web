import { Container } from "@safari/ui";
import { BlogCard } from "@/components/ui/BlogCard";
import { FeaturedArticleCard } from "@/components/ui/FeaturedArticleCard";
import type { Article } from "@/types/content";
import { latestArticles } from "@/lib/cms";

type FieldNotesGridProps = {
  articles: Article[];
};

export function FieldNotesGrid({ articles }: FieldNotesGridProps) {
  const featured = latestArticles(articles, 1)[0];
  const rest = articles.filter((article) => article.id !== featured?.id);

  if (!featured) {
    return (
      <section
        aria-labelledby="field-notes-grid-heading"
        className="bg-background pt-28 pb-16 md:pt-36 md:pb-24"
      >
        <Container>
          <h1
            id="field-notes-grid-heading"
            className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Field Notes
          </h1>
          <p className="mt-4 text-base text-muted md:text-lg">
            No field notes published yet. Check back soon.
          </p>
        </Container>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="field-notes-grid-heading"
      className="bg-background pt-28 pb-16 md:pt-36 md:pb-24"
    >
      <Container>
        <FeaturedArticleCard article={featured} />

        <div className="mb-10 mt-16 md:mb-12 md:mt-24">
          <h2
            id="field-notes-grid-heading"
            className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Latest Insights
            <br />
            and Trends
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
