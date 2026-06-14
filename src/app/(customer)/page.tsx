import Image from "next/image";
import Link from "next/link";
import {
  THEME_COLORS,
  TOTAL_COUPONS,
  TOTAL_EBIKES,
  EBIKE_BRAND,
} from "@/lib/stores";
import { Badge, SectionTitle } from "@/components/ui";
import { articlePhoto, CATEGORY_EMOJI } from "@/lib/articles";
import { photoByTags, genreTags } from "@/lib/images";
import { getArticles, getStoresResolved } from "@/lib/content";
import { DAY_PLANS, planPhoto, formatYen } from "@/lib/rentacar";
import {
  featuredSpots,
  SPOTS,
  GENRES,
  GENRE_EMOJI,
  spotPhoto,
} from "@/lib/spots";
import { FeaturedCarousel } from "@/components/FeaturedCarousel";

/* ─── エリアタイルのデータ ─── */
const AREAS = [
  {
    name: "神戸・阪神エリア",
    sub: "港・海・グルメ",
    desc: "神戸ハーバー・南京町・異人館…海風と異国情緒の街をめぐりながら。",
    area: "神戸",
    photo: photoByTags("kobe,harbor,sea", "area-kobe-hanshin", 900, 600),
    tag: "sea" as const,
    emoji: "⛵",
    stores: ["神戸本店", "灘店", "垂水多聞店", "西宮店"],
  },
  {
    name: "播磨・但馬・淡路エリア",
    sub: "城・自然・名物グルメ",
    desc: "姫路城・明石海峡・城崎温泉・淡路うずしお…播磨から但馬・淡路まで。",
    area: "西播磨",
    photo: photoByTags("himeji,castle", "area-harima-tajima-awaji", 900, 600),
    tag: "mountain" as const,
    emoji: "🏯",
    stores: ["姫路店", "大久保店", "豊岡店", "洲本店"],
  },
];

export const dynamic = "force-dynamic";

export default function Home() {
  const articles = getArticles();
  const stores = getStoresResolved();
  // 空きが多いエリアの注目スポットを自動カルーセル表示
  const carousel = featuredSpots(7).map((s) => ({
    name: s.name,
    genre: s.genre,
    genreEmoji: GENRE_EMOJI[s.genre],
    area: s.area,
    description: s.description,
    photo: spotPhoto(s, 1600, 900),
    spotsHref: `/spots?genre=${encodeURIComponent(s.genre)}`,
    bookHref: `/availability?area=${encodeURIComponent(s.area)}`,
  }));

  // ジャンルタイル（代表スポットの写真つき）
  const genreTiles = GENRES.map((g) => {
    const rep = SPOTS.find((s) => s.genre === g);
    return {
      genre: g,
      photo: rep
        ? spotPhoto(rep, 400, 300)
        : photoByTags(genreTags(g), "genre-" + g, 400, 300),
    };
  });

  return (
    <div className="bg-platinum">
      {/* ═══════ ヒーロー：注目スポット自動カルーセル ═══════ */}
      <FeaturedCarousel items={carousel} />

      {/* ════════════════ ジャンルから探す ════════════════ */}
      <section className="bg-white border-b border-mist">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <SectionTitle
            eyebrow="ジャンルでさがす"
            title="今日は、どんな気分？"
            desc="カフェ、ランチ、レジャー…目的のジャンルから兵庫のおでかけスポットを探せます。"
          />
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(100px,1fr))]">
            {genreTiles.map((t) => (
              <Link
                key={t.genre}
                href={`/spots?genre=${encodeURIComponent(t.genre)}`}
                className="group"
              >
                <div className="relative h-24 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition">
                  <Image
                    src={t.photo}
                    alt={t.genre}
                    fill
                    sizes="120px"
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition" />
                  <div className="absolute inset-0 grid place-items-center text-center">
                    <div>
                      <div className="text-2xl">{GENRE_EMOJI[t.genre]}</div>
                      <div className="text-sm font-black text-white drop-shadow">
                        {t.genre}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link href="/spots" className="text-sm font-bold text-accent hover:underline">
              すべてのスポットを見る →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ 兵庫おでかけ特集（記事）════════════════ */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between mb-6 gap-4">
          <SectionTitle
            eyebrow="兵庫おでかけ特集"
            title="兵庫の「いいとこ」、お届けします。"
            desc="観光スポット、話題のお店、人気のパン屋さん。編集部おすすめの記事をピックアップ。"
          />
          <Link
            href="/media"
            className="shrink-0 hidden sm:inline-block text-sm font-bold text-accent hover:underline mb-6"
          >
            すべての記事 →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.filter((a) => a.featured)
            .slice(0, 3)
            .map((a) => (
              <Link key={a.id} href={`/media/${a.id}`} className="group">
                <article className="rounded-2xl overflow-hidden bg-white border border-mist shadow-sm hover:shadow-xl transition duration-300 h-full flex flex-col">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={articlePhoto(a, 600, 400)}
                      alt={a.title}
                      fill
                      sizes="(max-width:640px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge tone="accent">
                        {CATEGORY_EMOJI[a.category]} {a.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="text-xs text-ink/45 mb-1">
                      {a.area}エリア・{a.date}
                    </div>
                    <h3 className="font-black leading-snug">{a.title}</h3>
                    <p className="mt-2 text-sm text-ink/65 leading-relaxed flex-1">
                      {a.excerpt}
                    </p>
                    <span className="mt-3 text-sm font-bold text-accent">
                      記事を読む →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
        </div>
      </section>

      {/* ════════════════ エリアから探す ════════════════ */}
      <section className="bg-white border-y border-mist">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle
            eyebrow="エリアから探す"
            title="どこへ行く？兵庫はみどころだらけ。"
            desc="目的地のエリアを選んで、観光もグルメも。おでかけの合間に点検も済ませられます。"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {AREAS.map((a) => (
              <Link key={a.name} href={`/spots`}>
                <div className="group relative overflow-hidden rounded-2xl h-64 shadow-md hover:shadow-2xl transition duration-300">
                  <Image
                    src={a.photo}
                    alt={a.name}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="photo-overlay absolute inset-0" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{a.emoji}</span>
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                        style={{
                          background:
                            a.tag === "sea"
                              ? "rgba(2,132,199,0.7)"
                              : "rgba(22,163,74,0.7)",
                        }}
                      >
                        {a.sub}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white leading-tight">
                      {a.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/80 leading-relaxed">
                      {a.desc}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {a.stores.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] bg-white/20 text-white rounded px-2 py-0.5 backdrop-blur"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 text-sm font-bold text-white bg-white/20 backdrop-blur rounded-full px-3 py-1 group-hover:bg-accent transition">
                    スポットを見る →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ レンタカープラン ════════════════ */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between mb-6 gap-4">
          <SectionTitle
            eyebrow="神戸マツダ レンタカー"
            title="マツダ車で、もっと遠くへ。"
            desc="観光とセットの日帰り＆宿泊プラン。神戸空港の国際化を見据えた訪日対応プランも。"
          />
          <Link
            href="/rentacar"
            className="shrink-0 hidden sm:inline-block text-sm font-bold text-accent hover:underline mb-6"
          >
            すべてのプラン →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DAY_PLANS.slice(0, 3).map((p) => (
            <Link key={p.id} href="/rentacar/day" className="group">
              <div className="rounded-2xl overflow-hidden bg-white border border-mist shadow-sm hover:shadow-xl transition duration-300 h-full flex flex-col">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={planPhoto(p, 600, 400)}
                    alt={p.name}
                    fill
                    sizes="(max-width:640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="photo-overlay absolute inset-0" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge tone="sea">{p.type}</Badge>
                    {p.badge && <Badge tone="accent">{p.badge}</Badge>}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-xs text-white/80">{p.area}エリア</p>
                    <h3 className="text-base font-black leading-snug">{p.name}</h3>
                  </div>
                </div>
                <div className="p-4 flex items-end justify-between">
                  <div>
                    <span className="text-xl font-black text-accent">
                      {formatYen(p.price)}
                    </span>
                    <span className="text-[11px] text-ink/50"> {p.priceNote}</span>
                  </div>
                  <span className="text-sm font-bold text-accent">詳しく →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <Link href="/rentacar/day" className="rounded-xl bg-ink text-white font-bold px-5 py-2.5 hover:bg-graphite transition">
            日帰りプラン
          </Link>
          <Link href="/rentacar/stay" className="rounded-xl border border-mist bg-white font-bold px-5 py-2.5 hover:bg-mist transition">
            宿泊プラン
          </Link>
        </div>
      </section>

      {/* ════════════════ 午後予約の特典 ════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jet via-ink to-graphite text-white">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_80%_20%,white_2px,transparent_2px)] [background-size:30px_30px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16">
          <p className="text-amber-300 font-bold text-sm tracking-wide mb-1">
            AFTERNOON PERKS
          </p>
          <h2 className="text-2xl md:text-3xl font-black">
            おでかけのついでに、点検も。午後はもっとおトク。
          </h2>
          <p className="mt-2 text-white/70 max-w-2xl">
            空いている午後枠を選ぶと、まちのクーポンと電動自転車の無料レンタル。
            自治体・商工会議所とも連携し、地域ぐるみでお出かけを後押しします。
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                emoji: "🎟️",
                stat: `${TOTAL_COUPONS}種`,
                title: "午後予約クーポン",
                body: "近隣の提携スポット・自治体・商工会議所のクーポンを発行。グルメや観光がおトクに。",
              },
              {
                emoji: "🚲",
                stat: `${TOTAL_EBIKES}台`,
                title: "電動自転車を無料貸出",
                body: `おしゃれな電動アシスト自転車「${EBIKE_BRAND}」を全店配備。クルマを預けて身軽にめぐろう。`,
              },
              {
                emoji: "🤝",
                stat: "地域連携",
                title: "まちと相互送客",
                body: "自治体・商工会議所と協力し、店舗とまちでお客様を送りあい、地域を活性化。",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{p.emoji}</span>
                  <span className="text-2xl font-black text-amber-300">
                    {p.stat}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-black">{p.title}</h3>
                <p className="mt-2 text-sm text-white/75 leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/availability"
              className="rounded-xl bg-accent text-white font-black px-7 py-3.5 shadow-xl hover:bg-accent-dark transition"
            >
              午後の空き店舗をさがす →
            </Link>
            <Link
              href="/perks"
              className="rounded-xl bg-white/15 text-white font-bold px-6 py-3.5 backdrop-blur border border-white/25 hover:bg-white/25 transition"
            >
              特典・地域連携をくわしく
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════ 店舗ネットワーク ════════════════ */}
      <section className="bg-white border-t border-mist">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle
            eyebrow="OUR NETWORK"
            title={`兵庫県内 ${stores.length} 店舗。あなたの「行き先」のそばに。`}
            desc="どのエリアにおでかけしても、近くの神戸マツダで車検・点検が受けられます。"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((s) => {
              const theme = THEME_COLORS[s.theme];
              return (
                <Link key={s.id} href={`/stores/${s.id}`} className="group">
                  <div className="relative overflow-hidden rounded-2xl h-52 shadow-sm hover:shadow-xl transition duration-300">
                    <Image
                      src={s.photo}
                      alt={s.name}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="photo-overlay absolute inset-0" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                          style={{
                            background:
                              s.theme === "sea"
                                ? "rgba(2,132,199,0.75)"
                                : s.theme === "mountain"
                                  ? "rgba(22,163,74,0.75)"
                                  : "rgba(217,119,6,0.75)",
                            color: "#fff",
                          }}
                        >
                          {theme.label}
                        </span>
                        <span className="text-xs text-white/70">{s.area}エリア</span>
                      </div>
                      <h3 className="text-xl font-black text-white">{s.name}</h3>
                      <p className="text-xs text-white/75 mt-0.5 leading-relaxed line-clamp-2">
                        {s.catch}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
