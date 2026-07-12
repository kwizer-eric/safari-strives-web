import Link from "next/link";
import { Container } from "@safari/ui";
import { articles } from "@/data/articles";
import { home } from "@/data/home";
import { BlogCard } from "@/components/ui/BlogCard";

export function FeaturedInsights() {
  return (
    <section
      id="insights"
      aria-labelledby="insights-heading"
      className="relative z-20 bg-cream py-16 md:py-24"
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
            className="group inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-[#dbe8d6] px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white"
          >
            View more
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
