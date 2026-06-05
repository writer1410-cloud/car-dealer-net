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
        desc="全店舗の入庫状況・スタッフ数を一目で。色が濃い（赤）ほど混雑、緑は空きです。"
      />

      {/* サマリー */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="p-5">
          <p className="text-sm text-ink/60">店舗数</p>
          <p className="text-3xl font-black">{sum.storeCount}</p>
        </Card>
        <Card className="p-5">
          <p className="text-sm text-ink/60">午前 平均稼働</p>
          <p className="text-3xl font-black text-soul">
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
            className="text-xs text-soul font-bold hover:underline"
          >
            提案を見る →
          </Link>
        </Card>
      </div>

      {/* ヒートマップ */}
      <Card className="p-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-black">店舗 × 日付 稼働ヒートマップ</h3>
          <Legend />
        </div>
        <div className="overflow-x-auto">
          <table className="border-separate border-spacing-1">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white z-10 text-left text-xs text-ink/50 font-medium px-2 w-28">
                  店舗 ＼ 日
                </th>
                {days.map((d) => (
                  <th
                    key={d}
                    className={`text-[11px] font-medium px-1 ${
                      isWeekend(d) ? "text-soul" : "text-ink/50"
                    }`}
                  >
                    {formatDate(d).replace(/\(.\)/, "")}
                    <div className="text-[10px]">
                      {formatDate(d).match(/\((.)\)/)?.[1]}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STORES.map((store) => (
                <tr key={store.id}>
                  <td className="sticky left-0 bg-white z-10 text-sm font-bold pr-2 w-28">
                    <Link
                      href={`/stores/${store.id}`}
                      className="hover:text-soul"
                    >
                      {store.name}
                    </Link>
                  </td>
                  {days.map((d) => {
                    const load = dayLoadFor(store.id, d);
                    const u = utilization(load);
                    return (
                      <td key={d}>
                        <div
                          className="heat-cell grid grid-rows-2 w-9 h-9 rounded overflow-hidden cursor-default"
                          title={`${store.name} ${formatDate(d)}
午前 ${load.amBooked}/${load.amCapacity}台 (${(u.am * 100).toFixed(0)}%)
午後 ${load.pmBooked}/${load.pmCapacity}台 (${(u.pm * 100).toFixed(0)}%)
出勤スタッフ ${load.staffCount}名`}
                        >
                          <div
                            style={{ background: utilColor(u.am) }}
                            className="w-full"
                          />
                          <div
                            style={{ background: utilColor(u.pm) }}
                            className="w-full"
                          />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-ink/50">
          各セルは上段=午前 / 下段=午後の稼働率。多くの店舗で「上が赤・下が緑」=
          午前偏重が見て取れます。セルにカーソルを合わせると詳細が表示されます。
        </p>
      </Card>

      {/* 店舗別 本日の状況 */}
      <Card className="p-5">
        <h3 className="font-black mb-4">本日（{formatDate(DATES[0])}）の店舗別状況</h3>
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

function Bar({ value }: { value: number }) {
  const pct = Math.round(Math.min(1, value) * 100);
  return (
    <div className="h-2.5 w-full rounded-full bg-sand overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{ width: `${pct}%`, background: utilColor(value) }}
      />
    </div>
  );
}

function Legend() {
  const items = [
    { c: "#2e9e5b", l: "空き" },
    { c: "#caa600", l: "ふつう" },
    { c: "#e07b00", l: "やや混雑" },
    { c: "#9b1b1f", l: "混雑" },
  ];
  return (
    <div className="flex items-center gap-2 text-xs text-ink/60">
      {items.map((i) => (
        <span key={i.l} className="flex items-center gap-1">
          <span
            className="inline-block w-3 h-3 rounded"
            style={{ background: i.c }}
          />
          {i.l}
        </span>
      ))}
    </div>
  );
}
