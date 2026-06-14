"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const staffNav = [
  { href: "/staff", label: "ダッシュボード" },
  { href: "/staff/members", label: "スタッフ体制" },
  { href: "/staff/ai", label: "AI最適化" },
  { href: "/staff/content", label: "コンテンツ管理" },
  { href: "/staff/site", label: "サイト画像" },
];

export function StaffHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/staff" ? pathname === "/staff" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-ink text-white border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/staff" className="flex items-center gap-2 shrink-0">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-white text-ink font-black">
            M
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black text-white">
              神戸マツダ 管理ポータル
            </span>
            <span className="block text-[11px] text-white/50 -mt-0.5">
              STAFF / 店舗・本部向け
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {staffNav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive(n.href)
                  ? "bg-white text-ink"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <span className="mx-2 h-5 w-px bg-white/15" />
          <Link
            href="/"
            className="text-xs text-white/50 hover:text-white"
          >
            ← お客様ページ
          </Link>
          <a
            href="/api/admin/logout"
            className="ml-2 text-xs text-white/50 hover:text-white"
          >
            ログアウト
          </a>
        </nav>

        <button
          aria-label="メニュー"
          className="md:hidden p-2 rounded-lg hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="w-5 space-y-1">
            <span className="block h-0.5 bg-white" />
            <span className="block h-0.5 bg-white" />
            <span className="block h-0.5 bg-white" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-ink px-4 py-3 space-y-1">
          {staffNav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                isActive(n.href) ? "bg-white text-ink" : "text-white/70"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs text-white/50"
          >
            ← お客様ページへ戻る
          </Link>
          <a
            href="/api/admin/logout"
            className="block px-3 py-2 rounded-lg text-xs text-white/50"
          >
            ログアウト
          </a>
        </div>
      )}
    </header>
  );
}
