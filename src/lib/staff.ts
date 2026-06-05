import { Staff } from "./types";

/**
 * スタッフマスタ（デモ用）。
 * homeStoreId が通常勤務店舗、canWorkStoreIds が応援可能店舗。
 * 「神戸店勤務だが、空いている日は明石店で勤務」といった
 * 店舗をまたいだシフト管理を表現します。
 */
export const STAFF: Staff[] = [
  // 神戸本店
  {
    id: "s01",
    name: "山田 健司",
    homeStoreId: "kobe-honten",
    canWorkStoreIds: ["nishinomiya", "amagasaki"],
    skills: ["車検", "電装", "EV/HV"],
    grade: "1級整備士",
  },
  {
    id: "s02",
    name: "佐藤 美咲",
    homeStoreId: "kobe-honten",
    canWorkStoreIds: ["nishinomiya"],
    skills: ["車検", "板金"],
    grade: "2級整備士",
  },
  {
    id: "s03",
    name: "田中 拓也",
    homeStoreId: "kobe-honten",
    canWorkStoreIds: ["akashi", "amagasaki"],
    skills: ["一般整備", "タイヤ"],
    grade: "メカニック",
  },
  {
    id: "s04",
    name: "中村 玲奈",
    homeStoreId: "kobe-honten",
    canWorkStoreIds: [],
    skills: ["受付", "見積"],
    grade: "フロント",
  },
  // 西宮店
  {
    id: "s05",
    name: "小林 大輔",
    homeStoreId: "nishinomiya",
    canWorkStoreIds: ["kobe-honten", "amagasaki"],
    skills: ["車検", "EV/HV"],
    grade: "1級整備士",
  },
  {
    id: "s06",
    name: "加藤 七海",
    homeStoreId: "nishinomiya",
    canWorkStoreIds: ["amagasaki"],
    skills: ["一般整備", "オイル"],
    grade: "2級整備士",
  },
  {
    id: "s07",
    name: "吉田 翔",
    homeStoreId: "nishinomiya",
    canWorkStoreIds: ["kobe-honten"],
    skills: ["受付", "保険"],
    grade: "フロント",
  },
  // 尼崎店
  {
    id: "s08",
    name: "山本 隆",
    homeStoreId: "amagasaki",
    canWorkStoreIds: ["nishinomiya", "kobe-honten"],
    skills: ["車検", "一般整備"],
    grade: "1級整備士",
  },
  {
    id: "s09",
    name: "松本 由香",
    homeStoreId: "amagasaki",
    canWorkStoreIds: ["nishinomiya"],
    skills: ["一般整備", "タイヤ"],
    grade: "メカニック",
  },
  // 明石店
  {
    id: "s10",
    name: "井上 修",
    homeStoreId: "akashi",
    canWorkStoreIds: ["kakogawa", "himeji"],
    skills: ["車検", "電装"],
    grade: "1級整備士",
  },
  {
    id: "s11",
    name: "木村 彩",
    homeStoreId: "akashi",
    canWorkStoreIds: ["kakogawa"],
    skills: ["一般整備", "オイル"],
    grade: "2級整備士",
  },
  {
    id: "s12",
    name: "林 健太",
    homeStoreId: "akashi",
    canWorkStoreIds: ["kobe-honten", "kakogawa"],
    skills: ["受付", "見積"],
    grade: "フロント",
  },
  // 加古川店
  {
    id: "s13",
    name: "清水 武",
    homeStoreId: "kakogawa",
    canWorkStoreIds: ["akashi", "himeji"],
    skills: ["車検", "一般整備"],
    grade: "1級整備士",
  },
  {
    id: "s14",
    name: "森田 真央",
    homeStoreId: "kakogawa",
    canWorkStoreIds: ["akashi"],
    skills: ["一般整備", "タイヤ"],
    grade: "メカニック",
  },
  // 姫路店
  {
    id: "s15",
    name: "池田 浩二",
    homeStoreId: "himeji",
    canWorkStoreIds: ["kakogawa", "akashi"],
    skills: ["車検", "EV/HV", "電装"],
    grade: "1級整備士",
  },
  {
    id: "s16",
    name: "橋本 さくら",
    homeStoreId: "himeji",
    canWorkStoreIds: ["kakogawa"],
    skills: ["一般整備", "板金"],
    grade: "2級整備士",
  },
  {
    id: "s17",
    name: "石川 諒",
    homeStoreId: "himeji",
    canWorkStoreIds: ["kakogawa"],
    skills: ["受付", "保険"],
    grade: "フロント",
  },
];

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
