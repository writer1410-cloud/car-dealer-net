import Link from "next/link";
import { notFound } from "next/navigation";
import { STORES, getStore } from "@/lib/stores";
import { DATES, formatDate, openSlots } from "@/lib/schedule";
import { staffOfStore, helpersForStore } from "@/lib/staff";
import { Badge, Card } from "@/components/ui";
import { Spot } from "@/lib/types";

export function generateStaticParams() {
  return STORES.map((s) => ({ id: s.id }));
}

const catOrder: Spot["category"][] = ["グルメ", "観光", "遊び", "ショッピング"];
const catEmoji: Record<Spot["category"], string> = {
  グルメ: "🍴",
  観光: "📸",
  遊び: "🎡",
  ショッピング: "🛍️",
};

export default async function StoreDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = getStore(id);
  if (!store) notFound();

  const upcoming = DATES.slice(0, 7).map((d) => ({
    date: d,
    ...openSlots(store.id, d),
  }));
  const home = staffOfStore(store.id);
  const helpers = helpersForStore(store.id);

  const grouped = catOrder
    .map((cat) => ({ cat, items: store.spots.filter((s) => s.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <div>
      {/* ヒーロー */}
      <section className="relative bg-gradient-to-br from-soul-dark via-soul to-soul-light text-white">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_80%_20%,white_2px,transparent_2px)] [background-size:26px_26px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-14">
          <Link
            href="/stores"
            className="text-white/70 text-sm hover:text-white"
          >
            ← 店舗一覧へ
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-black">{store.name}</h1>
            <Badge tone="neutral">
              <span className="text-soul">{store.area}エリア</span>
            </Badge>
          </div>
          <p className="mt-3 max-w-2xl text-white/90 text-lg">{store.catch}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/80">
            <span>📍 {store.address}</span>
            <span>☎️ {store.tel}</span>
            <span>🔧 整備ピット {store.bays} 基</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 lg:grid-cols-3">
        {/* メイン：おでかけスポット */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-black mb-1">
            点検待ちが、ちょっとした旅になる。
          </h2>
          <p className="text-ink/60 mb-6">
            {store.name}の周辺で楽しめる、とっておきのスポットをご紹介します。
          </p>

          {grouped.map((g) => (
            <div key={g.cat} className="mb-8">
              <h3 className="text-lg font-black mb-3 flex items-center gap-2">
                <span>{catEmoji[g.cat]}</span>
                {g.cat}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {g.items.map((sp) => (
                  <Card key={sp.name} className="p-5">
                    <div className="text-3xl">{sp.emoji}</div>
                    <h4 className="mt-2 font-black">{sp.name}</h4>
                    <p className="mt-1 text-sm text-ink/65 leading-relaxed">
                      {sp.description}
                    </p>
                    <p className="mt-2 text-xs text-soul font-bold">
                      🚗 {sp.access}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* サイド：空き状況 + スタッフ */}
        <aside className="space-y-6">
          <Card className="p-5">
            <h3 className="font-black mb-3">直近1週間の空き状況</h3>
            <ul className="space-y-2">
              {upcoming.map((u) => (
                <li
                  key={u.date}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-ink/70">{formatDate(u.date)}</span>
                  <span className="flex gap-2">
                    <Badge tone={u.am > 0 ? "warn" : "bad"}>
                      AM {u.am}
                    </Badge>
                    <Badge tone={u.pm >= 3 ? "good" : "neutral"}>
                      PM {u.pm}
                    </Badge>
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href="/availability"
              className="mt-4 block text-center rounded-xl bg-soul text-white font-bold px-4 py-2.5 hover:bg-soul-dark transition"
            >
              この店舗で予約する
            </Link>
            <p className="mt-2 text-xs text-ink/50 text-center">
              午後(PM)は待ち時間が少なくおすすめです
            </p>
          </Card>

          <Card className="p-5">
            <h3 className="font-black mb-3">スタッフ体制</h3>
            <p className="text-sm text-ink/70">
              所属スタッフ{" "}
              <span className="font-black text-soul">{home.length}名</span>
            </p>
            <ul className="mt-2 space-y-1 text-sm text-ink/70">
              {home.map((s) => (
                <li key={s.id}>
                  ・{s.name}（{s.grade}）
                </li>
              ))}
            </ul>
            {helpers.length > 0 && (
              <p className="mt-3 text-xs text-ink/50">
                繁忙日は近隣店舗から最大{helpers.length}名の応援が可能です。
              </p>
            )}
          </Card>
        </aside>
      </div>
    </div>
  );
}
