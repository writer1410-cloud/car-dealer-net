import Link from "next/link";
import { STORES } from "@/lib/stores";
import {
  DATES,
  dayLoadFor,
  formatDate,
  isWeekend,
  utilization,
} from "@/lib/schedule";
import { allSuggestions, networkSummary } from "@/lib/optimizer";
import { Badge, Card, SectionTitle, utilColor, utilLabel } from "@/components/ui";
import { Period } from "@/lib/types";

export const metadata = {
  title: "入庫スケジュール ダッシュボード | 神戸マツダ",
};

export default function AdminDashboard() {
  const sum = networkSummary();
  const suggestions = allSuggestions();
  const days = DATES.slice(0, 10); // 見やすさのため10日分

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionTitle
        eyebrow="本部・店舗管理"
        title="入庫スケジュール ダッシュボード"
        desc="全店舗の入庫状況・スタッフ数を一目で。マスの数字は稼働率（%）。緑＝空き、赤＝混雑です。"
      />

      {/* サマリー */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="p-5">
          <p className="text-sm text-ink/60">店舗数</p>
          <p className="text-3xl font-black">{sum.storeCount}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-ink/60">午前 平均稼働</p>
          <p className="text-3xl font-black text-accent">
            {(sum.amUtil * 100).toFixed(0)}%
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-ink/60">午後 平均稼働</p>
          <p className="text-3xl font-black text-emerald-600">
            {(sum.pmUtil * 100).toFixed(0)}%
          </p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-ink/60">AI改善提案</p>
          <p className="text-3xl font-black text-amber-600">
            {suggestions.length}件
          </p>
          <Link
            href="/staff/ai"
            className="text-xs text-accent font-bold hover:underline"
          >
            提案を見る →
          </Link>
        </Card>
      </div>

      {/* ヒートマップ（午前／午後を分けて表示） */}
      <Card className="p-5 md:p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h3 className="font-black text-lg">店舗 × 日付 稼働ヒートマップ</h3>
            <p className="text-xs text-ink/55 mt-0.5">
              数字は<b>稼働率（%）</b>。
              <span className="text-accent font-bold">午前は赤（混雑）</span>、
              <span className="text-emerald-600 font-bold">午後は緑（空き）</span>
              が多く、予約の午前偏重がはっきり分かります。
            </p>
          </div>
          <Legend />
        </div>

        <HeatGrid period="AM" label="午前" days={days} />
        <div className="h-5" />
        <HeatGrid period="PM" label="午後" days={days} />

        <p className="mt-4 text-xs text-ink/50">
          マスにカーソルを合わせると、予約台数・出勤スタッフ数の詳細が表示されます。
          店舗名をクリックすると店舗ページへ移動します。
        </p>
      </Card>

      {/* 店舗別 本日の状況 */}
      <Card className="p-5">
        <h3 className="font-black mb-4">
          本日（{formatDate(DATES[0])}）の店舗別状況
        </h3>
        <div className="space-y-3">
          {STORES.map((store) => {
            const load = dayLoadFor(store.id, DATES[0]);
            const u = utilization(load);
            return (
              <div
                key={store.id}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              >
                <div className="w-28 font-bold text-sm shrink-0">
                  {store.name}
                </div>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-ink/50">午前</span>
                      <span style={{ color: utilColor(u.am) }}>
                        {(u.am * 100).toFixed(0)}%
                      </span>
                    </div>
                    <Bar value={u.am} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-ink/50">午後</span>
                      <span style={{ color: utilColor(u.pm) }}>
                        {(u.pm * 100).toFixed(0)}%
                      </span>
                    </div>
                    <Bar value={u.pm} />
                  </div>
                </div>
                <div className="shrink-0">
                  <Badge tone="neutral">👷 {load.staffCount}名</Badge>{" "}
                  <Badge
                    tone={
                      u.total >= 0.85
                        ? "bad"
                        : u.total >= 0.65
                          ? "warn"
                          : "good"
                    }
                  >
                    {utilLabel(u.total)}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

/** 午前または午後の稼働率ヒートマップ（数字つき） */
function HeatGrid({
  period,
  label,
  days,
}: {
  period: Period;
  label: string;
  days: string[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`inline-flex items-center justify-center text-xs font-black px-2 py-0.5 rounded ${
            period === "AM"
              ? "bg-accent/10 text-accent"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {label}（{period}）
        </span>
        <span className="text-[11px] text-ink/45">
          {period === "AM"
            ? "9:00〜12:00 の稼働率"
            : "13:00〜17:00 の稼働率"}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="sticky left-0 bg-white z-10 text-left text-[11px] text-ink/45 font-medium px-2 w-24" />
              {days.map((d) => {
                const wd = formatDate(d).match(/\((.)\)/)?.[1] ?? "";
                const md = formatDate(d).replace(/\(.\)/, "");
                return (
                  <th key={d} className="px-0.5 min-w-[2.75rem]">
                    <div
                      className={`text-[11px] font-bold ${
                        isWeekend(d) ? "text-accent" : "text-ink/60"
                      }`}
                    >
                      {md}
                    </div>
                    <div
                      className={`text-[10px] ${
                        isWeekend(d) ? "text-accent/70" : "text-ink/40"
                      }`}
                    >
                      {wd}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {STORES.map((store) => (
              <tr key={store.id}>
                <td className="sticky left-0 bg-white z-10 text-xs font-bold pr-2 w-24">
                  <Link
                    href={`/stores/${store.id}`}
                    className="hover:text-accent whitespace-nowrap"
                  >
                    {store.name}
                  </Link>
                </td>
                {days.map((d) => {
                  const load = dayLoadFor(store.id, d);
                  const u = utilization(load);
                  const util = period === "AM" ? u.am : u.pm;
                  const booked =
                    period === "AM" ? load.amBooked : load.pmBooked;
                  const cap =
                    period === "AM" ? load.amCapacity : load.pmCapacity;
                  const pct = Math.round(util * 100);
                  return (
                    <td key={d}>
                      <div
                        className="grid place-items-center w-11 h-10 rounded-md text-white shadow-sm transition hover:ring-2 hover:ring-ink/30 cursor-default"
                        style={{ background: utilColor(util) }}
                        title={`${store.name} ${formatDate(d)} ${label}
予約 ${booked}/${cap}台（稼働率 ${pct}%）
空き ${Math.max(0, cap - booked)}台 ・ 出勤スタッフ ${load.staffCount}名`}
                      >
                        <span className="leading-none font-black text-[15px]">
                          {pct}
                          <span className="text-[9px] font-bold align-top">
                            %
                          </span>
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Bar({ value }: { value: number }) {
  const pct = Math.round(Math.min(1, value) * 100);
  return (
    <div className="h-2.5 w-full rounded-full bg-mist overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, background: utilColor(value) }}
      />
    </div>
  );
}

function Legend() {
  const items = [
    { c: "#2f9e5b", l: "空き〜40%" },
    { c: "#b08900", l: "〜65%" },
    { c: "#d06a00", l: "〜85%" },
    { c: "#b3141f", l: "混雑85%+" },
  ];
  return (
    <div className="flex items-center gap-3 text-[11px] text-ink/60">
      {items.map((i) => (
        <span key={i.l} className="flex items-center gap-1">
          <span
            className="inline-block w-3.5 h-3.5 rounded"
            style={{ background: i.c }}
          />
          {i.l}
        </span>
      ))}
    </div>
  );
}
