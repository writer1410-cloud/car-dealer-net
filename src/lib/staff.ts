import { Staff } from "./types";
import { STORES } from "./stores";

/**
 * スタッフマスタ（デモ用）。
 * 全店舗ぶんのスタッフを店舗データから決定論的に生成します。
 * 各スタッフは所属店舗(homeStoreId)に固定で勤務します。
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

let counter = 0;

export const STAFF: Staff[] = STORES.flatMap((store) => {
  const size = store.bays; // ピット数に応じた人数

  return Array.from({ length: size }, (_, i) => {
    counter++;
    const id = "s" + String(counter).padStart(3, "0");

    let grade: Grade;
    if (i === 0) grade = "1級整備士";
    else if (i === size - 1) grade = "フロント";
    else if (i % 2 === 1) grade = "2級整備士";
    else grade = "メカニック";

    const name =
      SURNAMES[counter % SURNAMES.length] +
      " " +
      GIVEN[(counter * 3) % GIVEN.length];

    return {
      id,
      name,
      homeStoreId: store.id,
      skills: pickSkills(grade, counter),
      grade,
    } satisfies Staff;
  });
});

export const STAFF_MAP: Record<string, Staff> = Object.fromEntries(
  STAFF.map((s) => [s.id, s]),
);

/** その店舗に勤務するスタッフ一覧 */
export function staffOfStore(storeId: string): Staff[] {
  return STAFF.filter((s) => s.homeStoreId === storeId);
}
