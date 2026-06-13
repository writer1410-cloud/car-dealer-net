import { STORES, getStore } from "@/lib/stores";
import { STAFF, staffOfStore } from "@/lib/staff";
import { DATES, formatDate, dayLoadFor } from "@/lib/schedule";
import { Badge, Card, SectionTitle } from "@/components/ui";

export const metadata = {
  title: "スタッフ体制 | 神戸マツダ",
};

export default function StaffMembersPage() {
  const today = DATES[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionTitle
        eyebrow="本部・店舗管理"
        title="スタッフ体制"
        desc="各店舗の整備士・フロントの人数と顔ぶれを一覧で把握できます。"
      />

      {/* 店舗別のスタッフ体制 */}
      <h3 className="font-black mb-4">
        店舗別 スタッフ体制（本日 {formatDate(today)}）
      </h3>
      <div className="grid gap-5 md:grid-cols-2 mb-10">
        {STORES.map((store) => {
          const home = staffOfStore(store.id);
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
              <p className="text-xs font-bold text-ink/50 mb-1">
                所属スタッフ（{home.length}名）
              </p>
              <div className="flex flex-wrap gap-1.5">
                {home.map((s) => (
                  <span
                    key={s.id}
                    className="inline-flex items-center gap-1 rounded-lg bg-ink/10 text-ink px-2 py-1 text-xs font-medium"
                  >
                    {s.name}
                    <span className="text-ink/50">{s.grade}</span>
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* スタッフ名簿 */}
      <h3 className="font-black mb-4">スタッフ名簿</h3>
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-mist text-ink/60 text-xs">
              <tr>
                <th className="text-left px-4 py-3">氏名</th>
                <th className="text-left px-4 py-3">資格</th>
                <th className="text-left px-4 py-3">所属店舗</th>
                <th className="text-left px-4 py-3">スキル</th>
              </tr>
            </thead>
            <tbody>
              {STAFF.map((s, i) => (
                <tr key={s.id} className={i % 2 ? "bg-platinum" : "bg-white"}>
                  <td className="px-4 py-3 font-bold">{s.name}</td>
                  <td className="px-4 py-3 text-ink/70">{s.grade}</td>
                  <td className="px-4 py-3 text-ink/70">
                    {getStore(s.homeStoreId)?.name}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {s.skills.map((sk) => (
                        <span
                          key={sk}
                          className="rounded bg-mist px-1.5 py-0.5 text-[11px] text-ink/60"
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
