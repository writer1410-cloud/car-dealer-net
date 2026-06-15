"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  SPOTS,
  GENRES,
  GENRE_EMOJI,
  spotPhoto,
  Genre,
} from "@/lib/spots";
import { AREA_LIST } from "@/lib/optimizer";
import { Area } from "@/lib/types";
import { Badge } from "@/components/ui";
import { TravelTimes } from "@/components/TravelTimes";

export default function SpotsPage() {
  return (
    <Suspense>
      <SpotsInner />
    </Suspense>
  );
}

function SpotsInner() {
  const params = useSearchParams();
  const initialGenre = params.get("genre") as Genre | null;

  const [genre, setGenre] = useState<Genre | "all">(
    initialGenre && GENRES.includes(initialGenre) ? initialGenre : "all",
  );
  const [area, setArea] = useState<Area | "all">("all");

  const results = useMemo(
    () =>
      SPOTS.filter(
        (s) =>
          (genre === "all" || s.genre === genre) &&
          (area === "all" || s.area === area),
      ),
    [genre, area],
  );

  return (
    <div>
      {/* ヘッダー */}
      <section className="bg-gradient-to-br from-jet via-ink to-graphite text-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-amber-300 font-bold text-sm tracking-wide mb-1">
            ジャンルでさがす
          </p>
          <h1 className="text-3xl md:text-4xl font-black">
            今日は、どんな気分？
          </h1>
          <p className="mt-3 text-white/70 max-w-xl">
            カフェ、ランチ、レジャー…目的のジャンルから、兵庫のおでかけスポットを探せます。
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* ジャンルタブ */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setGenre("all")}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              genre === "all"
                ? "bg-ink text-white"
                : "bg-white border border-mist text-ink/70 hover:bg-mist"
            }`}
          >
            すべて
          </button>
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                genre === g
                  ? "bg-ink text-white"
                  : "bg-white border border-mist text-ink/70 hover:bg-mist"
              }`}
            >
              {GENRE_EMOJI[g]} {g}
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
            この条件のスポットは見つかりませんでした。
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((s) => (
              <article
                key={s.id}
                className="rounded-2xl overflow-hidden bg-white border border-mist shadow-sm hover:shadow-xl transition duration-300 flex flex-col"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={spotPhoto(s, 600, 400)}
                    alt={s.name}
                    fill
                    sizes="(max-width:640px) 100vw, 33vw"
                    className="object-cover hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge tone="accent">
                      {GENRE_EMOJI[s.genre]} {s.genre}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="text-xs text-ink/45 mb-1">
                    {s.area}エリア・{s.city}
                  </div>
                  <h3 className="font-black leading-snug">{s.name}</h3>
                  <p className="mt-1.5 text-sm text-ink/65 leading-relaxed flex-1">
                    {s.description}
                  </p>
                  <TravelTimes access={s.access} className="mt-2" />
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-mist px-2 py-0.5 text-[11px] text-ink/55"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/availability?area=${s.area}`}
                    className="mt-4 text-center rounded-xl bg-accent text-white font-bold px-4 py-2.5 hover:bg-accent-dark transition"
                  >
                    近くの店舗で点検予約
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
