import { DayLoad, Period, Slot } from "./types";
import { STORES, getStore } from "./stores";
import { STAFF } from "./staff";

/**
 * デモの基準日。実運用では new Date() を使いますが、
 * サーバー/クライアントで描画を一致させ、再現性を保つため固定します。
 */
export const TODAY = "2026-06-05";

export const AM_TIMES = ["09:00", "10:00", "11:00"];
export const PM_TIMES = ["13:00", "14:00", "15:00", "16:00"];

/** 文字列から 0..1 の擬似乱数を生成（決定論的） */
function seededRandom(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // 0..1 に正規化
  return ((h >>> 0) % 100000) / 100000;
}

/** 基準日から日数を足した YYYY-MM-DD を返す */
export function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** 直近 n 日分の日付リスト */
export function dateRange(days: number, from: string = TODAY): string[] {
  return Array.from({ length: days }, (_, i) => addDays(from, i));
}

export const HORIZON_DAYS = 14;
export const DATES = dateRange(HORIZON_DAYS);

export function formatDate(date: string): string {
  const d = new Date(date + "T00:00:00");
  const w = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${d.getMonth() + 1}/${d.getDate()}(${w})`;
}

export function isWeekend(date: string): boolean {
  const day = new Date(date + "T00:00:00").getDay();
  return day === 0 || day === 6;
}

const timeToPeriod = (time: string): Period =>
  AM_TIMES.includes(time) ? "AM" : "PM";

/**
 * 全店舗・全日付のスロットを生成。
 * 「午前に予約が集中し、午後が空く」傾向を意図的に作り込みます。
 */
export function generateSlots(): Slot[] {
  const slots: Slot[] = [];
  for (const store of STORES) {
    for (const date of DATES) {
      const weekend = isWeekend(date);
      // 店舗・日ごとの混雑度ベース（0.55〜0.95）
      const dayHeat = 0.55 + seededRandom(`${store.id}|${date}|heat`) * 0.4;
      for (const time of [...AM_TIMES, ...PM_TIMES]) {
        const period = timeToPeriod(time);
        const capacity = store.bays;
        // 午前は需要が高く、午後は落ち込む。週末は午前がさらに集中。
        let demand = dayHeat;
        if (period === "AM") demand *= weekend ? 1.15 : 1.0;
        else demand *= weekend ? 0.62 : 0.5;
        // 早い時間ほど人気
        if (time === "09:00" || time === "10:00") demand *= 1.08;
        if (time === "16:00") demand *= 0.8;
        const jitter = seededRandom(`${store.id}|${date}|${time}`) * 0.25;
        const ratio = Math.min(1.15, demand + jitter - 0.1);
        const booked = Math.max(
          0,
          Math.min(capacity, Math.round(capacity * ratio)),
        );
        slots.push({ storeId: store.id, date, time, period, capacity, booked });
      }
    }
  }
  return slots;
}

/** メモ化（モジュール内で1回だけ生成） */
let _slots: Slot[] | null = null;
export function allSlots(): Slot[] {
  if (!_slots) _slots = generateSlots();
  return _slots;
}

export function slotsFor(storeId: string, date: string): Slot[] {
  return allSlots().filter((s) => s.storeId === storeId && s.date === date);
}

/**
 * その店舗・その日に出勤する所属スタッフ数。
 * 一部スタッフは決定論的に「休み」とします。
 */
export function staffCountFor(storeId: string, date: string): number {
  const home = STAFF.filter((s) => s.homeStoreId === storeId);
  return home.filter(
    (s) => seededRandom(`${s.id}|${date}|off`) > 0.18, // 約18%が休み
  ).length;
}

/** 店舗・日の集計を返す */
export function dayLoadFor(storeId: string, date: string): DayLoad {
  const slots = slotsFor(storeId, date);
  const sum = (p: Period, key: "capacity" | "booked") =>
    slots
      .filter((s) => s.period === p)
      .reduce((acc, s) => acc + s[key], 0);
  return {
    storeId,
    date,
    amCapacity: sum("AM", "capacity"),
    amBooked: sum("AM", "booked"),
    pmCapacity: sum("PM", "capacity"),
    pmBooked: sum("PM", "booked"),
    staffCount: staffCountFor(storeId, date),
  };
}

/** 全店舗・全日付の集計 */
export function allDayLoads(dates: string[] = DATES): DayLoad[] {
  const out: DayLoad[] = [];
  for (const store of STORES) {
    for (const date of dates) out.push(dayLoadFor(store.id, date));
  }
  return out;
}

export function utilization(load: DayLoad): {
  am: number;
  pm: number;
  total: number;
} {
  const am = load.amCapacity ? load.amBooked / load.amCapacity : 0;
  const pm = load.pmCapacity ? load.pmBooked / load.pmCapacity : 0;
  const cap = load.amCapacity + load.pmCapacity;
  const total = cap ? (load.amBooked + load.pmBooked) / cap : 0;
  return { am, pm, total };
}

/** 店舗・日の空き台数（AM/PM） */
export function openSlots(storeId: string, date: string): {
  am: number;
  pm: number;
} {
  const l = dayLoadFor(storeId, date);
  return {
    am: Math.max(0, l.amCapacity - l.amBooked),
    pm: Math.max(0, l.pmCapacity - l.pmBooked),
  };
}

export { getStore };
