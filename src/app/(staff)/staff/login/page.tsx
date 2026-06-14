"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/staff/content");
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setError(d.message || "ログインに失敗しました");
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl bg-white border border-mist shadow-sm p-8">
        <h1 className="text-2xl font-black">管理画面ログイン</h1>
        <p className="mt-2 text-sm text-ink/60">
          記事の投稿・編集、サイト画像の差し替えを行うにはログインが必要です。
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-bold text-ink/70">パスワード</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-mist bg-platinum px-3 py-2.5 focus:border-ink focus:outline-none"
              placeholder="パスワードを入力"
              autoFocus
            />
          </label>
          {error && <p className="text-sm text-accent font-bold">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-accent text-white font-bold px-4 py-3 hover:bg-accent-dark transition disabled:opacity-60"
          >
            {loading ? "確認中…" : "ログイン"}
          </button>
        </form>
        <p className="mt-4 text-xs text-ink/40">
          ※ デモの初期パスワードは <code className="bg-mist px-1 rounded">kobemazda</code>。
          本番では環境変数 <code className="bg-mist px-1 rounded">ADMIN_PASSWORD</code> で設定します。
        </p>
      </div>
    </div>
  );
}
