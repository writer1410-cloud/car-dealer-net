"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Article,
  ARTICLE_CATEGORIES,
  CATEGORY_EMOJI,
  articlePhoto,
  ArticleCategory,
} from "@/lib/articles";
import { Badge } from "@/components/ui";

type Filter = "all" | ArticleCategory;

export function MediaBrowser({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const featured = useMemo(() => articles.filter((a) => a.featured), [articles]);
  const shown = useMemo(
    () =>
      filter === "all"
        ? articles
        : articles.filter((a) => a.category === filter),
    [filter, articles],
  );

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: "すべて" },
    ...ARTICLE_CATEGORIES.map((c) => ({
      key: c,
      label: `${CATEGORY_EMOJI[c]} ${c}`,
    })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* PICK UP（注目記事） */}
      {filter === "all" && featured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-black mb-4">📌 PICK UP</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((a) => (
              <Link key={a.id} href={`/media/${a.id}`} className="group">
                <div className="relative h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
                  <Image
                    src={articlePhoto(a, 800, 600)}
                    alt={a.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="photo-overlay absolute inset-0" />
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge tone="accent">
                        {CATEGORY_EMOJI[a.category]} {a.category}
                      </Badge>
                      <span className="text-xs text-white/70">{a.area}</span>
                    </div>
                    <h3 className="text-lg font-black text-white leading-snug">
                      {a.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* カテゴリフィルタ */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              filter === t.key
                ? "bg-ink text-white"
                : "bg-white border border-mist text-ink/70 hover:bg-mist"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* 記事一覧 */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((a) => (
          <Link key={a.id} href={`/media/${a.id}`} className="group">
            <article className="rounded-2xl overflow-hidden bg-white border border-mist shadow-sm hover:shadow-xl transition duration-300 h-full flex flex-col">
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={articlePhoto(a, 600, 400)}
                  alt={a.title}
                  fill
                  sizes="(max-width:640px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3">
                  <Badge tone="neutral">
                    {CATEGORY_EMOJI[a.category]} {a.category}
                  </Badge>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-ink/45 mb-1">
                  <span>{a.area}エリア</span>
                  <span>・</span>
                  <span>{a.date}</span>
                </div>
                <h3 className="font-black leading-snug">{a.title}</h3>
                <p className="mt-2 text-sm text-ink/65 leading-relaxed flex-1">
                  {a.excerpt}
                </p>
                <span className="mt-3 text-sm font-bold text-accent">
                  記事を読む →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
