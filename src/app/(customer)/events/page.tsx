"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  EVENTS,
  EVENT_CATEGORIES,
  EVENT_EMOJI,
  EventCategory,
  eventPhoto,
  eventStatus,
  sortedEvents,
  formatEventDate,
  EventStatus,
} from "@/lib/events";
import { AREA_LIST } from "@/lib/optimizer";
import { Area } from "@/lib/types";
import { Badge } from "@/components/ui";

const STATUS_STYLE: Record<EventStatus, string> = {
  開催中: "bg-emerald-500 text-white",
  まもなく: "bg-amber-500 text-white",
  予定: "bg-ink/70 text-white",
  終了: "bg-mist text-ink/50",
};

export default function EventsPage() {
  return (
    <Suspense>
      <EventsInner />
    </Suspense>
  );
}

function EventsInner() {
  const params = useSearchParams();
  const initialCat = params.get("category") as EventCategory | null;
  const initialArea = params.get("area") as Area | null;

  const [cat, setCat] = useState<EventCategory | "all">(
    initialCat && EVENT_CATEGORIES.includes(initialCat) ? initialCat : "all",
  );
  const [area, setArea] = useState<Area | "all">(
    initialArea && AREA_LIST.includes(initialArea) ? initialArea : "all",
  );

  const results = useMemo(
    () =>
      sortedEvents().filter(
        (e) =>
          (cat === "all" || e.category === cat) &&
          (area === "all" || e.area === area),
      ),
    [cat, area],
  );

  return (
    <div>
      {/* ヘッダー */}
      <section className="bg-gradient-to-br from-jet via-ink to-graphite text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-amber-300 font-bold text-sm tracking-wide mb-1">
            兵庫のおでかけイベント
          </p>
          <h1 className="text-3xl md:text-4xl font-black">
            この週末、どこへ行く？
          </h1>
          <p className="mt-3 text-white/70 max-w-xl">
            花火・お祭り・イルミネーション・アート…兵庫県内のレジャーイベントをまとめてチェック。点検のついでに、おでかけの計画を。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* カテゴリタブ */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setCat("all")}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              cat === "all"
                ? "bg-ink text-white"
                : "bg-white border border-mist text-ink/70 hover:bg-mist"
            }`}
          >
            すべて
          </button>
          {EVENT_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                cat === c
                  ? "bg-ink text-white"
                  : "bg-white border border-mist text-ink/70 hover:bg-mist"
              }`}
            >
              {EVENT_EMOJI[c]} {c}
            </button>
          ))}
        </div>

        {/* エリア絞り込み */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-sm text-ink/60">エリア:</span>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value as Area | "all")}
            className="rounded-lg border border-mist bg-white px-3 py-1.5 text-sm font-medium focus:border-ink focus:outline-none"
          >
            <option value="all">すべてのエリア</option>
            {AREA_LIST.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
          <span className="text-sm text-ink/50 ml-auto">{results.length}件</span>
        </div>

        {/* 結果 */}
        {results.length === 0 ? (
          <div className="rounded-2xl bg-white border border-mist p-10 text-center text-ink/60">
            この条件のイベントは見つかりませんでした。
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((e) => {
              const status = eventStatus(e);
              return (
                <article
                  key={e.id}
                  className={`rounded-2xl overflow-hidden bg-white border border-mist shadow-sm hover:shadow-xl transition duration-300 flex flex-col ${
                    status === "終了" ? "opacity-70" : ""
                  }`}
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={eventPhoto(e, 600, 400)}
                      alt={e.name}
                      fill
                      sizes="(max-width:640px) 100vw, 33vw"
                      className="object-cover hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge tone="accent">
                        {EVENT_EMOJI[e.category]} {e.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS_STYLE[status]}`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="text-xs text-ink/45 mb-1">
                      {e.area}エリア・{e.city}
                    </div>
                    <h3 className="font-black leading-snug">{e.name}</h3>
                    <p className="mt-1.5 text-sm font-bold text-accent">
                      📅 {formatEventDate(e)}
                    </p>
                    <p className="mt-1.5 text-sm text-ink/65 leading-relaxed flex-1">
                      {e.description}
                    </p>
                    <div className="mt-2 space-y-0.5 text-xs text-ink/55">
                      <p>📍 {e.venue}</p>
                      <p>🎟️ {e.fee}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {e.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-mist px-2 py-0.5 text-[11px] text-ink/55"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/availability?area=${e.area}`}
                      className="mt-4 text-center rounded-xl bg-accent text-white font-bold px-4 py-2.5 hover:bg-accent-dark transition"
                    >
                      近くの店舗で点検予約
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <p className="mt-8 text-xs text-ink/40 leading-relaxed">
          ※ 掲載情報は変更・中止になる場合があります。最新の開催情報・料金は各イベントの公式サイトをご確認ください。
        </p>
      </div>
    </div>
  );
}
