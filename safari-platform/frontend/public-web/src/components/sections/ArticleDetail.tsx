import Image from "next/image";
import { Container } from "@safari/ui";
import type { Article, ArticleBlock } from "@/data/articles";

type ArticleDetailProps = {
  article: Article;
};

function renderBlock(block: ArticleBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={index}
          className="text-base leading-relaxed text-muted md:text-[1.0625rem] md:leading-8"
        >
          {block.text}
        </p>
      );
    case "heading":
      if (block.level === 2) {
        return (
          <h2
            key={index}
            id={block.id}
            className="scroll-mt-32 pt-8 text-2xl font-bold tracking-tight text-foreground first:pt-0 md:text-[1.75rem]"
          >
            {block.text}
          </h2>
        );
      }
      return (
        <h3
          key={index}
          id={block.id}
          className="scroll-mt-32 pt-6 text-lg font-bold tracking-tight text-foreground md:text-xl"
        >
          {block.text}
        </h3>
      );
    case "list":
      return (
        <ul
          key={index}
          className="list-disc space-y-2 pl-5 text-base leading-relaxed text-muted md:text-[1.0625rem] md:leading-8"
        >
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-2 border-accent pl-5 text-lg font-medium leading-relaxed text-foreground md:text-xl"
        >
          &ldquo;{block.text}&rdquo;
        </blockquote>
      );
    default:
      return null;
  }
}

export function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <article aria-labelledby="article-detail-heading">
      <Container className="pt-28 pb-16 md:pt-36 md:pb-20">
        <header className="mx-auto max-w-5xl text-center">
          <time
            dateTime={article.date}
            className="mb-5 block text-sm text-muted"
          >
            {article.date}
          </time>

          <h1
            id="article-detail-heading"
            className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-[3.25rem]"
          >
            {article.title}
          </h1>

          <p className="mx-auto mt-5 max-w-4xl text-lg leading-relaxed text-muted md:text-xl md:leading-8">
            {article.excerpt}
          </p>
        </header>

        <div className="relative mx-auto mt-10 min-h-[520px] w-full max-w-5xl overflow-hidden rounded-2xl md:mt-14 md:min-h-[600px]">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1024px"
          />
        </div>

        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-6">
          {article.sections.map((block, index) => renderBlock(block, index))}
        </div>
      </Container>
    </article>
  );
}
