"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { recommendStores, AREA_LIST } from "@/lib/optimizer";
import { SERVICE_LIST } from "@/lib/stores";
import { DATES, formatDate, TODAY } from "@/lib/schedule";
import { Area, ServiceType } from "@/lib/types";
import { Badge, Card, SectionTitle } from "@/components/ui";

export default function AvailabilityPage() {
  const [area, setArea] = useState<Area>("神戸");
  const [date, setDate] = useState<string>(TODAY);
  const [service, setService] = useState<ServiceType>("車検");

  const results = useMemo(
    () => recommendStores({ destinationArea: area, date, service }),
    [area, date, service],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionTitle
        eyebrow="空き店舗をさがす"
        title="お出かけ先で、点検しよう。"
        desc="行き先のエリア・希望日・点検内容を選ぶだけ。近くて空いている店舗を、AIがおすすめ順にご案内します。"
      />

      {/* 検索フォーム */}
      <Card className="p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="text-sm font-bold text-ink/70">
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
            <span className="text-sm font-bold text-ink/70">📅 希望日</span>
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
            <span className="text-sm font-bold text-ink/70">🔧 点検内容</span>
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
          ※ 空き状況・スタッフ配置はAIがリアルタイムに評価しています（本デモは
          {formatDate(TODAY)}を基準にしたサンプルデータです）。
        </p>
      </Card>

      {/* 結果 */}
      <div className="mt-8 space-y-4">
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
              className={`p-5 md:p-6 ${
                isTop ? "ring-2 ring-accent border-accent/40" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                {/* スコア */}
                <div className="flex md:flex-col items-center md:items-center gap-3 md:w-28 shrink-0">
                  {isTop && <Badge tone="accent">🤖 AIのイチオシ</Badge>}
                  <div className="text-center">
                    <div className="text-4xl font-black text-accent leading-none">
                      {r.score}
                    </div>
                    <div className="text-[11px] text-ink/50">おすすめ度</div>
                  </div>
                </div>

                {/* 店舗情報 */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-black">{r.store.name}</h3>
                    <Badge tone="neutral">{r.store.area}エリア</Badge>
                    <span className="text-sm text-ink/50">
                      {r.store.city}・目的地から約{r.distanceKm}km
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
                          <span className="text-emerald-600 mt-0.5">✓</span>
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
                <div className="flex md:flex-col gap-2 md:w-40 shrink-0">
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
            </Card>
          );
        })}
      </div>
    </div>
  );
}
