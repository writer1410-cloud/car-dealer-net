/* ───────── 関連写真ユーティリティ ─────────────────────────────
 * 内容に合ったキーワード（英語タグ）の写真を返します。
 * LoremFlickr はタグに一致する Flickr 写真を返すため、シード方式の
 * ランダム画像（picsum）と違い「南京町なのに海」のような不一致が
 * 起きません。`lock` 値で毎回同じ写真に固定し、SSR と一致させます。
 *
 * next/image は unoptimized 設定のため、画像は利用者のブラウザが
 * 直接読み込みます（ホストはワイルドカードで許可済み）。
 * ───────────────────────────────────────────────────────────── */

import { OFFLINE_PHOTO_FILES } from "./offline-photos.generated";

const BASE = "https://loremflickr.com";

/* オフライン（プレゼン用静的書き出し）モード。
 * NEXT_PUBLIC_OFFLINE=1 のとき、外部の写真サービスへアクセスせず、
 * 端末内で生成したブランド風プレースホルダ画像（SVGデータURI）を返す。 */
export const OFFLINE = process.env.NEXT_PUBLIC_OFFLINE === "1";

/** http(s) で始まる外部URLかどうか */
export const isRemoteUrl = (u?: string): boolean =>
  !!u && /^https?:\/\//.test(u);

/** シード文字列から決定的な lock 値（1..999）を作る */
function lock(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return (h % 999) + 1;
}

/* タグ・名称 → 絵文字（上から順にマッチ。オフライン画像の主役） */
const OFFLINE_EMOJI: [RegExp, string][] = [
  [/chinatown/, "🏮"],
  [/bread|bakery/, "🥖"],
  [/octopus/, "🐙"],
  [/oden|cutlet/, "🍢"],
  [/onion|vegetable/, "🧅"],
  [/seafood|sushi|fish/, "🍣"],
  [/japanesefood|restaurant|food/, "🍱"],
  [/onsen/, "♨️"],
  [/himeji|castle/, "🏯"],
  [/sheep|farm/, "🐑"],
  [/vineyard|grape|wine/, "🍇"],
  [/bridge/, "🌉"],
  [/whirlpool/, "🌀"],
  [/baseball|stadium/, "⚾"],
  [/theater|stage/, "🎭"],
  [/airplane|airport/, "✈️"],
  [/safari|animal|zoo/, "🦁"],
  [/ferriswheel|amusement|leisure/, "🎡"],
  [/shoppingmall|mall|shop/, "🛍️"],
  [/vintagehouse|landmark/, "🏛️"],
  [/tower/, "🗼"],
  [/harbor|port/, "⚓"],
  [/rockformation|cliff/, "🪨"],
  [/planetarium/, "🔭"],
  [/park/, "🌸"],
  [/temple|shrine/, "⛩️"],
  [/oldtown/, "🏘️"],
  [/countryside|village/, "🌾"],
  [/resort/, "🏝️"],
  [/cafe|coffee/, "☕"],
  [/nightview|city/, "🌃"],
  [/sea|coast|beach|ocean/, "🏖️"],
  [/mountain/, "⛰️"],
  [/nature|landscape/, "🏞️"],
  [/roadtrip|car/, "🚗"],
];

/* 上品なグラデーション配色（ブランドトーンに寄せた組み合わせ） */
const OFFLINE_PALETTES: [string, string][] = [
  ["#1f2937", "#4b5563"],
  ["#0f3d57", "#2a7fa3"],
  ["#3b2f2f", "#7c5a4a"],
  ["#16413b", "#3f8c7a"],
  ["#3a2c4d", "#7a5c9e"],
  ["#5a3a1e", "#b07a3c"],
  ["#1e3a5f", "#5b8fb0"],
  ["#3a3530", "#7a6f60"],
  ["#22343a", "#577a85"],
  ["#2d3a1f", "#6f8c4a"],
];

function offlineEmoji(label: string): string {
  for (const [re, e] of OFFLINE_EMOJI) if (re.test(label)) return e;
  return "📍";
}

/* タグ・名称（英語タグ）→ テーマのスラッグ。
 * public/offline/<スラッグ>.jpg があれば、その実写真をオフラインで使う。
 * 上から順にマッチ（具体的なものを先に）。 */
const THEME_RULES: [RegExp, string][] = [
  [/bread|bakery/, "bakery"],
  [/cafe|coffee/, "cafe"],
  [/onsen/, "onsen"],
  [/himeji|castle/, "castle"],
  [/temple|shrine/, "temple"],
  [/farm|sheep|vineyard|grape/, "farm"],
  [/nightview/, "night"],
  [/shoppingmall|mall|shop/, "shopping"],
  [/amusement|leisure|ferriswheel|safari|animal|zoo|stadium|baseball|theater|stage|planetarium|airport|airplane/, "leisure"],
  [/sea|coast|beach|harbor|port|bridge|whirlpool|ocean/, "sea"],
  [/japanesefood|restaurant|seafood|sushi|octopus|oden|cutlet|onion|fish|food/, "gourmet"],
  [/resort/, "resort"],
  [/nature|landscape|mountain|park|cliff|rockformation|countryside|village/, "nature"],
  [/chinatown|vintagehouse|oldtown|tower|landmark|temple/, "sightseeing"],
  [/store|kobe/, "store"],
];

/** 英語タグ → テーマスラッグ */
export function themeSlug(label: string): string {
  const l = label.toLowerCase();
  for (const [re, slug] of THEME_RULES) if (re.test(l)) return slug;
  return "store";
}

/** オフライン用のローカル実写真パス（public/offline 内にあれば）。無ければ null。 */
export function offlineLocalPhoto(slug: string): string | null {
  return OFFLINE_PHOTO_FILES[slug] ?? null;
}

/** オフライン用の画像を返す。
 *  1) public/offline/<slug>.jpg などの実写真があればそれを、
 *  2) 無ければ端末内生成のプレースホルダ（SVGデータURI）を返す。
 *  emoji: 未指定なら label から絵文字を推定。slug: 未指定なら label から推定。 */
export function offlineImage(
  label: string,
  seed: string,
  w = 800,
  h = 600,
  emoji?: string,
  slug?: string,
): string {
  const local = offlineLocalPhoto(slug ?? themeSlug(label));
  if (local) return local;
  const l = lock(seed);
  const [c1, c2] = OFFLINE_PALETTES[l % OFFLINE_PALETTES.length];
  const glyph = emoji ?? offlineEmoji(label.toLowerCase());
  const fs = Math.round(Math.min(w, h) * 0.42);
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>` +
    `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/></linearGradient></defs>` +
    `<rect width='${w}' height='${h}' fill='url(#g)'/>` +
    `<text x='50%' y='52%' text-anchor='middle' dominant-baseline='middle' font-size='${fs}'>${glyph}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** 英語タグ（カンマ区切り）と寸法から関連写真URLを生成 */
export function photoByTags(
  tags: string,
  seed = tags,
  w = 800,
  h = 600,
): string {
  if (OFFLINE) return offlineImage(tags, seed, w, h);
  const clean = tags.replace(/\s+/g, "");
  return `${BASE}/${w}/${h}/${clean}?lock=${lock(seed)}`;
}

/* 日本語の地名・名物 → 関連する英語タグ（上から順にマッチ） */
const KEYWORDS: [RegExp, string][] = [
  [/南京町|中華街/, "chinatown"],
  [/食パン/, "bread"],
  [/ベーカリー|パン屋|パン/, "bakery"],
  [/明石焼|玉子焼|たこ|タコ|蛸/, "octopus,japanesefood"],
  [/おでん/, "oden,japanesefood"],
  [/かつめし|ビフカツ|カツ/, "cutlet,japanesefood"],
  [/玉ねぎ|たまねぎ/, "onion,vegetable"],
  [/あなご|海鮮|寿司|魚の棚|魚/, "seafood,japanesefood"],
  [/城崎/, "japan,onsen,town"],
  [/有馬|湯めぐり|外湯|名湯|日帰り湯/, "onsen,japan"],
  [/温泉/, "onsen"],
  [/姫路/, "himeji,castle"],
  [/城跡|城下|お城|天守|城/, "japanesecastle,castle"],
  [/牧場|羊|ヤギ|牧/, "sheep,farm"],
  [/ワイナリー|ワイン|ぶどう|葡萄/, "vineyard,grapes"],
  [/明石海峡|吊り橋|大橋|橋/, "bridge,sea"],
  [/うずしお|観潮|クルーズ/, "whirlpool,sea"],
  [/球場|甲子園|野球/, "baseball,stadium"],
  [/歌劇|大劇場|宝塚/, "theater,stage"],
  [/スカイパーク|空港|飛行機|離発着|滑走路/, "airplane,airport"],
  [/サファリ/, "safari,animal"],
  [/遊園地|観覧車|プール/, "ferriswheel,amusementpark"],
  [/アウトレット|ガーデンズ|モール|umie|そごう|商業施設|プレミアム|ショッピング/, "shoppingmall"],
  [/異人館|洋館|北野/, "kobe,vintagehouse"],
  [/ポートタワー|タワー/, "kobe,tower"],
  [/ハーバー|メリケン|ベイ|港/, "harbor,kobe"],
  [/玄武洞|柱状節理|地質|奇岩/, "rockformation,cliff"],
  [/へそ公園|科学館|プラネタリウム|天文/, "planetarium"],
  [/公園|桜|花見/, "park,japan"],
  [/寺|神社|古刹|拝観|本堂/, "temple,japan"],
  [/醤油|城下町|龍野|レトロ/, "japan,oldtown"],
  [/古民家|里山|田園|のどか|高原|牧歌/, "countryside,japan"],
  [/リゾート|ネスタ/, "resort,nature"],
  [/カフェ|喫茶|焙煎|テラス/, "cafe"],
  [/夜景/, "nightview,city"],
  [/ビーチ|渚|海岸|海/, "sea,coast"],
  [/山|登山/, "mountain,japan"],
  [/自然|渓谷|滝/, "nature,landscape"],
];

/** スポットのジャンル別フォールバックタグ */
const GENRE_TAGS: Record<string, string> = {
  観光: "japan,landmark",
  ランチ: "japanesefood,restaurant",
  カフェ: "cafe",
  グルメ: "japanesefood",
  パン: "bakery",
  レジャー: "amusementpark,leisure",
  温泉: "onsen",
  自然: "nature,landscape",
  ショッピング: "shoppingmall",
};

/** 店舗内スポットのカテゴリ別フォールバックタグ */
const CATEGORY_TAGS: Record<string, string> = {
  グルメ: "japanesefood",
  観光: "japan,landmark",
  遊び: "amusementpark,leisure",
  ショッピング: "shoppingmall",
};

export function genreTags(genre: string): string {
  return GENRE_TAGS[genre] ?? "japan,travel";
}

export function categoryTags(category: string): string {
  return CATEGORY_TAGS[category] ?? "japan,travel";
}

/** テキスト（名称など）からキーワード一致タグを探す。無ければ fallback。 */
export function tagsFor(text: string, fallback = "japan,travel"): string {
  for (const [re, tag] of KEYWORDS) if (re.test(text)) return tag;
  return fallback;
}

/**
 * 内容に合った写真URLを返す主関数。
 * @param text     名称・タイトルなど（キーワード判定に使用）
 * @param fallback キーワード未一致時のタグ
 * @param seed     同じ写真に固定するためのシード
 */
export function imageFor(
  text: string,
  fallback: string,
  seed: string,
  w = 800,
  h = 600,
): string {
  return photoByTags(tagsFor(text, fallback), seed, w, h);
}
