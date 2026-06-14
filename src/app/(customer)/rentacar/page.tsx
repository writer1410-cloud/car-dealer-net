import Image from "next/image";
import Link from "next/link";
import {
  DAY_PLANS,
  STAY_PLANS,
  INBOUND_PLANS,
} from "@/lib/rentacar";
import { photoByTags } from "@/lib/images";
import { Card, SectionTitle } from "@/components/ui";
import { PlanCard } from "@/components/PlanCard";

export const metadata = {
  title: "レンタカープラン | 神戸マツダ ぐるっと点検ネット",
};

export default function RentacarPage() {
  return (
    <div>
      {/* ヒーロー */}
      <section className="relative h-[60vh] min-h-[400px] max-h-[560px] overflow-hidden">
        <Image
          src={photoByTags("japan,roadtrip,car", "rentacar-hero-drive", 1600, 900)}
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
                神戸空港の国際化を見据えた訪日対応プランもご用意。
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/rentacar/day"
                  className="rounded-xl bg-accent text-white font-black px-6 py-3 shadow-xl hover:bg-accent-dark transition"
                >
                  日帰りプラン →
                </Link>
                <Link
                  href="/rentacar/stay"
                  className="rounded-xl bg-white/15 text-white font-bold px-6 py-3 backdrop-blur border border-white/30 hover:bg-white/25 transition"
                >
                  宿泊プラン →
                </Link>
              </div>
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
              { emoji: "🚗", title: "最新のマツダ車", body: "気持ちよく走るマツダ車を、軽自動車からSUVまで。" },
              { emoji: "🎟️", title: "観光クーポン付き", body: "提携スポットの入場・グルメ割引クーポンがセット。" },
              { emoji: "🌏", title: "訪日のお客様も安心", body: "神戸空港受取・多言語サポートのインバウンドプラン。" },
            ].map((f) => (
              <Card key={f.title} className="p-5">
                <div className="text-3xl">{f.emoji}</div>
                <h3 className="mt-2 font-black">{f.title}</h3>
                <p className="mt-1 text-sm text-ink/65 leading-relaxed">{f.body}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* プランタイプへの導線 */}
        <section className="mx-auto max-w-6xl px-4 py-10 grid gap-5 md:grid-cols-2">
          <Link href="/rentacar/day" className="group">
            <div className="relative h-44 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
              <Image src={photoByTags("japan,daytrip,nature", "rentacar-day", 800, 400)} alt="日帰りプラン" fill sizes="50vw" className="object-cover group-hover:scale-105 transition duration-500" />
              <div className="photo-overlay absolute inset-0" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-black text-white">日帰りプラン</h3>
                <p className="text-sm text-white/80">朝出発・夜帰着。観光地とめぐる{DAY_PLANS.length}プラン →</p>
              </div>
            </div>
          </Link>
          <Link href="/rentacar/stay" className="group">
            <div className="relative h-44 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition">
              <Image src={photoByTags("onsen,resort,japan", "rentacar-stay", 800, 400)} alt="宿泊プラン" fill sizes="50vw" className="object-cover group-hover:scale-105 transition duration-500" />
              <div className="photo-overlay absolute inset-0" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-black text-white">宿泊プラン</h3>
                <p className="text-sm text-white/80">温泉も絶景も。泊まりで楽しむ{STAY_PLANS.length}プラン →</p>
              </div>
            </div>
          </Link>
        </section>

        {/* インバウンド向け */}
        <section className="bg-white border-y border-mist">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <SectionTitle
              eyebrow="FOR INTERNATIONAL VISITORS / 訪日のお客様へ"
              title="神戸空港から、はじまる兵庫の旅。"
              desc="神戸空港の国際化を見据え、空港でのレンタル・多言語サポート付きの
              インバウンド向けプランをご用意。到着その日から快適にドライブを。"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {INBOUND_PLANS.map((p) => (
                <PlanCard key={p.id} plan={p} />
              ))}
            </div>
          </div>
        </section>

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
