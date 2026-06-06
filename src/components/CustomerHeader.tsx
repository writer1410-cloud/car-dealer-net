"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const customerNav = [
  { href: "/", label: "ホーム" },
  { href: "/availability", label: "空き店舗をさがす" },
  { href: "/stores", label: "店舗・おでかけ" },
  { href: "/perks", label: "特典・地域連携" },
];

export function CustomerHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-mist">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-br from-graphite to-ink text-white font-black ring-1 ring-silver/50">
            M
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black text-ink">
              神戸マツダ
            </span>
            <span className="block text-[11px] text-ink/60 -mt-0.5">
              ぐるっと点検ネット
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {customerNav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive(n.href)
                  ? "text-ink bg-ink/10"
                  : "text-ink/70 hover:text-ink hover:bg-ink/5"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/availability"
            className="ml-2 rounded-lg bg-accent text-white text-sm font-bold px-4 py-2 hover:bg-accent-dark transition"
          >
            予約する
          </Link>
          <span className="mx-2 h-5 w-px bg-mist" />
          <Link
            href="/staff"
            className="text-xs text-ink/40 hover:text-ink/70"
          >
            スタッフの方 →
          </Link>
        </nav>

        <button
          aria-label="メニュー"
          className="md:hidden p-2 rounded-lg hover:bg-mist"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="w-5 space-y-1">
            <span className="block h-0.5 bg-ink" />
            <span className="block h-0.5 bg-ink" />
            <span className="block h-0.5 bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-mist bg-white px-4 py-3 space-y-1">
          {customerNav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                isActive(n.href) ? "text-ink bg-ink/10" : "text-ink/70"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/staff"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs text-ink/40"
          >
            スタッフの方はこちら →
          </Link>
        </div>
      )}
    </header>
  );
}
