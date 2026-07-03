import { articles } from "@/data/articles";
import { home } from "@/data/home";
import { Container } from "@/components/layout/Container";
import { BlogCard } from "@/components/ui/BlogCard";

export function FeaturedInsights() {
  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="bg-cream py-16 md:py-24"
    >
      <Container>
        <h2
          id="insights-heading"
          className="mb-10 text-3xl font-bold tracking-tight text-foreground md:mb-12 md:text-4xl"
        >
          {home.featuredInsights.title}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
