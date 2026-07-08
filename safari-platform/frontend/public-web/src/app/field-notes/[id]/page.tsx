import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArticleDetailHero } from "@/components/sections/ArticleDetailHero";
import { ArticleDetailBody } from "@/components/sections/ArticleDetailBody";
import { ArticleRelated } from "@/components/sections/ArticleRelated";
import { FieldNotesSubscribe } from "@/components/sections/FieldNotesSubscribe";
import {
  articles,
  getArticleById,
  getOtherArticles,
} from "@/data/articles";

type ArticleDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | Field Notes`,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  const related = getOtherArticles(id);

  return (
    <>
      <Header />
      <main>
        <ArticleDetailHero article={article} />
        <ArticleDetailBody article={article} />
        <ArticleRelated articles={related} />
        <FieldNotesSubscribe />
      </main>
      <Footer />
    </>
  );
}
