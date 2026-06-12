import { Staff } from "./types";
import { STORES, distanceKm, getStore } from "./stores";

/**
 * スタッフマスタ（デモ用）。
 * 全店舗ぶんのスタッフを店舗データから決定論的に生成します。
 * homeStoreId が通常勤務店舗、canWorkStoreIds が応援可能店舗（近隣店舗）。
 * 「神戸店勤務だが、空いている日は近隣店で勤務」といった
 * 店舗をまたいだシフト管理を表現します。
 */

const SURNAMES = [
  "佐藤", "鈴木", "高橋", "田中", "伊藤", "渡辺", "山本", "中村", "小林", "加藤",
  "吉田", "山田", "佐々木", "山口", "松本", "井上", "木村", "林", "清水", "森",
  "池田", "橋本", "石川", "前田", "藤田", "後藤", "岡田", "長谷川", "村上", "近藤",
  "坂本", "遠藤", "青木", "西村", "福田",
];
const GIVEN = [
  "健司", "美咲", "拓也", "玲奈", "大輔", "七海", "翔", "由香", "隆", "彩",
  "修", "真央", "浩二", "さくら", "諒", "愛", "大樹", "優", "直樹", "陽子",
  "亮太", "香織", "和也", "結衣", "健太", "彩花", "涼", "美穂", "武", "千夏",
];

const SKILL = {
  "1級整備士": ["車検", "EV/HV", "電装", "故障診断"],
  "2級整備士": ["車検", "一般整備", "板金"],
  メカニック: ["一般整備", "タイヤ", "オイル"],
  フロント: ["受付", "見積", "保険"],
} as const;

type Grade = Staff["grade"];

function pickSkills(grade: Grade, seed: number): string[] {
  const pool = SKILL[grade];
  const out = new Set<string>();
  for (let j = 0; j < 2; j++) out.add(pool[(seed + j * 2) % pool.length]);
  return [...out];
}

/** 近隣（maxKm以内）の店舗IDを近い順に count 件 */
function nearestStoreIds(storeId: string, count: number, maxKm: number): string[] {
  const store = getStore(storeId)!;
  return STORES.filter((s) => s.id !== storeId)
    .map((s) => ({ id: s.id, d: distanceKm(store, s) }))
    .filter((x) => x.d <= maxKm)
    .sort((a, b) => a.d - b.d)
    .slice(0, count)
    .map((x) => x.id);
}

let counter = 0;

export const STAFF: Staff[] = STORES.flatMap((store) => {
  const size = store.bays; // ピット数に応じた人数
  const near2 = nearestStoreIds(store.id, 2, 35);
  const near1 = nearestStoreIds(store.id, 1, 30);

  return Array.from({ length: size }, (_, i) => {
    counter++;
    const id = "s" + String(counter).padStart(3, "0");

    let grade: Grade;
    let canWork: string[];
    if (i === 0) {
      grade = "1級整備士";
      canWork = near2;
    } else if (i === size - 1) {
      grade = "フロント";
      canWork = near1;
    } else if (i % 2 === 1) {
      grade = "2級整備士";
      canWork = near2;
    } else {
      grade = "メカニック";
      canWork = near1;
    }

    const name =
      SURNAMES[counter % SURNAMES.length] +
      " " +
      GIVEN[(counter * 3) % GIVEN.length];

    return {
      id,
      name,
      homeStoreId: store.id,
      canWorkStoreIds: canWork,
      skills: pickSkills(grade, counter),
      grade,
    } satisfies Staff;
  });
});

export const STAFF_MAP: Record<string, Staff> = Object.fromEntries(
  STAFF.map((s) => [s.id, s]),
);

/** 通常勤務がその店舗のスタッフ一覧 */
export function staffOfStore(storeId: string): Staff[] {
  return STAFF.filter((s) => s.homeStoreId === storeId);
}

/** その店舗に応援に来られるスタッフ（他店所属） */
export function helpersForStore(storeId: string): Staff[] {
  return STAFF.filter(
    (s) => s.homeStoreId !== storeId && s.canWorkStoreIds.includes(storeId),
  );
}
