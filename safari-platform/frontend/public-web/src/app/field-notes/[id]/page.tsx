import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MarketingChrome } from "@/components/layout/MarketingChrome";
import { ArticleDetail } from "@/components/sections/ArticleDetail";
import { ArticleRelated } from "@/components/sections/ArticleRelated";
import { articleYoutubeWatchUrl } from "@/lib/article-link";
import { getArticleById } from "@/lib/content";

export const dynamic = "force-dynamic";

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

  const watchUrl = articleYoutubeWatchUrl(article);
  if (watchUrl) {
    redirect(watchUrl);
  }

  return (
    <MarketingChrome solid>
      <main>
        <ArticleDetail article={article} />
        <ArticleRelated articles={related} />
      </main>
    </MarketingChrome>
  );
}
