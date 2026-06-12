import Image from "next/image";
import Link from "next/link";
import { networkSummary } from "@/lib/optimizer";
import {
  STORES,
  THEME_COLORS,
  TOTAL_COUPONS,
  TOTAL_EBIKES,
  EBIKE_BRAND,
  pic,
} from "@/lib/stores";
import { Card, SectionTitle, CATEGORY_PHOTOS } from "@/components/ui";

/* ─── エリアタイルのデータ ─── */
const AREAS = [
  {
    name: "神戸・阪神エリア",
    sub: "港・海・グルメ",
    desc: "神戸ハーバー・南京町・異人館…海風と異国情緒の街をめぐりながら。",
    area: "神戸",
    photo: pic("area-kobe-hanshin", 900, 600),
    fallback: "#075985",
    tag: "sea" as const,
    emoji: "⛵",
    stores: ["神戸本店", "灘店", "垂水多聞店", "西宮店"],
  },
  {
    name: "播磨・但馬・淡路エリア",
    sub: "城・自然・名物グルメ",
    desc: "姫路城・明石海峡・城崎温泉・淡路うずしお…播磨から但馬・淡路まで。",
    area: "西播磨",
    photo: pic("area-harima-tajima-awaji", 900, 600),
    fallback: "#15803d",
    tag: "mountain" as const,
    emoji: "🏯",
    stores: ["姫路店", "大久保店", "豊岡店", "洲本店"],
  },
];

/* ─── スポットカテゴリタイルのデータ ─── */
const SPOT_CATS = [
  {
    cat: "グルメ",
    emoji: "🍴",
    desc: "明石焼き・神戸スイーツ・加古川かつめし",
    color: "#d97706",
  },
  {
    cat: "観光・歴史",
    emoji: "📸",
    desc: "姫路城・神戸異人館・播磨の古刹",
    color: "#0284c7",
  },
  {
    cat: "遊び・体験",
    emoji: "🎡",
    desc: "甲子園・セントラルパーク・スポーツの森",
    color: "#16a34a",
  },
  {
    cat: "ショッピング",
    emoji: "🛍️",
    desc: "ハーバーランド・ガーデンズ・キューズモール",
    color: "#7c3aed",
  },
];

export default function Home() {
  const sum = networkSummary();

  return (
    <div className="bg-platinum">
      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section className="relative h-[90vh] min-h-[560px] max-h-[820px] overflow-hidden">
        <Image
          src={pic("hero-kobe-port", 1600, 1000)}
          alt="兵庫の風景"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* 左→右のグラデオーバーレイ */}
        <div className="photo-overlay-side absolute inset-0" />

        <div className="relative h-full flex flex-col justify-center px-4">
          <div className="mx-auto max-w-6xl w-full">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block bg-accent text-white text-xs font-black px-3 py-1 rounded-full">
                  兵庫 × 神戸マツダ
                </span>
                <span className="text-white/80 text-sm">
                  {sum.storeCount}店舗ネットワーク
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black leading-tight text-white">
                兵庫を楽しみながら、
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100">
                  点検も済ませよう。
                </span>
              </h1>
              <p className="mt-5 text-white/80 text-base md:text-lg leading-relaxed max-w-md">
                姫路に行く日は姫路で。神戸に出かける日は神戸で。
                お出かけ先の神戸マツダで車検・点検が受けられます。
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/availability"
                  className="rounded-xl bg-accent text-white font-black px-7 py-3.5 shadow-xl hover:bg-accent-dark transition text-base"
                >
                  空き店舗をさがす →
                </Link>
                <Link
                  href="/stores"
                  className="rounded-xl bg-white/15 text-white font-bold px-6 py-3.5 backdrop-blur border border-white/30 hover:bg-white/25 transition"
                >
                  店舗・おでかけスポット
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 下部の波形区切り */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-platinum" preserveAspectRatio="none" height="40">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ════════════════ エリアから選ぶ ════════════════ */}
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-10">
        <SectionTitle
          eyebrow="エリアから選ぶ"
          title="どこへ行く？そこで点検。"
          desc="目的地に近い店舗をまとめました。出発前に予約して、観光の合間に点検を。"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {AREAS.map((a) => (
            <Link key={a.name} href={`/availability?area=${a.area}`}>
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
                  空きを見る →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════ 点検待ちの過ごし方（カテゴリタイル）════════════════ */}
      <section className="bg-white border-y border-mist">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle
            eyebrow="点検待ちの時間、何しよう？"
            title="神戸マツダのまわりは、遊びが豊富。"
            desc="各店舗の近くには、グルメ・観光・遊びのスポットがたくさん。
            点検が終わるまでの時間も、旅の一部に。"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SPOT_CATS.map((c) => (
              <Link key={c.cat} href="/stores">
                <div className="group relative overflow-hidden rounded-2xl h-44 shadow-sm hover:shadow-xl transition duration-300">
                  <Image
                    src={CATEGORY_PHOTOS[c.cat] ?? CATEGORY_PHOTOS["観光"]}
                    alt={c.cat}
                    fill
                    sizes="(max-width:640px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="photo-overlay absolute inset-0" />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <div className="text-2xl mb-1">{c.emoji}</div>
                    <div className="text-base font-black text-white">
                      {c.cat}
                    </div>
                    <div className="text-[11px] text-white/70 leading-tight mt-0.5">
                      {c.desc}
                    </div>
                  </div>
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-80"
                    style={{ background: c.color }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ 午前偏重の数字 ════════════════ */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle
          eyebrow="THE PROBLEM → SOLUTION"
          title="予約は午前に集中。午後はぽっかり空いている。"
          desc="「出かける前に済ませたい」という気持ちはよく分かります。でも実は、
          午後の方が待ち時間がずっと少ないんです。"
        />
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6 border-l-4 border-accent">
            <p className="text-sm text-ink/60">ネットワーク全体・午前の稼働率</p>
            <p className="mt-1 text-5xl font-black text-accent">
              {(sum.amUtil * 100).toFixed(0)}
              <span className="text-2xl">%</span>
            </p>
            <p className="mt-2 text-sm text-ink/60">
              午前枠は満杯になりがち。
            </p>
          </Card>
          <Card className="p-6 border-l-4 border-mountain">
            <p className="text-sm text-ink/60">ネットワーク全体・午後の稼働率</p>
            <p className="mt-1 text-5xl font-black text-mountain">
              {(sum.pmUtil * 100).toFixed(0)}
              <span className="text-2xl">%</span>
            </p>
            <p className="mt-2 text-sm text-ink/60">
              午後はピットもスタッフも余裕。待ち時間が短い。
            </p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-ink to-graphite text-white">
            <p className="text-sm text-white/60">
              午後を選ぶとこんなに違う
            </p>
            <p className="mt-1 text-3xl font-black">
              待ち時間を
              <span className="text-amber-300"> 最短 </span>
              に。
            </p>
            <p className="mt-2 text-sm text-white/70">
              AIが空きの多い店舗・時間帯を自動でおすすめします。
            </p>
            <Link
              href="/availability"
              className="mt-3 inline-block rounded-lg bg-accent text-white font-bold px-4 py-2 text-sm hover:bg-accent-dark transition"
            >
              今すぐ確認 →
            </Link>
          </Card>
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
            午後の予約は、こんなにおトク。
          </h2>
          <p className="mt-2 text-white/70 max-w-2xl">
            空いている午後枠を選ぶと、まちのクーポンと電動自転車の無料レンタル。
            自治体・商工会議所とも連携し、地域ぐるみでお出かけを応援します。
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                emoji: "🎟️",
                stat: `${TOTAL_COUPONS}種`,
                title: "午後予約クーポン",
                body: "近隣の提携スポット・自治体・商工会議所のクーポンを発行。グルメや観光がおトクに。",
                color: "text-harbor",
              },
              {
                emoji: "🚲",
                stat: `${TOTAL_EBIKES}台`,
                title: "電動自転車を無料貸出",
                body: `おしゃれな電動アシスト自転車「${EBIKE_BRAND}」を全店配備。クルマを預けて身軽にめぐろう。`,
                color: "text-mountain",
              },
              {
                emoji: "🤝",
                stat: "地域連携",
                title: "まちと相互送客",
                body: "自治体・商工会議所と協力し、店舗とまちでお客様を送りあい、地域を活性化。",
                color: "text-sea",
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
          <Link
            href="/perks"
            className="mt-8 inline-block rounded-xl bg-accent text-white font-black px-7 py-3.5 shadow-xl hover:bg-accent-dark transition"
          >
            特典・地域連携をくわしく見る →
          </Link>
        </div>
      </section>

      {/* ════════════════ 店舗ネットワーク ════════════════ */}
      <section className="bg-white border-t border-mist">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionTitle
            eyebrow="OUR NETWORK"
            title={`兵庫県内 ${STORES.length} 店舗。あなたの「行き先」のそばに。`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STORES.map((s) => {
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

      {/* ════════════════ 3つの仕組み ════════════════ */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionTitle
          eyebrow="HOW IT WORKS"
          title="複数店舗だからできる、3つの仕組み"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              emoji: "🗺️",
              num: "01",
              title: "お出かけ先で点検",
              body: "目的地のエリアを選ぶと、その近くで空いている店舗をAIが提案。買い物や観光の間に点検が完了。",
              href: "/availability",
              cta: "空きをさがす",
              color: "text-sea",
            },
            {
              emoji: "🌤️",
              num: "02",
              title: "午後の空き枠を活用",
              body: "午後は混雑が少なく、待ち時間もほぼゼロ。AIが午後のおすすめ枠を優先して案内します。",
              href: "/availability",
              cta: "午後の空きを確認",
              color: "text-mountain",
            },
            {
              emoji: "🤝",
              num: "03",
              title: "スタッフが店舗をまたいで動く",
              body: "神戸本店が空いている日は近隣の灘店へ応援。AIが需要に合わせてスタッフ配置を最適化します。",
              href: "/staff",
              cta: "配置を見る",
              color: "text-harbor",
            },
          ].map((f) => (
            <Card key={f.title} className="p-6 flex flex-col hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{f.emoji}</span>
                <span className={`text-4xl font-black ${f.color} opacity-20`}>
                  {f.num}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-black">{f.title}</h3>
              <p className="mt-2 text-sm text-ink/65 leading-relaxed flex-1">
                {f.body}
              </p>
              <Link
                href={f.href}
                className={`mt-4 font-bold text-sm hover:underline ${f.color}`}
              >
                {f.cta} →
              </Link>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
