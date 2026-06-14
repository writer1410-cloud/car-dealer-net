"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Article, ArticleCategory, ArticleSection } from "@/lib/articles";
import { STORES } from "@/lib/stores";

const CATEGORIES: ArticleCategory[] = [
  "観光",
  "グルメ",
  "パン",
  "カフェ",
  "体験",
  "イベント",
];
const AREAS = [
  "神戸",
  "阪神",
  "東播磨",
  "西播磨",
  "北播磨",
  "丹波",
  "但馬",
  "淡路",
] as const;

export function ArticleEditor({ article }: { article?: Article }) {
  const router = useRouter();
  const editing = !!article;

  const [title, setTitle] = useState(article?.title ?? "");
  const [category, setCategory] = useState<ArticleCategory>(
    article?.category ?? "観光",
  );
  const [area, setArea] = useState<string>(article?.area ?? "神戸");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [photo, setPhoto] = useState(article?.photo ?? "");
  const [tags, setTags] = useState((article?.tags ?? []).join(", "));
  const [featured, setFeatured] = useState(!!article?.featured);
  const [relatedStoreId, setRelatedStoreId] = useState(
    article?.relatedStoreId ?? "",
  );
  const [sections, setSections] = useState<ArticleSection[]>(
    article?.sections?.length
      ? article.sections
      : [{ heading: "", body: "" }],
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function updateSection(i: number, key: keyof ArticleSection, val: string) {
    setSections((s) =>
      s.map((sec, idx) => (idx === i ? { ...sec, [key]: val } : sec)),
    );
  }
  const addSection = () =>
    setSections((s) => [...s, { heading: "", body: "" }]);
  const removeSection = (i: number) =>
    setSections((s) => s.filter((_, idx) => idx !== i));

  async function save() {
    if (!title.trim()) {
      setError("タイトルを入力してください");
      return;
    }
    setBusy(true);
    setError("");
    const payload = {
      title,
      category,
      area,
      excerpt,
      photo,
      featured,
      relatedStoreId: relatedStoreId || undefined,
      tags: tags
        .split(/[,、]/)
        .map((t) => t.trim())
        .filter(Boolean),
      sections: sections.filter((s) => s.heading.trim() || s.body.trim()),
    };
    const res = await fetch(
      editing ? `/api/admin/articles/${article!.id}` : "/api/admin/articles",
      {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    setBusy(false);
    if (res.ok) {
      router.push("/staff/content");
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.message || "保存に失敗しました");
    }
  }

  async function remove() {
    if (!editing) return;
    if (!confirm("この記事を削除しますか？")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/articles/${article!.id}`, {
      method: "DELETE",
    });
    setBusy(false);
    if (res.ok) {
      router.push("/staff/content");
      router.refresh();
    } else {
      setError("削除に失敗しました");
    }
  }

  const field =
    "mt-1 w-full rounded-xl border border-mist bg-white px-3 py-2.5 focus:border-ink focus:outline-none";

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="text-sm font-bold text-ink/70">タイトル *</span>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className={field} />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-ink/70">カテゴリ</span>
          <select value={category} onChange={(e) => setCategory(e.target.value as ArticleCategory)} className={field}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-bold text-ink/70">エリア</span>
          <select value={area} onChange={(e) => setArea(e.target.value)} className={field}>
            {AREAS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm font-bold text-ink/70">リード文（一覧の紹介文）</span>
          <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} className={field} />
        </label>
        <label className="block">
          <span className="text-sm font-bold text-ink/70">関連店舗（任意）</span>
          <select value={relatedStoreId} onChange={(e) => setRelatedStoreId(e.target.value)} className={field}>
            <option value="">なし</option>
            {STORES.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-bold text-ink/70">タグ（カンマ区切り）</span>
          <input value={tags} onChange={(e) => setTags(e.target.value)} className={field} placeholder="姫路城, 世界遺産" />
        </label>
      </div>

      {/* 画像 */}
      <div>
        <span className="text-sm font-bold text-ink/70">メイン画像URL（差し替え）</span>
        <input value={photo} onChange={(e) => setPhoto(e.target.value)} className={field} placeholder="https://… 空欄なら自動画像" />
        {photo.trim() && (
          <div className="relative mt-2 h-40 w-full max-w-sm rounded-xl overflow-hidden border border-mist">
            {/* プレビュー（任意URL） */}
            <Image src={photo} alt="プレビュー" fill className="object-cover" />
          </div>
        )}
      </div>

      {/* 本文セクション */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-ink/70">本文（見出し＋本文）</span>
          <button onClick={addSection} className="text-sm font-bold text-accent hover:underline">
            ＋ セクション追加
          </button>
        </div>
        <div className="space-y-3">
          {sections.map((s, i) => (
            <div key={i} className="rounded-xl border border-mist p-3 bg-platinum">
              <div className="flex items-center gap-2">
                <input
                  value={s.heading}
                  onChange={(e) => updateSection(i, "heading", e.target.value)}
                  className="flex-1 rounded-lg border border-mist bg-white px-3 py-2 text-sm font-bold focus:border-ink focus:outline-none"
                  placeholder="見出し"
                />
                <button onClick={() => removeSection(i)} className="text-xs text-ink/40 hover:text-accent px-2">
                  削除
                </button>
              </div>
              <textarea
                value={s.body}
                onChange={(e) => updateSection(i, "body", e.target.value)}
                rows={3}
                className="mt-2 w-full rounded-lg border border-mist bg-white px-3 py-2 text-sm focus:border-ink focus:outline-none"
                placeholder="本文"
              />
            </div>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4" />
        <span className="text-sm font-bold text-ink/70">トップの「PICK UP」に表示する</span>
      </label>

      {error && <p className="text-sm text-accent font-bold">{error}</p>}

      <div className="flex flex-wrap gap-3 pt-2 border-t border-mist">
        <button onClick={save} disabled={busy} className="rounded-xl bg-accent text-white font-bold px-6 py-3 hover:bg-accent-dark transition disabled:opacity-60">
          {busy ? "保存中…" : editing ? "更新する" : "公開する"}
        </button>
        {editing && (
          <button onClick={remove} disabled={busy} className="rounded-xl border border-mist font-bold px-6 py-3 hover:bg-mist transition text-accent">
            削除
          </button>
        )}
      </div>
    </div>
  );
}
