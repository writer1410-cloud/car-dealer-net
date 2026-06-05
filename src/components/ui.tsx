import { ReactNode } from "react";

/** 稼働率(0-1)から色を決める。低=空き(緑), 中=黄, 高=混雑(赤)。
 *  いずれも白文字が読める濃さに調整。 */
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
  tone?: "neutral" | "good" | "warn" | "bad" | "ink" | "accent";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-mist text-ink/70",
    good: "bg-emerald-100 text-emerald-800",
    warn: "bg-amber-100 text-amber-800",
    bad: "bg-red-100 text-red-800",
    ink: "bg-ink/10 text-ink",
    accent: "bg-accent/10 text-accent",
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
