import Image from "next/image";
import Link from "next/link";
import {
  DAY_PLANS,
  STAY_PLANS,
  RentalPlan,
  planPhoto,
  formatYen,
} from "@/lib/rentacar";
import { getStore, pic } from "@/lib/stores";
import { Badge, Card, SectionTitle } from "@/components/ui";

export const metadata = {
  title: "レンタカープラン | 神戸マツダ ぐるっと点検ネット",
};

export default function RentacarPage() {
  return (
    <div>
      {/* ヒーロー */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[560px] overflow-hidden">
        <Image
          src={pic("rentacar-hero-drive", 1600, 900)}
          alt="レンタカーで兵庫ドライブ"
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
                神戸マツダ レンタカー
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
                マツダ車で、
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-100">
                  兵庫をドライブ。
                </span>
              </h1>
              <p className="mt-4 text-white/85 text-base md:text-lg max-w-md leading-relaxed">
                観光スポットとセットでおトクな日帰り＆宿泊プラン。
                最新のマツダ車で、兵庫のおでかけを存分に楽しめます。
              </p>
              <Link
                href="#plans"
                className="mt-6 inline-block rounded-xl bg-accent text-white font-black px-7 py-3.5 shadow-xl hover:bg-accent-dark transition"
              >
                プランを見る →
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

      <div className="bg-platinum">
        {/* 特長 */}
        <section className="mx-auto max-w-6xl px-4 pt-12 pb-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { emoji: "🚗", title: "最新のマツダ車", body: "気持ちよく走るマツダ車を、軽自動車からミドルクラスまで。" },
              { emoji: "🎟️", title: "観光クーポン付き", body: "提携スポットの入場・グルメ割引クーポンがセット。" },
              { emoji: "🛠️", title: "点検とセットでおトク", body: "車検・点検のご利用で、レンタカー料金を特別価格に。" },
            ].map((f) => (
              <Card key={f.title} className="p-5">
                <div className="text-3xl">{f.emoji}</div>
                <h3 className="mt-2 font-black">{f.title}</h3>
                <p className="mt-1 text-sm text-ink/65 leading-relaxed">{f.body}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* 日帰りプラン */}
        <section id="plans" className="mx-auto max-w-6xl px-4 py-12">
          <SectionTitle
            eyebrow="日帰りレンタカープラン"
            title="観光スポットとめぐる、お得な日帰りドライブ。"
            desc="人気の観光地と入場・グルメクーポンがセットになった日帰りプラン。朝に出発して、夜には帰着できます。"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {DAY_PLANS.map((p) => (
              <PlanCard key={p.id} plan={p} />
            ))}
          </div>
        </section>

        {/* 宿泊プラン */}
        <section className="bg-white border-y border-mist">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <SectionTitle
              eyebrow="宿泊レンタカープラン"
              title="温泉も絶景も。泊まりで楽しむ兵庫の旅。"
              desc="レンタカー＋宿泊＋観光がセットになった、ちょっと贅沢な1泊2日プラン。"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {STAY_PLANS.map((p) => (
                <PlanCard key={p.id} plan={p} />
              ))}
            </div>
          </div>
        </section>

        {/* 注意書き */}
        <section className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-xs text-ink/45 leading-relaxed">
            ※ 掲載の料金・内容はデモ用のイメージです。車種・期間・繁忙期により料金は変動します。
            別途ガソリン代が必要です。ご予約・空き状況は各店舗へお問い合わせください。
          </p>
        </section>
      </div>
    </div>
  );
}

function PlanCard({ plan }: { plan: RentalPlan }) {
  const store = getStore(plan.fromStoreId);
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative h-48">
        <Image
          src={planPhoto(plan, 800, 500)}
          alt={plan.name}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="photo-overlay absolute inset-0" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge tone={plan.type === "日帰り" ? "sea" : "harbor"}>
            {plan.type}
          </Badge>
          {plan.badge && <Badge tone="accent">{plan.badge}</Badge>}
        </div>
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <p className="text-xs text-white/80">{plan.area}エリア</p>
          <h3 className="text-lg font-black leading-snug">{plan.name}</h3>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-sm text-ink/70">{plan.catch}</p>

        <div className="mt-3 flex items-end gap-1">
          <span className="text-2xl font-black text-accent">
            {formatYen(plan.price)}
          </span>
          <span className="text-xs text-ink/50 mb-1">{plan.priceNote}</span>
        </div>
        <p className="text-xs text-ink/50">車種：{plan.carClass}</p>

        <div className="mt-4">
          <p className="text-xs font-bold text-ink/50 mb-1">プランに含まれるもの</p>
          <ul className="space-y-1">
            {plan.includes.map((inc) => (
              <li key={inc} className="text-sm text-ink/75 flex items-start gap-1.5">
                <span className="text-mountain mt-0.5 shrink-0">✓</span>
                {inc}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <p className="text-xs font-bold text-ink/50 mb-1">めぐれるスポット</p>
          <div className="flex flex-wrap gap-1.5">
            {plan.spots.map((s) => (
              <span
                key={s}
                className="rounded-full bg-mist px-2.5 py-1 text-xs text-ink/70"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button className="flex-1 rounded-xl bg-accent text-white font-bold px-4 py-2.5 hover:bg-accent-dark transition">
            このプランを予約（デモ）
          </button>
          {store && (
            <Link
              href={`/stores/${store.id}`}
              className="rounded-xl border border-mist font-bold px-4 py-2.5 hover:bg-mist transition whitespace-nowrap"
            >
              出発店舗
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}
