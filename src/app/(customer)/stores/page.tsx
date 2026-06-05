import Link from "next/link";
import { STORES } from "@/lib/stores";
import { Badge, Card, SectionTitle } from "@/components/ui";

export const metadata = {
  title: "店舗・おでかけスポット | 神戸マツダ ぐるっと点検ネット",
};

export default function StoresPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionTitle
        eyebrow="店舗・おでかけ"
        title="点検のついでに、兵庫を楽しもう。"
        desc="各店舗のまわりには、グルメや観光、遊びのスポットがいっぱい。
        点検を待つ時間も、お出かけの一部に。"
      />

      <div className="grid gap-6 md:grid-cols-2">
        {STORES.map((s) => (
          <Card key={s.id} className="overflow-hidden flex flex-col">
            <div className="bg-gradient-to-br from-soul to-soul-light text-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black">{s.name}</h3>
                <Badge tone="neutral">
                  <span className="text-soul">{s.area}</span>
                </Badge>
              </div>
              <p className="text-sm text-white/80 mt-1">{s.city}</p>
              <p className="text-sm text-white/90 mt-3">{s.catch}</p>
            </div>
            <div className="p-5 flex-1">
              <p className="text-xs font-bold text-ink/50 mb-2">
                近隣のおでかけスポット
              </p>
              <div className="flex flex-wrap gap-2">
                {s.spots.map((sp) => (
                  <span
                    key={sp.name}
                    className="inline-flex items-center gap-1 rounded-full bg-sand px-2.5 py-1 text-xs text-ink/70"
                  >
                    {sp.emoji} {sp.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-5 pt-0 flex gap-2">
              <Link
                href={`/stores/${s.id}`}
                className="flex-1 text-center rounded-xl bg-soul text-white font-bold px-4 py-2.5 hover:bg-soul-dark transition"
              >
                くわしく見る
              </Link>
              <Link
                href="/availability"
                className="flex-1 text-center rounded-xl border border-sand font-bold px-4 py-2.5 hover:bg-sand transition"
              >
                空きをさがす
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
