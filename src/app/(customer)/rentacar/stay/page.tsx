import Link from "next/link";
import { STAY_PLANS } from "@/lib/rentacar";
import { SectionTitle } from "@/components/ui";
import { PlanCard } from "@/components/PlanCard";

export const metadata = {
  title: "宿泊レンタカープラン | 神戸マツダ",
};

export default function StayPlansPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-jet via-ink to-graphite text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <Link href="/rentacar" className="text-white/70 text-sm hover:text-white">
            ← レンタカートップへ
          </Link>
          <p className="mt-3 text-amber-300 font-bold text-sm tracking-wide mb-1">
            宿泊レンタカープラン
          </p>
          <h1 className="text-3xl md:text-4xl font-black">
            温泉も絶景も。泊まりで楽しむ兵庫の旅。
          </h1>
          <p className="mt-3 text-white/70 max-w-xl">
            レンタカー＋宿泊＋観光がセットになった、ちょっと贅沢な1泊2日プラン。
            城崎温泉や淡路島で、ゆったりとした時間を。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <SectionTitle eyebrow="OVERNIGHT" title={`全${STAY_PLANS.length}プラン`} />
        <div className="grid gap-6 md:grid-cols-2">
          {STAY_PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/rentacar/day"
            className="inline-block rounded-xl bg-ink text-white font-bold px-6 py-3 hover:bg-graphite transition"
          >
            日帰りプランも見る →
          </Link>
        </div>
      </div>
    </div>
  );
}
