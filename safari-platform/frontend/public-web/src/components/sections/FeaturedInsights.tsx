import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@safari/ui";
import { articles } from "@/data/articles";
import { home } from "@/data/home";
import { BlogCard } from "@/components/ui/BlogCard";

export function FeaturedInsights() {
  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="bg-cream py-16 md:py-24"
    >
      <Container>
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <h2
            id="insights-heading"
            className="text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {home.featuredInsights.title}
          </h2>
          <Link
            href="/field-notes"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
          >
            View all field notes
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
