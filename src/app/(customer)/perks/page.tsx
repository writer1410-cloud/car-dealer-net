import Image from "next/image";
import Link from "next/link";
import {
  STORES,
  PARTNER_ORGS,
  EBIKE_BRAND,
  TOTAL_EBIKES,
  TOTAL_COUPONS,
} from "@/lib/stores";
import { photoByTags } from "@/lib/images";
import { Badge, Card, SectionTitle } from "@/components/ui";

export const metadata = {
  title: "おでかけ特典・地域連携 | 神戸マツダ ぐるっと点検ネット",
};

const IMG = (tags: string, seed: string, w = 1200, h = 800) =>
  photoByTags(tags, seed, w, h);

const couponToneByPartner = (p: string) =>
  p === "自治体" ? "sea" : p === "商工会議所" ? "harbor" : "mountain";

export default function PerksPage() {
  // 全店舗のクーポンをフラット化（店舗名つき）
  const allCoupons = STORES.flatMap((s) =>
    s.coupons.map((c) => ({ ...c, storeName: s.name, storeId: s.id, area: s.area })),
  );

  const govCount = PARTNER_ORGS.filter((o) => o.type === "自治体").length;
  const cciCount = PARTNER_ORGS.filter((o) => o.type === "商工会議所").length;

  return (
    <div>
      {/* ══════ ヒーロー ══════ */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[560px] overflow-hidden">
        <Image
          src={IMG("cycling,bicycle", "perks-hero-cycling", 1600, 900)}
          alt="電動自転車でおでかけ"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="photo-overlay-side absolute inset-0" />
        <div className="relative h-full flex flex-col justify-center px-4">
          <div className="mx-auto max-w-6xl w-full">
            <div className="max-w-xl">
              <span className="inline-block bg-accent text-white text-xs font-black px-3 py-1 rounded-full mb-4">
                午後予約は、もっとおトク。
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                点検の時間を、
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100">
                  まちを楽しむ時間に。
                </span>
              </h1>
              <p className="mt-4 text-white/85 text-base md:text-lg max-w-md leading-relaxed">
                午後枠のご予約には、提携スポットのクーポンと、おしゃれな
                電動自転車の無料レンタル。クルマを預けて、身軽に兵庫をめぐろう。
              </p>
              <Link
                href="/availability"
                className="mt-6 inline-block rounded-xl bg-accent text-white font-black px-7 py-3.5 shadow-xl hover:bg-accent-dark transition"
              >
                午後の空きをさがす →
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" className="w-full fill-platinum" preserveAspectRatio="none" height="40">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* ══════ 3つの特典サマリー ══════ */}
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6 border-t-4 border-harbor">
            <div className="text-3xl">🎟️</div>
            <p className="mt-2 text-3xl font-black text-harbor">{TOTAL_COUPONS}<span className="text-base">種</span></p>
            <p className="text-sm font-bold mt-1">午後予約クーポン</p>
            <p className="text-xs text-ink/55 mt-1">提携スポットでつかえる特典</p>
          </Card>
          <Card className="p-6 border-t-4 border-mountain">
            <div className="text-3xl">🚲</div>
            <p className="mt-2 text-3xl font-black text-mountain">{TOTAL_EBIKES}<span className="text-base">台</span></p>
            <p className="text-sm font-bold mt-1">電動自転車を無料貸出</p>
            <p className="text-xs text-ink/55 mt-1">「{EBIKE_BRAND}」全店配備</p>
          </Card>
          <Card className="p-6 border-t-4 border-sea">
            <div className="text-3xl">🤝</div>
            <p className="mt-2 text-3xl font-black text-sea">{govCount + cciCount}<span className="text-base">団体</span></p>
            <p className="text-sm font-bold mt-1">自治体・商工会議所と連携</p>
            <p className="text-xs text-ink/55 mt-1">相互送客で地域活性化</p>
          </Card>
        </div>
      </section>

      {/* ══════ ① 午後予約クーポン ══════ */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle
          eyebrow="特典① 午後予約クーポン"
          title="午後に予約するだけで、まちのクーポンがもらえる。"
          desc="混雑の少ない午後枠でのご予約に、近隣の提携スポット・自治体・商工会議所と
          連携したクーポンを発行。点検待ちのおでかけが、もっとおトクで楽しくなります。"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allCoupons.map((c, i) => (
            <Card key={`${c.storeId}-${i}`} className="p-0 overflow-hidden">
              <div className="flex">
                {/* 左：切り取り風のミシン目 */}
                <div className="w-2 bg-gradient-to-b from-accent to-accent-dark shrink-0" />
                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-2xl">{c.emoji}</span>
                    <Badge tone={couponToneByPartner(c.partner)}>{c.partner}</Badge>
                  </div>
                  <p className="mt-2 font-black text-sm leading-snug">{c.benefit}</p>
                  <p className="mt-1 text-xs text-ink/55">{c.spot}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-dashed border-mist pt-2">
                    <span className="text-[11px] text-ink/45">
                      {c.storeName}で午後予約
                    </span>
                    <Link
                      href={`/availability?area=${c.area}`}
                      className="text-[11px] font-bold text-accent hover:underline"
                    >
                      予約する →
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink/45">
          ※ クーポンは午後枠（13:00以降）のご予約完了でマイページに発行（デモ）。内容は予告なく変更される場合があります。
        </p>
      </section>

      {/* ══════ ② 電動自転車 無料貸し出し ══════ */}
      <section className="bg-white border-y border-mist">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 lg:grid-cols-2 items-center">
          <div className="relative h-72 lg:h-96 rounded-2xl overflow-hidden shadow-lg order-1 lg:order-2">
            <Image
              src={IMG("electricbike,bicycle", "perks-ebike", 900, 700)}
              alt="おしゃれな電動アシスト自転車"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-mountain text-white text-xs font-black px-3 py-1 rounded-full">
                全店 {TOTAL_EBIKES}台 配備
              </span>
            </div>
          </div>
          <div className="order-2 lg:order-1">
            <p className="text-accent font-bold text-sm tracking-wide mb-1">
              特典② 電動自転車の無料レンタル
            </p>
            <h2 className="text-2xl md:text-3xl font-black">
              クルマを預けたら、
              <br />「{EBIKE_BRAND}」で身軽にめぐろう。
            </h2>
            <p className="mt-3 text-ink/65 leading-relaxed">
              点検でクルマを預けている間も、おでかけは止まらない。
              各店舗に配備したおしゃれな電動アシスト自転車を無料で貸し出します。
              坂道の多い神戸も、城下町の姫路も、海沿いの明石も、スイスイ快適に。
            </p>
            <ul className="mt-4 space-y-2">
              {[
                ["🆓", "点検・車検のお客様は貸出料無料（〜3時間）"],
                ["📱", "アプリで施錠・解錠できるスマートロック搭載"],
                ["🪖", "ヘルメット・かごつきで安心、お子様乗せタイプも"],
                ["🔋", "電動アシストで坂道も楽々、航続たっぷり"],
              ].map(([e, t]) => (
                <li key={t} className="flex items-start gap-2 text-sm text-ink/75">
                  <span className="text-lg leading-none">{e}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 店舗別 配備台数 */}
        <div className="mx-auto max-w-6xl px-4 pb-12">
          <p className="text-xs font-bold text-ink/50 mb-2">店舗別 配備台数</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {STORES.map((s) => (
              <Link
                key={s.id}
                href={`/stores/${s.id}`}
                className="rounded-xl border border-mist bg-platinum p-3 text-center hover:border-mountain/40 hover:shadow-sm transition"
              >
                <div className="text-xl">🚲</div>
                <div className="text-sm font-black mt-1">{s.name}</div>
                <div className="text-mountain font-black">{s.ebikes}台</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ ③ 自治体・商工会議所連携 ══════ */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <SectionTitle
          eyebrow="特典③ 地域連携・相互送客"
          title="まちと一緒に、兵庫をもっと元気に。"
          desc="自治体・商工会議所・観光協会と連携し、お客様をまちへ、まちのお客様を店舗へ。
          「相互送客」で地域全体ににぎわいを生み出し、地域活性化を目指します。"
        />

        {/* 相互送客フロー */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          {[
            {
              emoji: "🚗→🏯",
              title: "店舗 → まち",
              body: "点検でご来店のお客様に、午後クーポンと電動自転車でまちのスポットへお出かけいただく。",
              color: "border-accent",
            },
            {
              emoji: "🏯→🚗",
              title: "まち → 店舗",
              body: "自治体・商工会議所の観光案内やイベントから、神戸マツダの「ついで点検」へ送客。",
              color: "border-sea",
            },
            {
              emoji: "🤝",
              title: "地域全体が活性化",
              body: "人の流れが生まれ、消費が回り、まちと店舗がともににぎわう好循環へ。",
              color: "border-mountain",
            },
          ].map((f) => (
            <Card key={f.title} className={`p-5 border-l-4 ${f.color}`}>
              <div className="text-2xl">{f.emoji}</div>
              <h3 className="mt-2 font-black">{f.title}</h3>
              <p className="mt-1 text-sm text-ink/65 leading-relaxed">{f.body}</p>
            </Card>
          ))}
        </div>

        {/* 連携団体 */}
        <Card className="p-6">
          <h3 className="font-black mb-4">連携する自治体・団体（予定）</h3>
          <div className="flex flex-wrap gap-2">
            {PARTNER_ORGS.map((o) => (
              <span
                key={o.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-mist bg-platinum px-3 py-1.5 text-sm font-medium text-ink/75"
              >
                <span>{o.emoji}</span>
                {o.name}
                <span className="text-[10px] text-ink/40">{o.type}</span>
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs text-ink/45">
            ※ 連携団体・取り組み内容はイメージです。実際の提携は協議のうえ決定します。
          </p>
        </Card>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="bg-gradient-to-br from-jet via-ink to-graphite text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-black">
            さあ、午後の予約でおトクにおでかけ。
          </h2>
          <p className="mt-3 text-white/70">
            クーポンも、電動自転車も、まちの楽しみも。点検のついでに、ぜんぶ。
          </p>
          <Link
            href="/availability"
            className="mt-6 inline-block rounded-xl bg-accent text-white font-black px-8 py-3.5 shadow-xl hover:bg-accent-dark transition"
          >
            空き店舗をさがす →
          </Link>
        </div>
      </section>
    </div>
  );
}
