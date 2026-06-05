"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { recommendStores, AREA_LIST } from "@/lib/optimizer";
import { SERVICE_LIST } from "@/lib/stores";
import { DATES, formatDate, TODAY } from "@/lib/schedule";
import { Area, ServiceType } from "@/lib/types";
import { Badge, Card } from "@/components/ui";

export default function AvailabilityPage() {
  return (
    <Suspense>
      <AvailabilityInner />
    </Suspense>
  );
}

function AvailabilityInner() {
  const params = useSearchParams();
  const initialArea = (params.get("area") as Area) ?? "神戸";
  const [area, setArea] = useState<Area>(initialArea);
  const [date, setDate] = useState<string>(TODAY);
  const [service, setService] = useState<ServiceType>("車検");

const results = useMemo(
    () => recommendStores({ destinationArea: area, date, service }),
    [area, date, service],
  );

  return (
    <div>
      {/* ページヘッダー */}
      <section className="bg-gradient-to-br from-jet via-ink to-graphite text-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-accent font-bold text-sm tracking-wide mb-1">
            空き店舗をさがす
          </p>
          <h1 className="text-2xl md:text-3xl font-black">
            お出かけ先で、点検しよう。
          </h1>
          <p className="mt-2 text-white/70">
            行き先のエリア・希望日・点検内容を選ぶだけ。近くて空いている店舗をAIがおすすめ順にご案内します。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* 検索フォーム */}
        <Card className="p-5 md:p-6 mb-8">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="block">
              <span className="text-sm font-bold text-ink/70 flex items-center gap-1.5">
                🗺️ お出かけ先のエリア
              </span>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value as Area)}
                className="mt-1 w-full rounded-xl border border-mist bg-platinum px-3 py-2.5 font-medium focus:border-ink focus:outline-none"
              >
                {AREA_LIST.map((a) => (
                  <option key={a} value={a}>
                    {a}エリア
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold text-ink/70 flex items-center gap-1.5">
                📅 希望日
              </span>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full rounded-xl border border-mist bg-platinum px-3 py-2.5 font-medium focus:border-ink focus:outline-none"
              >
                {DATES.map((d) => (
                  <option key={d} value={d}>
                    {formatDate(d)}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-bold text-ink/70 flex items-center gap-1.5">
                🔧 点検内容
              </span>
              <select
                value={service}
                onChange={(e) => setService(e.target.value as ServiceType)}
                className="mt-1 w-full rounded-xl border border-mist bg-platinum px-3 py-2.5 font-medium focus:border-ink focus:outline-none"
              >
                {SERVICE_LIST.map((s) => (
                  <option key={s.type} value={s.type}>
                    {s.emoji} {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="mt-3 text-xs text-ink/50">
            ※ 空き状況・スタッフ配置はAIがリアルタイムに評価（デモは
            {formatDate(TODAY)}基準のサンプルデータです）。
          </p>
        </Card>

        {/* 結果 */}
        <div className="space-y-5">
          {results.length === 0 && (
            <Card className="p-8 text-center text-ink/60">
              この条件では空きが見つかりませんでした。日付やエリアを変えてお試しください。
            </Card>
          )}
          {results.map((r, i) => {
            const isTop = i === 0;
            return (
              <Card
                key={r.store.id}
                className={`overflow-hidden transition hover:shadow-lg ${
                  isTop ? "ring-2 ring-accent" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* 写真サイドバー */}
                  <div className="relative md:w-52 h-44 md:h-auto shrink-0">
                    <Image
                      src={r.store.photo}
                      alt={r.store.name}
                      fill
                      sizes="(max-width:768px) 100vw, 208px"
                      className="object-cover"
                      unoptimized={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-jet/80 to-transparent" />
                    {isTop && (
                      <div className="absolute top-3 left-3">
                        <Badge tone="accent">🤖 AIのイチオシ</Badge>
                      </div>
                    )}
                    {/* スコア */}
                    <div className="absolute bottom-3 left-3 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 text-center">
                      <div className="text-4xl font-black text-white leading-none">
                        {r.score}
                      </div>
                      <div className="text-[11px] text-white/70">おすすめ度</div>
                    </div>
                  </div>

                  {/* 店舗情報 */}
                  <div className="flex-1 p-5 flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-black">{r.store.name}</h3>
                        <Badge tone="neutral">{r.store.area}エリア</Badge>
                        <span className="text-sm text-ink/50">
                          目的地から約{r.distanceKm}km
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge tone={r.amOpen > 0 ? "warn" : "bad"}>
                          午前 残り{r.amOpen}台
                        </Badge>
                        <Badge tone={r.pmOpen >= 3 ? "good" : "neutral"}>
                          午後 残り{r.pmOpen}台
                          {r.pmOpen >= 3 ? " ⭐おすすめ" : ""}
                        </Badge>
                      </div>

                      {r.reasons.length > 0 && (
                        <ul className="mt-3 space-y-1">
                          {r.reasons.map((reason) => (
                            <li
                              key={reason}
                              className="text-sm text-ink/70 flex items-start gap-1.5"
                            >
                              <span className="text-mountain mt-0.5 shrink-0">✓</span>
                              {reason}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* おでかけスポット */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {r.store.spots.slice(0, 3).map((sp) => (
                          <span
                            key={sp.name}
                            className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-1 text-xs text-ink/70"
                          >
                            {sp.emoji} {sp.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* アクション */}
                    <div className="flex md:flex-col gap-2 md:w-40 shrink-0 md:justify-end">
                      <button
                        className="flex-1 rounded-xl bg-accent text-white font-bold px-4 py-2.5 hover:bg-accent-dark transition"
                        onClick={() =>
                          alert(
                            `${r.store.name} ${formatDate(date)} の予約画面へ進みます（デモ）`,
                          )
                        }
                      >
                        予約へ進む
                      </button>
                      <Link
                        href={`/stores/${r.store.id}`}
                        className="flex-1 text-center rounded-xl border border-mist font-bold px-4 py-2.5 hover:bg-mist transition"
                      >
                        おでかけ情報
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
