import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articlePhoto, CATEGORY_EMOJI } from "@/lib/articles";
import { getArticles, getArticleById } from "@/lib/content";
import { getStore } from "@/lib/stores";
import { Badge, Card } from "@/components/ui";

export const dynamic = "force-dynamic";

// オフライン静的書き出し（build:offline）で全記事ページを事前生成するため
export function generateStaticParams() {
  return getArticles().map((a) => ({ id: a.id }));
}

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getArticleById(id);
  if (!article) notFound();

  const store = article.relatedStoreId
    ? getStore(article.relatedStoreId)
    : undefined;

  // 関連記事（同カテゴリ or 同エリア）
  const related = getArticles().filter(
    (a) =>
      a.id !== article.id &&
      (a.category === article.category || a.area === article.area),
  ).slice(0, 3);

  return (
    <div>
      {/* フォトヒーロー */}
      <section className="relative h-[55vh] min-h-[360px] max-h-[520px] overflow-hidden">
        <Image
          src={articlePhoto(article, 1600, 900)}
          alt={article.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="photo-overlay-side absolute inset-0" />
        <div className="relative h-full flex flex-col justify-end pb-10 px-4">
          <div className="mx-auto max-w-3xl w-full">
            <Link href="/media" className="text-white/70 text-sm hover:text-white">
              ← 特集一覧へ戻る
            </Link>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge tone="accent">
                {CATEGORY_EMOJI[article.category]} {article.category}
              </Badge>
              <span className="text-white/75 text-sm">{article.area}エリア</span>
              <span className="text-white/55 text-sm">{article.date}</span>
            </div>
            <h1 className="mt-2 text-3xl md:text-4xl font-black text-white leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-lg text-ink/75 leading-relaxed border-l-4 border-accent pl-4 mb-10">
          {article.excerpt}
        </p>

        {article.sections.map((s) => (
          <section key={s.heading} className="mb-9">
            <h2 className="text-xl font-black mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-accent rounded-full inline-block" />
              {s.heading}
            </h2>
            <p className="text-ink/75 leading-loose">{s.body}</p>
          </section>
        ))}

        {/* タグ */}
        <div className="flex flex-wrap gap-2 mb-10">
          {article.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-mist px-3 py-1 text-xs text-ink/60"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* 関連店舗で点検への導線 */}
        {store && (
          <Card className="p-6 bg-gradient-to-br from-ink to-graphite text-white mb-10">
            <p className="text-amber-300 font-bold text-sm mb-1">
              おでかけのついでに
            </p>
            <h3 className="text-xl font-black">
              {store.name}で車検・点検はいかが？
            </h3>
            <p className="mt-2 text-white/75 text-sm">
              この記事のエリアには神戸マツダ{store.name}があります。
              お出かけの合間に点検を済ませて、午後はゆっくり観光を。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/availability?area=${store.area}`}
                className="rounded-xl bg-accent text-white font-bold px-5 py-2.5 hover:bg-accent-dark transition"
              >
                空き状況をさがす →
              </Link>
              <Link
                href={`/stores/${store.id}`}
                className="rounded-xl bg-white/15 text-white font-bold px-5 py-2.5 backdrop-blur border border-white/25 hover:bg-white/25 transition"
              >
                {store.name}を見る
              </Link>
            </div>
          </Card>
        )}
      </article>

      {/* 関連記事 */}
      {related.length > 0 && (
        <section className="bg-white border-t border-mist">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <h2 className="text-xl font-black mb-5">こちらの記事もおすすめ</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((a) => (
                <Link key={a.id} href={`/media/${a.id}`} className="group">
                  <div className="rounded-2xl overflow-hidden bg-white border border-mist shadow-sm hover:shadow-lg transition">
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={articlePhoto(a, 600, 400)}
                        alt={a.title}
                        fill
                        sizes="(max-width:640px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <Badge tone="neutral">
                        {CATEGORY_EMOJI[a.category]} {a.category}
                      </Badge>
                      <h3 className="mt-2 font-bold text-sm leading-snug">
                        {a.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
