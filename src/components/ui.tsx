import { ReactNode } from "react";

/** 稼働率(0-1)から色を決める。低=空き(緑), 中=黄, 高=混雑(赤) */
export function utilColor(util: number): string {
  if (util >= 0.85) return "#9b1b1f"; // 混雑
  if (util >= 0.65) return "#e07b00"; // やや混雑
  if (util >= 0.4) return "#caa600"; // ふつう
  return "#2e9e5b"; // 空き
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
    <div className="h-2 w-full rounded-full bg-sand overflow-hidden">
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
  tone?: "neutral" | "good" | "warn" | "bad" | "soul";
}) {
  const tones: Record<string, string> = {
    neutral: "bg-sand text-ink/70",
    good: "bg-emerald-100 text-emerald-800",
    warn: "bg-amber-100 text-amber-800",
    bad: "bg-red-100 text-red-800",
    soul: "bg-soul/10 text-soul",
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
      className={`rounded-2xl bg-white border border-sand shadow-sm ${className}`}
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
        <p className="text-soul font-bold text-sm tracking-wide mb-1">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-black text-ink">{title}</h2>
      {desc && <p className="mt-2 text-ink/60 max-w-2xl">{desc}</p>}
    </div>
  );
}
