import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/articles";

type FeaturedArticleCardProps = {
  article: Article;
};

export function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
  return (
    <Link
      href={`/field-notes/${article.id}`}
      className="group relative mb-16 block min-h-[680px] overflow-hidden rounded-2xl md:mb-24 md:min-h-[780px]"
    >
      <Image
        src={article.image}
        alt={article.imageAlt}
        fill
        priority
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-dark/55" />

      <span className="absolute left-6 top-6 rounded-full border border-white/30 bg-black/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm md:left-8 md:top-8">
        Featured
      </span>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-6 md:flex-row md:items-end md:justify-between md:p-8">
        <div className="max-w-2xl">
          <span className="mb-4 inline-block rounded-full border border-white/40 px-4 py-1.5 text-xs font-medium text-white">
            {article.date}
          </span>
          <h3 className="text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
            {article.title}
          </h3>
        </div>

        <span className="inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-[#d4e6db] px-6 py-3 text-sm font-semibold text-foreground transition-colors group-hover:bg-white">
          Learn more
        </span>
      </div>
    </Link>
  );
}
