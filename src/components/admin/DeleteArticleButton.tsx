"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteArticleButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function del() {
    if (!confirm("この記事を削除しますか？")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) router.refresh();
    else alert("削除に失敗しました");
  }

  return (
    <button
      onClick={del}
      disabled={busy}
      className="text-xs font-bold text-accent hover:underline disabled:opacity-50"
    >
      削除
    </button>
  );
}
