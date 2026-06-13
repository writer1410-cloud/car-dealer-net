import Link from "next/link";
import { DAY_PLANS } from "@/lib/rentacar";
import { SectionTitle } from "@/components/ui";
import { PlanCard } from "@/components/PlanCard";

export const metadata = {
  title: "日帰りレンタカープラン | 神戸マツダ",
};

export default function DayPlansPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-jet via-ink to-graphite text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <Link href="/rentacar" className="text-white/70 text-sm hover:text-white">
            ← レンタカートップへ
          </Link>
          <p className="mt-3 text-amber-300 font-bold text-sm tracking-wide mb-1">
            日帰りレンタカープラン
          </p>
          <h1 className="text-3xl md:text-4xl font-black">
            朝出発、夜帰着。気軽に兵庫ドライブ。
          </h1>
          <p className="mt-3 text-white/70 max-w-xl">
            人気の観光地と、入場・グルメクーポンがセットになったお得な日帰りプラン。
            点検のついでにレンタカーで、観光も一緒に楽しめます。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <SectionTitle eyebrow="DAY TRIP" title={`全${DAY_PLANS.length}プラン`} />
        <div className="grid gap-6 md:grid-cols-2">
          {DAY_PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/rentacar/stay"
            className="inline-block rounded-xl bg-ink text-white font-bold px-6 py-3 hover:bg-graphite transition"
          >
            宿泊プランも見る →
          </Link>
        </div>
      </div>
    </div>
  );
}
