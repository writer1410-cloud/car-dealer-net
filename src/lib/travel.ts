/**
 * アクセス目安（移動手段別の所要時間）ユーティリティ。
 *
 * スポットの access 文字列は「車で約N分」という表記なので、
 * そこから車の分数を取り出し、徒歩・自転車・電車のおおよその目安を概算します。
 * （市街地の平均速度をもとにした直線的な概算で、正確な経路時間ではありません）
 */

export type TravelMode = "car" | "train" | "bike" | "walk";

export interface TravelTimes {
  car: number;
  train: number;
  bike: number;
  walk: number;
}

export const TRAVEL_EMOJI: Record<TravelMode, string> = {
  car: "🚗",
  train: "🚉",
  bike: "🚲",
  walk: "🚶",
};

export const TRAVEL_LABEL: Record<TravelMode, string> = {
  car: "車",
  train: "電車",
  bike: "自転車",
  walk: "徒歩",
};

/** access 文字列（例:「神戸本店から車で約10分」「車で約8分」）から車の分数を抽出 */
export function parseCarMinutes(access: string): number | null {
  const m = access.match(/(\d+)\s*分/);
  return m ? parseInt(m[1], 10) : null;
}

/**
 * 車の所要時間（分）から、徒歩・自転車・電車のおおよその目安を概算する。
 * 市街地平均30km/h で距離を推定し、徒歩4.8km/h・自転車15km/h で換算。
 * 電車は待ち時間・乗換を含むおおまかな目安。
 */
export function estimateTravelTimes(carMin: number): TravelTimes {
  const distKm = (carMin / 60) * 30;
  const walk = Math.max(1, Math.round((distKm / 4.8) * 60));
  const bike = Math.max(1, Math.round((distKm / 15) * 60));
  const train = Math.max(1, Math.round(carMin * 1.2 + 4));
  return { car: carMin, train, bike, walk };
}

/** access 文字列から移動手段別の目安を返す（分数が読めなければ null） */
export function travelTimesFromAccess(access: string): TravelTimes | null {
  const carMin = parseCarMinutes(access);
  if (carMin == null) return null;
  return estimateTravelTimes(carMin);
}

/** 分を「N分」または「N時間M分」に整形 */
export function formatMinutes(min: number): string {
  if (min < 60) return `${min}分`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}時間` : `${h}時間${m}分`;
}

/** access 文字列のうち分数を取り除いた接頭辞（例:「神戸本店から」）を返す */
export function accessPrefix(access: string): string {
  const idx = access.search(/車で約?\s*\d+\s*分/);
  if (idx <= 0) return "";
  return access.slice(0, idx).trim();
}
