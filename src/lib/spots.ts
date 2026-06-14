import { Area } from "./types";
import { imageFor, genreTags } from "./images";
import { areaOpenRanking } from "./optimizer";

/** おでかけスポットのジャンル */
export type Genre =
  | "観光"
  | "ランチ"
  | "カフェ"
  | "グルメ"
  | "パン"
  | "レジャー"
  | "温泉"
  | "自然"
  | "ショッピング";

export const GENRES: Genre[] = [
  "観光",
  "ランチ",
  "カフェ",
  "グルメ",
  "パン",
  "レジャー",
  "温泉",
  "自然",
  "ショッピング",
];

export const GENRE_EMOJI: Record<Genre, string> = {
  観光: "📸",
  ランチ: "🍴",
  カフェ: "☕",
  グルメ: "🍢",
  パン: "🥐",
  レジャー: "🎡",
  温泉: "♨️",
  自然: "🌿",
  ショッピング: "🛍️",
};

export interface HyogoSpot {
  id: string;
  name: string;
  genre: Genre;
  area: Area;
  city: string;
  description: string;
  /** 最寄り店舗からのアクセス目安 */
  access: string;
  /** 最寄りの神戸マツダ店舗ID */
  relatedStoreId: string;
  tags: string[];
  featured?: boolean;
}

export const SPOTS: HyogoSpot[] = [
  // ───── 神戸エリア ─────
  { id: "nankinmachi", name: "南京町（神戸中華街）", genre: "グルメ", area: "神戸", city: "神戸市中央区", description: "豚まん・小籠包の食べ歩きが楽しい、活気あふれる中華街。", access: "神戸本店から車で約10分", relatedStoreId: "kobe-honten", tags: ["食べ歩き", "中華", "定番"], featured: true },
  { id: "kobe-bakery", name: "神戸の名物ベーカリー", genre: "パン", area: "神戸", city: "神戸市中央区", description: "パンのまち神戸を代表する、山型食パンと焼きたてクロワッサン。", access: "神戸本店から車で約7分", relatedStoreId: "kobe-honten", tags: ["パン屋", "食パン", "話題"], featured: true },
  { id: "kitano-cafe", name: "北野の坂道カフェ", genre: "カフェ", area: "神戸", city: "神戸市中央区", description: "異人館街の見晴らしのいいテラスで、ひと息つける人気カフェ。", access: "神戸本店から車で約15分", relatedStoreId: "kobe-honten", tags: ["眺望", "テラス", "映え"], featured: true },
  { id: "harborland", name: "神戸ハーバーランド umie", genre: "ショッピング", area: "神戸", city: "神戸市中央区", description: "海沿いの大型モール。観覧車やグルメも充実。", access: "神戸本店から車で約9分", relatedStoreId: "kobe-honten", tags: ["モール", "海沿い", "家族"] },
  { id: "rokko-bokujo", name: "六甲山牧場", genre: "レジャー", area: "神戸", city: "神戸市灘区", description: "羊やヤギとふれあえる高原牧場。チーズ作り体験も。", access: "灘店から車で約30分", relatedStoreId: "nada", tags: ["動物", "高原", "体験"], featured: true },
  { id: "arima-onsen", name: "有馬温泉", genre: "温泉", area: "神戸", city: "神戸市北区", description: "日本三古湯のひとつ。金泉・銀泉の名湯めぐり。", access: "北神店から車で約20分", relatedStoreId: "hokushin", tags: ["名湯", "日帰り湯", "風情"], featured: true },
  { id: "maiko-bridge", name: "舞子公園・明石海峡大橋", genre: "観光", area: "神戸", city: "神戸市垂水区", description: "世界最大級の吊り橋を真下から。海上散歩も楽しめる。", access: "垂水多聞店から車で約8分", relatedStoreId: "tarumi-tamon", tags: ["橋", "絶景", "海"] },
  // ───── 阪神エリア ─────
  { id: "koshien", name: "阪神甲子園球場", genre: "レジャー", area: "阪神", city: "西宮市", description: "野球の聖地。甲子園歴史館の見学も楽しい。", access: "西宮店から車で約12分", relatedStoreId: "nishinomiya", tags: ["野球", "聖地", "見学"] },
  { id: "nishinomiya-gardens", name: "阪急西宮ガーデンズ", genre: "ショッピング", area: "阪神", city: "西宮市", description: "阪神間最大級のモール。シネマや屋上庭園も。", access: "西宮店から車で約15分", relatedStoreId: "nishinomiya", tags: ["モール", "映画", "家族"] },
  { id: "takarazuka-gekijo", name: "宝塚大劇場", genre: "観光", area: "阪神", city: "宝塚市", description: "夢と憧れの舞台。街全体に華やかな空気が漂う。", access: "宝塚店から車で約10分", relatedStoreId: "takarazuka", tags: ["歌劇", "華やか", "文化"], featured: true },
  { id: "itami-sky", name: "伊丹スカイパーク", genre: "レジャー", area: "阪神", city: "伊丹市", description: "滑走路の真横で離発着を間近に。迫力満点の公園。", access: "伊丹店から車で約10分", relatedStoreId: "itami", tags: ["飛行機", "公園", "子ども"] },
  { id: "sanda-outlet", name: "神戸三田プレミアム・アウトレット", genre: "ショッピング", area: "阪神", city: "三田市", description: "西日本最大級のアウトレット。一日中楽しめる。", access: "三田店から車で約12分", relatedStoreId: "sanda", tags: ["アウトレット", "買い物"] },
  { id: "sanda-cafe", name: "三田の田園カフェ", genre: "カフェ", area: "阪神", city: "三田市", description: "里山の景色を眺めながら過ごす、のどかな古民家カフェ。", access: "三田店から車で約10分", relatedStoreId: "sanda", tags: ["古民家", "のどか", "自家焙煎"] },
  // ───── 東播磨エリア ─────
  { id: "akashi-tako", name: "魚の棚・明石焼き", genre: "ランチ", area: "東播磨", city: "明石市", description: "ふわとろの本場明石焼き(玉子焼)と新鮮な明石ダコ。", access: "大久保店から車で約15分", relatedStoreId: "okubo", tags: ["明石焼き", "海鮮", "名物"], featured: true },
  { id: "akashi-park", name: "明石公園", genre: "自然", area: "東播磨", city: "明石市", description: "明石城跡を中心とした広大な公園。桜やボートも。", access: "大久保店から車で約13分", relatedStoreId: "okubo", tags: ["公園", "桜", "城跡"] },
  { id: "kakogawa-katsumeshi", name: "加古川かつめし", genre: "ランチ", area: "東播磨", city: "加古川市", description: "ビフカツにデミグラス。加古川のソウルフード。", access: "加古川店周辺の各店", relatedStoreId: "kakogawa", tags: ["ご当地", "ボリューム"] },
  // ───── 西播磨エリア ─────
  { id: "himeji-castle", name: "世界遺産 姫路城", genre: "観光", area: "西播磨", city: "姫路市", description: "白鷺城の愛称で知られる国宝。天守からの眺めは格別。", access: "姫路店から車で約20分", relatedStoreId: "himeji", tags: ["世界遺産", "国宝", "定番"], featured: true },
  { id: "himeji-central", name: "姫路セントラルパーク", genre: "レジャー", area: "西播磨", city: "姫路市", description: "サファリと遊園地、夏はプールも。一日たっぷり遊べる。", access: "姫路東店から車で約12分", relatedStoreId: "himeji-higashi", tags: ["サファリ", "遊園地", "家族"], featured: true },
  { id: "himeji-oden", name: "姫路おでん", genre: "グルメ", area: "西播磨", city: "姫路市", description: "生姜醤油でいただく姫路名物。城下のあなご料理も。", access: "姫路店周辺の各店", relatedStoreId: "himeji", tags: ["おでん", "ご当地"] },
  { id: "tatsuno-cafe", name: "龍野 城下町カフェ", genre: "カフェ", area: "西播磨", city: "たつの市", description: "淡口醤油の城下町・龍野の、風情ある古民家カフェ。", access: "太子店から車で約15分", relatedStoreId: "taishi", tags: ["城下町", "古民家", "醤油"] },
  // ───── 北播磨エリア ─────
  { id: "nesta", name: "ネスタリゾート神戸", genre: "レジャー", area: "北播磨", city: "三木市", description: "大自然を遊びつくす体験型リゾート。温泉も。", access: "三木店から車で約15分", relatedStoreId: "miki", tags: ["リゾート", "アウトドア", "家族"], featured: true },
  { id: "heso-park", name: "日本へそ公園", genre: "自然", area: "北播磨", city: "西脇市", description: "東経135度と北緯35度が交わる「日本のへそ」。", access: "西脇店から車で約10分", relatedStoreId: "nishiwaki", tags: ["公園", "科学館", "ユニーク"] },
  // ───── 但馬エリア ─────
  { id: "kinosaki", name: "城崎温泉", genre: "温泉", area: "但馬", city: "豊岡市", description: "浴衣で外湯めぐり。柳並木の風情ある温泉街。", access: "豊岡店から車で約20分", relatedStoreId: "toyooka", tags: ["外湯めぐり", "浴衣", "名湯"], featured: true },
  { id: "genbudo", name: "玄武洞公園", genre: "自然", area: "但馬", city: "豊岡市", description: "柱状節理が織りなす不思議な造形美。", access: "豊岡店から車で約18分", relatedStoreId: "toyooka", tags: ["絶景", "地質", "散策"] },
  // ───── 淡路エリア ─────
  { id: "awaji-uzu", name: "淡路 うずしおクルーズ", genre: "観光", area: "淡路", city: "南あわじ市", description: "世界最大級のうずしおを、観潮船で間近に体感。", access: "洲本店から車で約40分", relatedStoreId: "sumoto", tags: ["うずしお", "クルーズ", "絶景"], featured: true },
  { id: "awaji-onion", name: "淡路島玉ねぎグルメ", genre: "ランチ", area: "淡路", city: "洲本市", description: "甘くてとろける淡路島玉ねぎを使った絶品ランチ。", access: "洲本店から車で約10分", relatedStoreId: "sumoto", tags: ["玉ねぎ", "ご当地", "海カフェ"] },
  { id: "sumoto-onsen", name: "洲本温泉", genre: "温泉", area: "淡路", city: "洲本市", description: "海辺に湯けむり立つ、淡路島の温泉郷。", access: "洲本店から車で約8分", relatedStoreId: "sumoto", tags: ["海", "日帰り湯", "リゾート"] },
];

export const SPOT_MAP: Record<string, HyogoSpot> = Object.fromEntries(
  SPOTS.map((s) => [s.id, s]),
);

export function spotPhoto(s: HyogoSpot, w = 800, h = 600): string {
  return imageFor(s.name, genreTags(s.genre), "hspot-" + s.id, w, h);
}

/**
 * 「空き枠が多いエリア」の注目スポットを返す（トップページ用）。
 * 空きの多い上位エリアのスポットを優先して並べます。
 */
export function featuredSpots(count = 8): HyogoSpot[] {
  const ranking = areaOpenRanking();
  const topAreas = new Set(ranking.slice(0, 3).map((r) => r.area));
  const inTop = SPOTS.filter((s) => topAreas.has(s.area));
  const ordered = [
    ...inTop.filter((s) => s.featured),
    ...inTop.filter((s) => !s.featured),
  ];
  const picked: HyogoSpot[] = [];
  for (const s of ordered) {
    if (!picked.includes(s)) picked.push(s);
    if (picked.length >= count) break;
  }
  // 足りなければ全体から補完
  if (picked.length < count) {
    for (const s of SPOTS) {
      if (!picked.includes(s)) picked.push(s);
      if (picked.length >= count) break;
    }
  }
  return picked;
}

/** トップのエリア空き状況（最も空きが多いエリア名） */
export function topOpenArea(): Area {
  return areaOpenRanking()[0]?.area ?? "神戸";
}
