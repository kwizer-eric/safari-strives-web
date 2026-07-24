import type { Metadata } from "next";
import { MarketingChrome } from "@/components/layout/MarketingChrome";
import { ArticleDetail } from "@/components/sections/ArticleDetail";
import { ArticleRelated } from "@/components/sections/ArticleRelated";
import { getArticleById } from "@/lib/content";

type ArticleDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const { article } = await getArticleById(id);
    return {
      title: `${article.title} | Field Notes`,
      description: article.excerpt,
    };
  } catch {
    return {};
  }
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { id } = await params;
  const { article, related } = await getArticleById(id);

  return (
    <MarketingChrome solid>
      <main>
        <ArticleDetail article={article} />
        <ArticleRelated articles={related} />
      </main>
    </MarketingChrome>
  );
}
