"use client";

import { useMemo, useState } from "react";
import {
  afternoonShiftSuggestions,
  crossStoreSuggestions,
  networkSummary,
} from "@/lib/optimizer";
import { formatDate } from "@/lib/schedule";
import { SuggestionKind } from "@/lib/types";
import { Badge, Card, SectionTitle } from "@/components/ui";

const KIND_META: Record<
  Exclude<SuggestionKind, "ok">,
  { label: string; emoji: string; tone: "ink" | "warn" | "good" }
> = {
  "afternoon-shift": { label: "午後への誘導", emoji: "🌤️", tone: "warn" },
  "cross-store": { label: "近隣店舗へ振り分け", emoji: "🔄", tone: "ink" },
};

type Filter = "all" | keyof typeof KIND_META;

export default function AiPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const { afternoon, cross, sum } = useMemo(
    () => ({
      afternoon: afternoonShiftSuggestions(),
      cross: crossStoreSuggestions(),
      sum: networkSummary(),
    }),
    [],
  );

  const all = useMemo(
    () => [...afternoon, ...cross].sort((a, b) => b.severity - a.severity),
    [afternoon, cross],
  );

  const shown =
    filter === "all" ? all : all.filter((s) => s.kind === filter);

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "すべて", count: all.length },
    { key: "afternoon-shift", label: "午後誘導", count: afternoon.length },
    { key: "cross-store", label: "店舗振り分け", count: cross.length },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionTitle
        eyebrow="AI最適化アシスタント"
        title="スケジュールは、AIが整える。"
        desc="入庫枠の偏りや店舗間の混雑差を常時モニタリングし、
        平準化のための具体的なアクションを提案します。"
      />

      {/* AIによる要約 */}
      <Card className="p-6 mb-8 bg-gradient-to-br from-ink to-jet text-white">
        <div className="flex items-start gap-3">
          <span className="text-3xl">🤖</span>
          <div>
            <p className="font-bold mb-1">AIネットワーク診断</p>
            <p className="text-white/85 leading-relaxed text-sm">
              直近2週間、ネットワーク全体の午前稼働は
              <b className="text-amber-200">
                {" "}
                {(sum.amUtil * 100).toFixed(0)}%
              </b>
              に対し午後は
              <b className="text-emerald-200">
                {" "}
                {(sum.pmUtil * 100).toFixed(0)}%
              </b>
              。約{(sum.imbalance * 100).toFixed(0)}ポイントの偏りがあります。
              <b className="text-amber-200"> {afternoon.length}件</b>
              の午後誘導と
              <b className="text-amber-200"> {cross.length}件</b>
              の店舗振り分けを実施すると、待ち時間と稼働のムラを大きく改善できます。
              まずは重要度の高い提案から着手することをおすすめします。
            </p>
          </div>
        </div>
      </Card>

      {/* フィルタ */}
      <div className="flex flex-wrap gap-2 mb-5">
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
            {t.label}（{t.count}）
          </button>
        ))}
      </div>

      {/* 提案リスト */}
      <div className="space-y-3">
        {shown.length === 0 && (
          <Card className="p-8 text-center text-ink/60">
            この条件の提案はありません。
          </Card>
        )}
        {shown.map((s, i) => {
          const meta = KIND_META[s.kind as keyof typeof KIND_META];
          return (
            <Card key={`${s.kind}-${s.storeId}-${s.date}-${i}`} className="p-5">
              <div className="flex items-start gap-4">
                <div className="text-3xl shrink-0">{meta.emoji}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={meta.tone}>{meta.label}</Badge>
                    <Badge tone="neutral">{formatDate(s.date)}</Badge>
                    <span className="text-xs text-ink/50">
                      重要度 {Math.min(100, s.severity)}
                    </span>
                  </div>
                  <h3 className="mt-2 font-black">{s.title}</h3>
                  <p className="mt-1 text-sm text-ink/70 leading-relaxed">
                    {s.detail}
                  </p>
                  <p className="mt-2 text-xs text-emerald-700 font-bold">
                    💡 期待効果：{s.impact}
                  </p>
                </div>
                {/* 重要度メーター */}
                <div className="hidden sm:block w-24 shrink-0">
                  <div className="h-2 w-full rounded-full bg-mist overflow-hidden">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${Math.min(100, s.severity)}%` }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <p className="mt-8 text-xs text-ink/50">
        ※ 本デモのAIエンジンはルールベースの最適化ロジックで動作しています。
        実運用では予約実績・天候・キャンペーン情報などを学習し、
        LLM（Claude等）による自然言語での提案・自動配信に拡張できます。
      </p>
    </div>
  );
}
