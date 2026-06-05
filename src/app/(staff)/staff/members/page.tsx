import { STORES, getStore } from "@/lib/stores";
import { STAFF, staffOfStore, helpersForStore } from "@/lib/staff";
import { staffMoveSuggestions } from "@/lib/optimizer";
import { DATES, formatDate, dayLoadFor } from "@/lib/schedule";
import { Badge, Card, SectionTitle } from "@/components/ui";

export const metadata = {
  title: "スタッフ店舗間配置 | 神戸マツダ",
};

export default function StaffPage() {
  const today = DATES[0];
  const moves = staffMoveSuggestions(DATES.slice(0, 7));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionTitle
        eyebrow="本部・店舗管理"
        title="スタッフ店舗間配置"
        desc="所属店舗だけでなく、空いている日は近隣店舗へ応援。
        AIが需要と人員のミスマッチを検知し、応援配置を提案します。"
      />

      {/* AIによる応援配置の提案 */}
      <Card className="p-5 mb-8">
        <h3 className="font-black mb-1">🤖 AIによる応援配置の提案（今後7日間）</h3>
        <p className="text-sm text-ink/60 mb-4">
          入庫予定に対して人員が不足する店舗へ、手すきの近隣店舗から応援を提案します。
        </p>
        {moves.length === 0 ? (
          <p className="text-sm text-ink/60">
            現在、人員の大きな過不足はありません。バランスの取れた配置です。
          </p>
        ) : (
          <div className="space-y-3">
            {moves.slice(0, 8).map((m, i) => (
              <div
                key={`${m.storeId}-${m.date}-${i}`}
                className="flex items-start gap-3 rounded-xl bg-cream p-4"
              >
                <span className="text-2xl">🤝</span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold">{m.title}</span>
                    <Badge tone="neutral">{formatDate(m.date)}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-ink/70">{m.detail}</p>
                  <p className="mt-1 text-xs text-emerald-700 font-bold">
                    効果：{m.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 店舗別の人員と応援可能スタッフ */}
      <h3 className="font-black mb-4">
        店舗別 スタッフ体制（本日 {formatDate(today)}）
      </h3>
      <div className="grid gap-5 md:grid-cols-2 mb-10">
        {STORES.map((store) => {
          const home = staffOfStore(store.id);
          const helpers = helpersForStore(store.id);
          const load = dayLoadFor(store.id, today);
          const demand = load.amBooked + load.pmBooked;
          return (
            <Card key={store.id} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-black">{store.name}</h4>
                <div className="flex gap-2">
                  <Badge tone="neutral">👷 {load.staffCount}名出勤</Badge>
                  <Badge tone={demand > load.staffCount * 6 ? "bad" : "good"}>
                    本日 {demand}台入庫
                  </Badge>
                </div>
              </div>
              <p className="text-xs font-bold text-ink/50 mb-1">所属スタッフ</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {home.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1 rounded-lg bg-soul/10 text-soul px-2 py-1 text-xs font-medium"
                  >
                    {s.name}
                    <span className="text-soul/60">{s.grade}</span>
                  </span>
                ))}
              </div>
              {helpers.length > 0 && (
                <>
                  <p className="text-xs font-bold text-ink/50 mb-1">
                    応援可能（他店所属）
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {helpers.map((s) => (
                      <span
                        key={s.id}
                        className="inline-flex items-center gap-1 rounded-lg bg-sand px-2 py-1 text-xs text-ink/70"
                      >
                        {s.name}
                        <span className="text-ink/40">
                          ←{getStore(s.homeStoreId)?.name}
                        </span>
                      </span>
                    ))}
                  </div>
                </>
              )}
            </Card>
          );
        })}
      </div>

      {/* スタッフ名簿 */}
      <h3 className="font-black mb-4">スタッフ名簿と応援可能店舗</h3>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-sand text-ink/60 text-xs">
              <tr>
                <th className="text-left px-4 py-3">氏名</th>
                <th className="text-left px-4 py-3">資格</th>
                <th className="text-left px-4 py-3">所属店舗</th>
                <th className="text-left px-4 py-3">応援可能店舗</th>
                <th className="text-left px-4 py-3">スキル</th>
              </tr>
            </thead>
            <tbody>
              {STAFF.map((s, i) => (
                <tr
                  key={s.id}
                  className={i % 2 ? "bg-cream" : "bg-white"}
                >
                  <td className="px-4 py-3 font-bold">{s.name}</td>
                  <td className="px-4 py-3 text-ink/70">{s.grade}</td>
                  <td className="px-4 py-3 text-ink/70">
                    {getStore(s.homeStoreId)?.name}
                  </td>
                  <td className="px-4 py-3 text-ink/70">
                    {s.canWorkStoreIds.length === 0
                      ? "—"
                      : s.canWorkStoreIds
                          .map((id) => getStore(id)?.name)
                          .join("・")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {s.skills.map((sk) => (
                        <span
                          key={sk}
                          className="rounded bg-sand px-1.5 py-0.5 text-[11px] text-ink/60"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
