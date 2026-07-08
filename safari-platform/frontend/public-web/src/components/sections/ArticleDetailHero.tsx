import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@safari/ui";
import type { Article } from "@/data/articles";

type ArticleDetailHeroProps = {
  article: Article;
};

export function ArticleDetailHero({ article }: ArticleDetailHeroProps) {
  return (
    <section
      aria-labelledby="article-detail-heading"
      className="relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-dark/70" />
      </div>

      <Container className="relative flex min-h-[70vh] flex-col justify-between pb-16 pt-32 md:min-h-[75vh] md:pb-20">
        <Link
          href="/field-notes"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All field notes
        </Link>

        <div className="max-w-4xl">
          <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-white/80">
            <span className="rounded-full bg-accent px-3 py-1 text-white">
              {article.category}
            </span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{article.author}</span>
          </div>

          <h1
            id="article-detail-heading"
            className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {article.title}
          </h1>
        </div>
      </Container>
    </section>
  );
}
