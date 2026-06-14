import { getArticles } from "@/lib/content";
import { MediaBrowser } from "@/components/MediaBrowser";

export const dynamic = "force-dynamic";
export const metadata = { title: "兵庫おでかけ特集 | 神戸マツダ" };

export default function MediaPage() {
  const articles = getArticles();

  return (
    <div>
      {/* ヘッダー */}
      <section className="bg-gradient-to-br from-jet via-ink to-graphite text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-amber-300 font-bold text-sm tracking-wide mb-1">
            兵庫おでかけ特集
          </p>
          <h1 className="text-3xl md:text-4xl font-black">
            兵庫の「いいとこ」、見つけよう。
          </h1>
          <p className="mt-3 text-white/70 max-w-xl">
            観光スポット、話題のお店、人気のパン屋さん。神戸マツダ編集部が、
            兵庫のおでかけ情報をお届けします。
          </p>
        </div>
      </section>

      <MediaBrowser articles={articles} />
    </div>
  );
}
