import { Area } from "./types";
import { imageFor } from "./images";

export type PlanType = "日帰り" | "宿泊";

export interface RentalPlan {
  id: string;
  name: string;
  type: PlanType;
  /** 目的地エリア */
  area: Area;
  /** 料金（円） */
  price: number;
  /** 料金の単位説明 */
  priceNote: string;
  /** 車種クラス */
  carClass: string;
  /** キャッチコピー */
  catch: string;
  /** プランに含まれるもの */
  includes: string[];
  /** めぐれるスポット */
  spots: string[];
  /** 出発の目安となる店舗ID */
  fromStoreId: string;
  /** バッジ（人気・お得など） */
  badge?: string;
  /** 訪日外国人向けプランか */
  inbound?: boolean;
  /** 対応言語（インバウンド向け） */
  langs?: string[];
  /** 英語サブタイトル（インバウンド向け） */
  subtitleEn?: string;
  /** 個別指定の写真URL（あれば自動写真より優先） */
  photo?: string;
}


export const PLANS: RentalPlan[] = [
  // ───────── 日帰りプラン ─────────
  {
    id: "himeji-day",
    name: "世界遺産・姫路城 日帰りドライブ",
    type: "日帰り",
    area: "西播磨",
    price: 5800,
    priceNote: "/ 1日（軽自動車・税込）",
    carClass: "軽自動車〜コンパクト",
    catch: "点検のついでに、レンタカーで姫路観光へ。",
    badge: "人気No.1",
    includes: [
      "レンタカー 9:00〜18:00",
      "姫路城 入城割引クーポン",
      "ETC車載器・カーナビ標準装備",
      "免責補償込み",
    ],
    spots: ["姫路城", "好古園", "書写山圓教寺", "城下町グルメ"],
    fromStoreId: "himeji",
  },
  {
    id: "awaji-day",
    name: "淡路島 うずしお＆絶景カフェ 日帰り",
    type: "日帰り",
    area: "淡路",
    price: 7800,
    priceNote: "/ 1日（コンパクト・税込）",
    carClass: "コンパクト",
    catch: "海沿いドライブで島をぐるり。",
    badge: "お得",
    includes: [
      "レンタカー 9:00〜19:00",
      "観潮船クーポン",
      "淡路島玉ねぎグルメ特典",
      "ETC・カーナビ・免責補償込み",
    ],
    spots: ["うずしお", "洲本温泉", "大浜海岸", "海カフェ"],
    fromStoreId: "sumoto",
    photo: "/spots/awaji-uzu.jpg",
  },
  {
    id: "kobe-day",
    name: "神戸ベイエリア 食べ歩き日帰り",
    type: "日帰り",
    area: "神戸",
    price: 6200,
    priceNote: "/ 1日（コンパクト・税込）",
    carClass: "コンパクト",
    catch: "港町グルメとパン屋さんめぐり。",
    includes: [
      "レンタカー 9:00〜18:00",
      "南京町・ベーカリー食べ歩きクーポン",
      "ハーバーランド駐車優待",
      "ETC・カーナビ・免責補償込み",
    ],
    spots: ["南京町", "メリケンパーク", "話題のベーカリー", "ハーバーランド"],
    fromStoreId: "kobe-honten",
  },
  {
    id: "akashi-day",
    name: "明石・舞子 海さんぽ 日帰り",
    type: "日帰り",
    area: "東播磨",
    price: 5500,
    priceNote: "/ 1日（軽自動車・税込）",
    carClass: "軽自動車",
    catch: "明石海峡大橋と本場の明石焼き。",
    includes: [
      "レンタカー 9:00〜18:00",
      "魚の棚 明石焼きクーポン",
      "天文科学館 入館割引",
      "ETC・カーナビ・免責補償込み",
    ],
    spots: ["明石海峡大橋／舞子公園", "魚の棚商店街", "明石公園"],
    fromStoreId: "okubo",
  },
  // ───────── 宿泊プラン ─────────
  {
    id: "kinosaki-stay",
    name: "城崎温泉 1泊2日 湯めぐりプラン",
    type: "宿泊",
    area: "但馬",
    price: 24800,
    priceNote: "/ 1名（1泊2食・レンタカー込み）",
    carClass: "コンパクト〜ミドル",
    catch: "外湯めぐりと但馬牛で、ぜいたくな週末。",
    badge: "おすすめ",
    includes: [
      "レンタカー 2日間",
      "城崎温泉 旅館1泊2食付き",
      "外湯めぐりフリーパス",
      "玄武洞・マリンワールド優待",
      "ETC・カーナビ・免責補償込み",
    ],
    spots: ["城崎温泉", "外湯めぐり", "玄武洞", "城崎マリンワールド"],
    fromStoreId: "toyooka",
  },
  {
    id: "awaji-stay",
    name: "淡路島 1泊2日 リゾートステイ",
    type: "宿泊",
    area: "淡路",
    price: 22800,
    priceNote: "/ 1名（1泊2食・レンタカー込み）",
    carClass: "コンパクト〜ミドル",
    catch: "海辺のリゾートで島時間を満喫。",
    includes: [
      "レンタカー 2日間",
      "海沿いリゾート1泊2食付き",
      "うずしおクルーズ乗船券",
      "島グルメレストラン優待",
      "ETC・カーナビ・免責補償込み",
    ],
    spots: ["うずしお", "洲本温泉", "ONOKORO", "淡路島グルメ"],
    fromStoreId: "sumoto",
  },
  // ───────── インバウンド向けプラン（神戸空港 国際化対応）─────────
  {
    id: "kobe-airport-1day",
    name: "神戸空港発 神戸＆有馬 1DAYドライブ",
    type: "日帰り",
    area: "神戸",
    price: 12800,
    priceNote: "/ 1台（コンパクト・税込）",
    carClass: "コンパクト〜ミドル",
    catch: "神戸空港でレンタル、その日のうちに神戸と有馬温泉を満喫。",
    badge: "訪日対応",
    inbound: true,
    langs: ["EN", "中文", "한국어"],
    subtitleEn: "Kobe Airport pick-up · Kobe city & Arima Onsen day trip",
    includes: [
      "神戸空港カウンターで受取／返却",
      "多言語ナビ＆英語サポートデスク",
      "観光スポット入場クーポン",
      "Wi-Fiルーター・ETC・免責補償込み",
    ],
    spots: ["南京町", "北野異人館", "有馬温泉", "メリケンパーク"],
    fromStoreId: "kobe-honten",
  },
  {
    id: "kobe-airport-2days",
    name: "Kobe Airport発着 姫路城＆城崎温泉 2DAYS",
    type: "宿泊",
    area: "西播磨",
    price: 39800,
    priceNote: "/ 1名（1泊2食・レンタカー込み）",
    carClass: "ミドル〜SUV",
    catch: "空港発着で世界遺産と名湯をめぐる、訪日ゴールデンルート。",
    badge: "訪日対応",
    inbound: true,
    langs: ["EN", "中文", "한국어"],
    subtitleEn: "Kobe Airport in/out · Himeji Castle & Kinosaki Onsen 2-day tour",
    includes: [
      "神戸空港カウンターで受取／返却",
      "多言語ナビ＆24時間英語サポート",
      "城崎温泉 旅館1泊2食付き",
      "姫路城・外湯めぐり 入場パス",
      "Wi-Fiルーター・ETC・免責補償込み",
    ],
    spots: ["姫路城", "書写山圓教寺", "城崎温泉", "玄武洞"],
    fromStoreId: "himeji",
  },
];

export const PLAN_MAP: Record<string, RentalPlan> = Object.fromEntries(
  PLANS.map((p) => [p.id, p]),
);

export function planPhoto(p: RentalPlan, w = 1200, h = 800): string {
  if (p.photo && p.photo.trim()) return p.photo;
  return imageFor(p.name, "japan,roadtrip", "rental-" + p.id, w, h);
}

export const DAY_PLANS = PLANS.filter((p) => p.type === "日帰り");
export const STAY_PLANS = PLANS.filter((p) => p.type === "宿泊");
export const INBOUND_PLANS = PLANS.filter((p) => p.inbound);

export function formatYen(n: number): string {
  return "¥" + n.toLocaleString("ja-JP");
}
