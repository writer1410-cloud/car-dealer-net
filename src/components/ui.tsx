import Image from "next/image";
import { ReactNode } from "react";
import { photoByTags } from "@/lib/images";

/** 稼働率(0-1)から色を決める。いずれも白文字が読める濃さ。 */
export function utilColor(util: number): string {
  if (util >= 0.85) return "#b3141f"; // 混雑（ソウルレッド系）
  if (util >= 0.65) return "#d06a00"; // やや混雑
  if (util >= 0.4) return "#b08900"; // ふつう
  return "#2f9e5b"; // 空き
}

export function utilLabel(util: number): string {
  if (util >= 0.85) return "混雑";
  if (util >= 0.65) return "やや混雑";
  if (util >= 0.4) return "ふつう";
  return "空き";
}

export function UtilBar({ value }: { value: number }) {
  const pct = Math.round(Math.min(1, value) * 100);
  return (
    <div className="h-2 w-full rounded-full bg-mist overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, background: utilColor(value) }}
      />
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "good" | "warn" | "bad" | "ink" | "accent" | "sea" | "mountain" | "harbor";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-mist text-ink/70",
    good: "bg-emerald-100 text-emerald-800",
    warn: "bg-amber-100 text-amber-800",
    bad: "bg-red-100 text-red-800",
    ink: "bg-ink/10 text-ink",
    accent: "bg-accent/10 text-accent",
    sea: "bg-sea-light text-sea-dark",
    mountain: "bg-mountain-light text-mountain-dark",
    harbor: "bg-harbor-light text-harbor-dark",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white border border-mist shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  desc,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="text-accent font-bold text-sm tracking-wide mb-1">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-black text-ink">{title}</h2>
      {desc && <p className="mt-2 text-ink/60 max-w-2xl">{desc}</p>}
    </div>
  );
}

/**
 * 写真カード — 背景写真 + グラデーションオーバーレイ + テキストコンテンツ
 */
export function PhotoCard({
  photo,
  fallbackColor = "#2b2f36",
  height = "h-52",
  children,
  className = "",
}: {
  photo?: string;
  fallbackColor?: string;
  height?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${height} ${className}`}
      style={!photo ? { background: fallbackColor } : undefined}
    >
      {photo && (
        <Image
          src={photo}
          alt=""
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover"
        />
      )}
      <div className="photo-overlay absolute inset-0" />
      <div className="relative h-full flex flex-col justify-end p-5">
        {children}
      </div>
    </div>
  );
}

/** スポットカテゴリごとの代表写真（リンク切れしない Picsum） */
export const CATEGORY_PHOTOS: Record<string, string> = {
  グルメ: photoByTags("japanesefood", "cat-gourmet", 600, 400),
  観光: photoByTags("japan,landmark", "cat-sightseeing", 600, 400),
  遊び: photoByTags("amusementpark,leisure", "cat-play", 600, 400),
  ショッピング: photoByTags("shoppingmall", "cat-shopping", 600, 400),
};
