"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

export interface CarouselItem {
  name: string;
  genre: string;
  genreEmoji: string;
  area: string;
  description: string;
  photo: string;
  spotsHref: string;
  bookHref: string;
}

export function FeaturedCarousel({ items }: { items: CarouselItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;

  const go = useCallback((i: number) => setIndex((i + n) % n), [n]);

  useEffect(() => {
    if (paused || n <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % n), 5000);
    return () => clearInterval(t);
  }, [paused, n]);

  if (n === 0) return null;

  return (
    <section
      className="relative h-[88vh] min-h-[560px] max-h-[860px] overflow-hidden bg-jet"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* スライド（クロスフェード） */}
      {items.map((it, i) => (
        <div
          key={it.name + i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={it.photo}
            alt={it.name}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover scale-105"
          />
          <div className="photo-overlay-side absolute inset-0" />
        </div>
      ))}

      {/* 固定の見出し（メディアらしさ） */}
      <div className="relative h-full flex flex-col justify-between px-4 py-8 md:py-12">
        <div className="mx-auto max-w-6xl w-full">
          <span className="inline-block bg-accent text-white text-xs font-black px-3 py-1 rounded-full">
            兵庫おでかけメディア
          </span>
          <p className="mt-3 text-white/90 text-sm md:text-base font-bold drop-shadow">
            いま、注目のスポット
          </p>
        </div>

        {/* 現在スライドの情報 */}
        <div className="mx-auto max-w-6xl w-full">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-2.5 py-1 rounded-full">
                {items[index].genreEmoji} {items[index].genre}
              </span>
              <span className="text-white/80 text-sm">
                {items[index].area}エリア
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow">
              {items[index].name}
            </h1>
            <p className="mt-3 text-white/85 text-sm md:text-base leading-relaxed max-w-md">
              {items[index].description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={items[index].spotsHref}
                className="rounded-xl bg-white text-ink font-black px-6 py-3 shadow-lg hover:bg-mist transition"
              >
                スポットを探す →
              </Link>
              <Link
                href={items[index].bookHref}
                className="rounded-xl bg-accent text-white font-bold px-5 py-3 shadow-lg hover:bg-accent-dark transition"
              >
                近くで点検予約
              </Link>
            </div>
          </div>

          {/* インジケーター */}
          <div className="mt-8 flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`スライド${i + 1}`}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 左右ナビ */}
      {n > 1 && (
        <>
          <button
            aria-label="前へ"
            onClick={() => go(index - 1)}
            className="hidden md:grid place-items-center absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 text-white backdrop-blur hover:bg-black/50 transition"
          >
            ‹
          </button>
          <button
            aria-label="次へ"
            onClick={() => go(index + 1)}
            className="hidden md:grid place-items-center absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 text-white backdrop-blur hover:bg-black/50 transition"
          >
            ›
          </button>
        </>
      )}
    </section>
  );
}
