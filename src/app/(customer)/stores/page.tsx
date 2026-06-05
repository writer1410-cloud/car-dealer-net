import Image from "next/image";
import Link from "next/link";
import { STORES, THEME_COLORS } from "@/lib/stores";
import { Badge } from "@/components/ui";

export const metadata = {
  title: "店舗・おでかけスポット | 神戸マツダ ぐるっと点検ネット",
};

export default function StoresPage() {
  return (
    <div>
      {/* ページヘッダー */}
      <section className="bg-gradient-to-br from-jet via-ink to-graphite text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-amber-300 font-bold text-sm tracking-wide mb-1">
            店舗・おでかけ
          </p>
          <h1 className="text-3xl md:text-4xl font-black">
            点検のついでに、兵庫を楽しもう。
          </h1>
          <p className="mt-3 text-white/70 max-w-xl">
            各店舗のまわりには、グルメ・観光・遊びのスポットがいっぱい。
            点検が終わるまでの時間も、旅の一部に。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          {STORES.map((s) => {
            const theme = THEME_COLORS[s.theme];
            return (
              <div
                key={s.id}
                className="group rounded-2xl overflow-hidden bg-white border border-mist shadow-sm hover:shadow-xl transition duration-300"
              >
                {/* 写真ヘッダー */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={s.photo}
                    alt={s.name}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                    unoptimized={false}
                  />
                  <div className="photo-overlay absolute inset-0" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge tone={s.theme === "sea" ? "sea" : s.theme === "mountain" ? "mountain" : "harbor"}>
                        {theme.label}
                      </Badge>
                      <span className="text-xs text-white/70">{s.area}エリア</span>
                    </div>
                    <h2 className="text-2xl font-black text-white">{s.name}</h2>
                    <p className="text-sm text-white/80 mt-0.5">{s.city}</p>
                  </div>
                </div>

                {/* コンテンツ */}
                <div className="p-5">
                  <p className="text-sm text-ink/70 leading-relaxed mb-4">
                    {s.catch}
                  </p>
                  <p className="text-xs font-bold text-ink/50 mb-2">近隣のおでかけスポット</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {s.spots.map((sp) => (
                      <span
                        key={sp.name}
                        className="inline-flex items-center gap-1 rounded-full bg-platinum border border-mist px-2.5 py-1 text-xs text-ink/70"
                      >
                        {sp.emoji} {sp.name}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/stores/${s.id}`}
                      className="flex-1 text-center rounded-xl bg-ink text-white font-bold px-4 py-2.5 hover:bg-graphite transition"
                    >
                      くわしく見る
                    </Link>
                    <Link
                      href={`/availability?area=${s.area}`}
                      className="flex-1 text-center rounded-xl bg-accent text-white font-bold px-4 py-2.5 hover:bg-accent-dark transition"
                    >
                      空きをさがす
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
