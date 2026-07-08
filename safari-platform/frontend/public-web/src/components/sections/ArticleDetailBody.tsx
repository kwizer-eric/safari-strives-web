import { Container } from "@safari/ui";
import type { Article } from "@/data/articles";

type ArticleDetailBodyProps = {
  article: Article;
};

export function ArticleDetailBody({ article }: ArticleDetailBodyProps) {
  const [lead, ...rest] = article.body;

  return (
    <section aria-label="Article content" className="bg-cream py-16 md:py-24">
      <Container>
        <div className="mx-auto grid max-w-3xl gap-10 md:grid-cols-12 md:gap-16">
          <aside className="md:col-span-3">
            <div className="sticky top-28 space-y-6">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
                  Category
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {article.category}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
                  Published
                </p>
                <p className="text-sm text-muted">{article.date}</p>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
                  Author
                </p>
                <p className="text-sm text-muted">{article.author}</p>
              </div>
              <div className="hidden border-l-2 border-accent/40 pl-4 md:block">
                <p className="text-xs leading-relaxed text-muted">
                  Field notes are written from the ground in Rubavu — on ventures,
                  operations, and the infrastructure we are building together.
                </p>
              </div>
            </div>
          </aside>

          <div className="md:col-span-9">
            <p className="mb-8 text-xl leading-relaxed text-foreground md:text-2xl md:leading-relaxed">
              <span className="float-left mr-3 mt-1 font-serif text-5xl leading-none text-accent md:text-6xl">
                {lead.charAt(0)}
              </span>
              {lead.slice(1)}
            </p>

            {article.pullQuote && (
              <blockquote className="relative my-10 border-l-4 border-accent bg-white/70 px-6 py-5 md:px-8 md:py-6">
                <p className="text-lg font-semibold leading-relaxed text-foreground md:text-xl">
                  &ldquo;{article.pullQuote}&rdquo;
                </p>
              </blockquote>
            )}

            <div className="flex flex-col gap-6">
              {rest.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-muted md:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
