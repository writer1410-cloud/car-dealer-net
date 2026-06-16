import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { THEME_COLORS, EBIKE_BRAND } from "@/lib/stores";
import { imageFor, categoryTags } from "@/lib/images";
import { getStoreResolved, getStoresResolved } from "@/lib/content";
import { DATES, formatDate, openSlots } from "@/lib/schedule";
import { staffOfStore } from "@/lib/staff";
import { Badge, Card } from "@/components/ui";
import { TravelTimes } from "@/components/TravelTimes";
import { Spot } from "@/lib/types";

export const dynamic = "force-dynamic";

// オフライン静的書き出し（build:offline）で全店舗ページを事前生成するため
export function generateStaticParams() {
  return getStoresResolved().map((s) => ({ id: s.id }));
}

const catOrder: Spot["category"][] = ["グルメ", "観光", "遊び", "ショッピング"];

export default async function StoreDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const store = getStoreResolved(id);
  if (!store) notFound();

  const theme = THEME_COLORS[store.theme];
  const upcoming = DATES.slice(0, 7).map((d) => ({
    date: d,
    ...openSlots(store.id, d),
  }));
  const home = staffOfStore(store.id);

  const grouped = catOrder
    .map((cat) => ({
      cat,
      items: store.spots.filter((s) => s.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  const themeGradient =
    store.theme === "sea"
      ? "from-sea-dark via-sea to-sea/70"
      : store.theme === "mountain"
        ? "from-mountain-dark via-mountain to-mountain/70"
        : "from-harbor-dark via-harbor to-harbor/70";

  return (
    <div>
      {/* ══════ フォトヒーロー ══════ */}
      <section className="relative h-[65vh] min-h-[420px] max-h-[600px] overflow-hidden">
        <Image
          src={store.photo}
          alt={store.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="photo-overlay-side absolute inset-0" />

        <div className="relative h-full flex flex-col justify-end pb-10 px-4">
          <div className="mx-auto max-w-6xl w-full">
            <Link
              href="/stores"
              className="text-white/70 text-sm hover:text-white mb-4 inline-block"
            >
              ← 店舗一覧へ戻る
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <Badge tone={store.theme === "sea" ? "sea" : store.theme === "mountain" ? "mountain" : "harbor"}>
                {theme.label}
              </Badge>
              <span className="text-white/70 text-sm">{store.area}エリア</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white">
              {store.name}
            </h1>
            <p className="mt-2 text-white/85 text-lg max-w-lg">{store.catch}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/70">
              <span>📍 {store.address}</span>
              <span>☎️ {store.tel}</span>
              <span>🔧 ピット {store.bays} 基</span>
            </div>
          </div>
        </div>
      </section>

      {/* テーマカラーのアクセントバー */}
      <div className={`h-1.5 bg-gradient-to-r ${themeGradient}`} />

      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 lg:grid-cols-3">
        {/* メイン：おでかけスポット */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-black mb-1">
            点検待ちが、ちょっとした旅になる。
          </h2>
          <p className="text-ink/60 mb-8">
            {store.name}の周辺で楽しめる、とっておきのスポットをご紹介します。
          </p>

          {grouped.map((g) => (
            <div key={g.cat} className="mb-10">
              <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <span className="text-2xl">
                  {g.cat === "グルメ"
                    ? "🍴"
                    : g.cat === "観光"
                      ? "📸"
                      : g.cat === "遊び"
                        ? "🎡"
                        : "🛍️"}
                </span>
                {g.cat}
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {g.items.map((sp) => {
                  const photo =
                    sp.photo ??
                    imageFor(
                      sp.name,
                      categoryTags(sp.category),
                      "spot-" + sp.name,
                      600,
                      400,
                    );
                  return (
                    <div
                      key={sp.name}
                      className="group rounded-2xl overflow-hidden bg-white border border-mist shadow-sm hover:shadow-lg transition duration-300"
                    >
                      {/* スポット写真 */}
                      <div className="relative h-36 overflow-hidden">
                        <Image
                          src={photo}
                          alt={sp.name}
                          fill
                          sizes="(max-width:640px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="photo-overlay absolute inset-0 opacity-60" />
                        <div className="absolute bottom-3 left-3">
                          <span className="text-2xl">{sp.emoji}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-black text-sm">{sp.name}</h4>
                        <p className="mt-1 text-xs text-ink/65 leading-relaxed">
                          {sp.description}
                        </p>
                        <TravelTimes access={sp.access} className="mt-2" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* サイド：空き状況 + スタッフ */}
        <aside className="space-y-5">
          <Card className="p-5 border-t-4 border-accent">
            <h3 className="font-black mb-3">直近1週間の空き状況</h3>
            <ul className="space-y-2">
              {upcoming.map((u) => (
                <li
                  key={u.date}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-ink/70">{formatDate(u.date)}</span>
                  <span className="flex gap-1.5">
                    <Badge tone={u.am > 0 ? "warn" : "bad"}>AM {u.am}</Badge>
                    <Badge tone={u.pm >= 3 ? "good" : "neutral"}>PM {u.pm}</Badge>
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href={`/availability?area=${store.area}`}
              className="mt-4 block text-center rounded-xl bg-accent text-white font-bold px-4 py-2.5 hover:bg-accent-dark transition"
            >
              この店舗で予約する
            </Link>
            <p className="mt-2 text-xs text-ink/50 text-center">
              午後(PM)は待ち時間が少なくおすすめです
            </p>
          </Card>

          {/* 午後予約クーポン */}
          <Card className="p-5 border-t-4 border-harbor">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-black">🎟️ 午後予約クーポン</h3>
              <Badge tone="harbor">午後枠限定</Badge>
            </div>
            <ul className="space-y-2">
              {store.coupons.map((c) => (
                <li
                  key={c.spot}
                  className="flex items-start gap-2 text-sm"
                >
                  <span className="text-lg leading-none">{c.emoji}</span>
                  <span>
                    <span className="font-bold">{c.benefit}</span>
                    <span className="block text-xs text-ink/50">
                      {c.spot}・{c.partner}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink/45 border-t border-mist pt-3">
              午後枠（13:00以降）のご予約完了で発行されます。
            </p>
          </Card>

          {/* 電動自転車 */}
          <Card className="p-5 border-t-4 border-mountain">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-black">🚲 電動自転車 無料貸出</h3>
              <Badge tone="mountain">{store.ebikes}台</Badge>
            </div>
            <p className="text-sm text-ink/70 leading-relaxed">
              点検・車検のお客様は、おしゃれな電動アシスト自転車「{EBIKE_BRAND}」を
              無料でご利用いただけます。クルマを預けて、身軽に周辺スポットへ。
            </p>
            <Link
              href="/perks"
              className="mt-3 inline-block text-sm font-bold text-mountain hover:underline"
            >
              特典をくわしく見る →
            </Link>
          </Card>

          <Card className="p-5">
            <h3 className="font-black mb-3">スタッフ体制</h3>
            <p className="text-sm text-ink/70">
              所属スタッフ{" "}
              <span className="font-black text-ink">{home.length}名</span>
            </p>
            <ul className="mt-2 space-y-1 text-sm text-ink/65">
              {home.map((s) => (
                <li key={s.id}>
                  ・{s.name}（{s.grade}）
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </div>
  );
}
