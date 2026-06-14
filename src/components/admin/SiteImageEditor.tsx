"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface StoreRow {
  id: string;
  name: string;
  defaultPhoto: string;
}

export function SiteImageEditor({
  stores,
  initial,
}: {
  stores: StoreRow[];
  initial: Record<string, string>;
}) {
  const router = useRouter();
  const [images, setImages] = useState<Record<string, string>>(initial);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function update(id: string, url: string) {
    setImages((m) => ({ ...m, [id]: url }));
    setDone(false);
  }

  async function save() {
    setBusy(true);
    setError("");
    const storeImages: Record<string, string> = {};
    for (const [id, url] of Object.entries(images)) {
      if (url && url.trim()) storeImages[id] = url.trim();
    }
    const res = await fetch("/api/admin/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ storeImages }),
    });
    setBusy(false);
    if (res.ok) {
      setDone(true);
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.message || "保存に失敗しました");
    }
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {stores.map((s) => {
          const current = images[s.id]?.trim() || s.defaultPhoto;
          return (
            <div key={s.id} className="rounded-xl border border-mist bg-white p-4">
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-24 shrink-0 rounded-lg overflow-hidden border border-mist">
                  <Image src={current} alt={s.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-sm truncate">{s.name}</p>
                  <p className="text-[11px] text-ink/45">
                    {images[s.id]?.trim() ? "差し替え中" : "自動画像"}
                  </p>
                </div>
              </div>
              <input
                value={images[s.id] ?? ""}
                onChange={(e) => update(s.id, e.target.value)}
                placeholder="画像URL（空欄で自動画像に戻す）"
                className="mt-3 w-full rounded-lg border border-mist bg-platinum px-3 py-2 text-sm focus:border-ink focus:outline-none"
              />
            </div>
          );
        })}
      </div>

      {error && <p className="mt-4 text-sm text-accent font-bold">{error}</p>}
      {done && <p className="mt-4 text-sm text-emerald-600 font-bold">保存しました ✓</p>}

      <div className="sticky bottom-4 mt-6">
        <button
          onClick={save}
          disabled={busy}
          className="rounded-xl bg-accent text-white font-bold px-6 py-3 shadow-lg hover:bg-accent-dark transition disabled:opacity-60"
        >
          {busy ? "保存中…" : "画像を保存する"}
        </button>
      </div>
    </div>
  );
}
