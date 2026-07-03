import { articles } from "@/data/articles";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogCard } from "@/components/ui/BlogCard";

export function Blog() {
  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="bg-cream py-16 md:py-24"
    >
      <Container>
        <SectionHeading
          eyebrow="Our latest articles"
          title="Discover more about our world"
          actionLabel="See all"
          actionHref="#"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      </Container>
    </section>
  );
}
