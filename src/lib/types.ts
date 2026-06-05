// 神戸マツダ マルチストア点検スケジューリング — 型定義

/** 兵庫県内のエリア区分 */
export type Area =
  | "神戸"
  | "阪神"
  | "東播磨"
  | "西播磨"
  | "北播磨"
  | "丹波";

/** 整備サービスの種類 */
export type ServiceType =
  | "車検"
  | "12ヶ月点検"
  | "6ヶ月点検"
  | "オイル交換"
  | "タイヤ交換";

export interface ServiceMeta {
  type: ServiceType;
  /** ピットを占有するおおよその時間（分） */
  durationMin: number;
  /** 1台あたりに必要な整備士の人数 */
  staffNeeded: number;
  label: string;
  emoji: string;
}

/** 近隣のおでかけスポット（グルメ・観光・遊び） */
export interface Spot {
  name: string;
  category: "グルメ" | "観光" | "遊び" | "ショッピング";
  emoji: string;
  description: string;
  /** 店舗からの目安（徒歩・車での所要） */
  access: string;
}

export interface Store {
  id: string;
  name: string;
  area: Area;
  city: string;
  address: string;
  lat: number;
  lng: number;
  /** 同時に整備できるピット数 */
  bays: number;
  tel: string;
  /** 店舗のキャッチコピー */
  catch: string;
  /** 近隣のおでかけスポット */
  spots: Spot[];
}

export interface Staff {
  id: string;
  name: string;
  /** 通常勤務する店舗ID */
  homeStoreId: string;
  /** 応援勤務が可能な店舗ID */
  canWorkStoreIds: string[];
  /** 保有資格・得意分野 */
  skills: string[];
  /** 1級/2級整備士など */
  grade: "1級整備士" | "2級整備士" | "メカニック" | "フロント";
}

/** 時間帯 */
export type Period = "AM" | "PM";

export interface Slot {
  storeId: string;
  /** YYYY-MM-DD */
  date: string;
  /** "09:00" など */
  time: string;
  period: Period;
  /** この時間帯に受け入れ可能な台数 */
  capacity: number;
  /** すでに入っている予約台数 */
  booked: number;
}

/** ある店舗・ある日の集計 */
export interface DayLoad {
  storeId: string;
  date: string;
  amCapacity: number;
  amBooked: number;
  pmCapacity: number;
  pmBooked: number;
  /** その日に出勤するスタッフ数（応援含む） */
  staffCount: number;
}

/** AIによる最適化提案の種類 */
export type SuggestionKind =
  | "afternoon-shift" // 午後への誘導
  | "cross-store" // 近隣店舗への振り分け
  | "staff-move" // スタッフの応援配置
  | "ok"; // 問題なし

export interface Suggestion {
  kind: SuggestionKind;
  date: string;
  storeId: string;
  /** 重要度 0-100 */
  severity: number;
  title: string;
  detail: string;
  /** 期待される効果 */
  impact: string;
}

/** ユーザーへ提示する店舗ごとの空き状況（おすすめ度つき） */
export interface Availability {
  store: Store;
  date: string;
  amOpen: number;
  pmOpen: number;
  /** 0-100。高いほどおすすめ（午後の空き・目的地との近さで加点） */
  score: number;
  /** おすすめ理由 */
  reasons: string[];
  /** 目的地エリアからの距離(km)目安 */
  distanceKm: number;
}
