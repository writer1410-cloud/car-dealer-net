import { Area } from "./types";
import { photoByTags, offlineImage, OFFLINE } from "./images";
import { TODAY, formatDate } from "./schedule";

/** レジャーイベントのカテゴリ */
export type EventCategory =
  | "祭り"
  | "花火"
  | "イルミネーション"
  | "アート"
  | "音楽・ステージ"
  | "スポーツ"
  | "体験・収穫"
  | "マルシェ・市";

export const EVENT_CATEGORIES: EventCategory[] = [
  "祭り",
  "花火",
  "イルミネーション",
  "アート",
  "音楽・ステージ",
  "スポーツ",
  "体験・収穫",
  "マルシェ・市",
];

export const EVENT_EMOJI: Record<EventCategory, string> = {
  祭り: "🏮",
  花火: "🎆",
  イルミネーション: "✨",
  アート: "🎨",
  "音楽・ステージ": "🎤",
  スポーツ: "🏟️",
  "体験・収穫": "🌾",
  "マルシェ・市": "🛒",
};

/** カテゴリ別のオフライン用テーマスラッグ（public/offline/<slug>.jpg を使う） */
const EVENT_THEME: Record<EventCategory, string> = {
  祭り: "event-festival",
  花火: "event-fireworks",
  イルミネーション: "event-illumination",
  アート: "event-art",
  "音楽・ステージ": "event-music",
  スポーツ: "event-sports",
  "体験・収穫": "event-harvest",
  "マルシェ・市": "event-market",
};

/** カテゴリ別の写真タグ（自動写真のフォールバック） */
const EVENT_CATEGORY_TAGS: Record<EventCategory, string> = {
  祭り: "japanesefestival,matsuri",
  花火: "fireworks,festival",
  イルミネーション: "illumination,lights",
  アート: "artexhibition,art",
  "音楽・ステージ": "concert,stage",
  スポーツ: "stadium,sport",
  "体験・収穫": "harvest,farm",
  "マルシェ・市": "market,food",
};

export interface HyogoEvent {
  id: string;
  name: string;
  category: EventCategory;
  area: Area;
  city: string;
  /** 会場 */
  venue: string;
  /** 開始日 YYYY-MM-DD */
  start: string;
  /** 終了日 YYYY-MM-DD（単日開催は start と同じ） */
  end: string;
  description: string;
  /** 料金の目安（例:「無料」「大人1,500円」） */
  fee: string;
  /** 最寄りの神戸マツダ店舗ID（任意） */
  relatedStoreId?: string;
  tags: string[];
  featured?: boolean;
  /** 個別指定の写真URL（あれば自動写真より優先） */
  photo?: string;
}

/**
 * 兵庫県内のレジャーイベント（デモ用の代表的な年間イベント）。
 * 日付はサイトの基準日（schedule.ts の TODAY）に合わせた 2026 年の想定。
 */
export const EVENTS: HyogoEvent[] = [
  // ───── 初夏（基準日まわり・開催中/もうすぐ） ─────
  {
    id: "rokko-hydrangea",
    name: "六甲山 あじさい散策",
    category: "体験・収穫",
    area: "神戸",
    city: "神戸市灘区",
    venue: "六甲高山植物園",
    start: "2026-06-13",
    end: "2026-07-12",
    description: "標高約865mの涼やかな山上で、約1万株のあじさいが見頃に。雨の日も美しい山あじさいの群落を散策。",
    fee: "大人900円・子ども450円",
    relatedStoreId: "nada",
    tags: ["あじさい", "自然", "避暑"],
    featured: true,
  },
  {
    id: "nesta-firefly",
    name: "ネスタリゾート ホタルの夕べ",
    category: "体験・収穫",
    area: "北播磨",
    city: "三木市",
    venue: "ネスタリゾート神戸",
    start: "2026-06-06",
    end: "2026-06-28",
    description: "大自然のリゾートで、夜空に舞うゲンジボタルの幻想的な光を観賞。温泉とあわせて初夏の夜を満喫。",
    fee: "入場料別途",
    relatedStoreId: "miki",
    tags: ["ホタル", "ナイト", "家族"],
    featured: true,
  },
  {
    id: "kobe-bird-marche",
    name: "メリケンパーク サンセットマルシェ",
    category: "マルシェ・市",
    area: "神戸",
    city: "神戸市中央区",
    venue: "メリケンパーク",
    start: "2026-06-20",
    end: "2026-06-21",
    description: "海辺の公園に地元の人気店が集合。クラフトフードと雑貨、夕暮れのライブで賑わうウォーターフロントの週末。",
    fee: "入場無料",
    relatedStoreId: "kobe-honten",
    tags: ["海辺", "グルメ", "クラフト"],
  },
  // ───── 夏 ─────
  {
    id: "kobe-kaijo-hanabi",
    name: "みなとこうべ海上花火大会",
    category: "花火",
    area: "神戸",
    city: "神戸市中央区",
    venue: "神戸港・新港突堤周辺",
    start: "2026-08-01",
    end: "2026-08-01",
    description: "神戸港の夜空と海面を彩る約1万発の花火。港町ならではのウォーターフロントの絶景とともに。",
    fee: "観覧無料（有料席あり）",
    relatedStoreId: "kobe-honten",
    tags: ["花火", "海", "夏の定番"],
    featured: true,
  },
  {
    id: "awaji-matsuri",
    name: "淡路島まつり 花火大会",
    category: "花火",
    area: "淡路",
    city: "洲本市",
    venue: "洲本市民広場・大浜海岸",
    start: "2026-08-08",
    end: "2026-08-09",
    description: "島最大の夏まつり。大浜海岸を舞台にした花火と、阿波おどりの熱気で島中が盛り上がります。",
    fee: "観覧無料",
    relatedStoreId: "sumoto",
    tags: ["花火", "阿波おどり", "海岸"],
    featured: true,
  },
  {
    id: "kinosaki-yukata",
    name: "城崎温泉 ゆかた祭り・夢花火",
    category: "祭り",
    area: "但馬",
    city: "豊岡市",
    venue: "城崎温泉街・大谿川沿い",
    start: "2026-08-01",
    end: "2026-08-31",
    description: "浴衣で外湯めぐりを楽しむ夏の城崎。柳並木のライトアップと、週末に上がる夢花火で温泉街が幻想的に。",
    fee: "外湯入浴料別途",
    relatedStoreId: "toyooka",
    tags: ["浴衣", "温泉街", "花火"],
  },
  {
    id: "himeji-minato-hanabi",
    name: "姫路みなと祭 海上花火大会",
    category: "花火",
    area: "西播磨",
    city: "姫路市",
    venue: "姫路港(飾磨)周辺",
    start: "2026-07-25",
    end: "2026-07-25",
    description: "姫路の港を彩る夏の風物詩。海上から打ち上がる迫力の花火を、潮風とともに間近で楽しめます。",
    fee: "観覧無料（有料席あり）",
    relatedStoreId: "himeji",
    tags: ["花火", "港", "夏祭り"],
  },
  {
    id: "himecen-night-safari",
    name: "姫路セントラルパーク ナイトサファリ",
    category: "体験・収穫",
    area: "西播磨",
    city: "姫路市",
    venue: "姫路セントラルパーク",
    start: "2026-07-18",
    end: "2026-08-31",
    description: "夜行性動物がいきいきと活動する夕暮れ以降のサファリ。昼とは違う野生の姿に出会える夏季限定イベント。",
    fee: "入園料別途",
    relatedStoreId: "himeji-higashi",
    tags: ["サファリ", "ナイト", "家族"],
  },
  {
    id: "akashi-bridge-world",
    name: "明石海峡大橋 ブリッジワールド",
    category: "体験・収穫",
    area: "神戸",
    city: "神戸市垂水区",
    venue: "明石海峡大橋(舞子)",
    start: "2026-06-01",
    end: "2026-11-30",
    description: "世界最大級の吊り橋の主塔(高さ約300m)へ上る特別ツアー。海上約47mの管理路を歩く非日常体験。",
    fee: "大人5,000円",
    relatedStoreId: "tarumi-tamon",
    tags: ["絶景", "ツアー", "橋"],
    featured: true,
  },
  // ───── 秋 ─────
  {
    id: "rokko-meets-art",
    name: "六甲ミーツ・アート 芸術散歩",
    category: "アート",
    area: "神戸",
    city: "神戸市灘区",
    venue: "六甲山上の各施設",
    start: "2026-09-12",
    end: "2026-11-23",
    description: "六甲山上をまるごと美術館に。自然のなかに点在する現代アート作品を、散策しながら巡る人気の芸術祭。",
    fee: "鑑賞パスポートあり",
    relatedStoreId: "nada",
    tags: ["現代アート", "山上", "散策"],
    featured: true,
  },
  {
    id: "tamba-aji-matsuri",
    name: "丹波篠山 味まつり",
    category: "マルシェ・市",
    area: "丹波",
    city: "丹波篠山市",
    venue: "篠山城跡 三の丸広場ほか",
    start: "2026-10-17",
    end: "2026-10-18",
    description: "黒豆・栗・松茸など実りの秋の特産品が城下町に大集合。丹波の食と城下町の風情を味わう収穫の祭典。",
    fee: "入場無料",
    relatedStoreId: "sanda",
    tags: ["黒豆", "城下町", "秋の味覚"],
  },
  {
    id: "nada-kenka",
    name: "灘のけんか祭り",
    category: "祭り",
    area: "西播磨",
    city: "姫路市",
    venue: "松原八幡神社",
    start: "2026-10-14",
    end: "2026-10-15",
    description: "三基の神輿を激しくぶつけ合う勇壮な秋祭り。豪華絢爛な屋台の練り合わせは播磨の秋を代表する迫力。",
    fee: "観覧無料（桟敷席あり）",
    relatedStoreId: "himeji",
    tags: ["伝統", "勇壮", "屋台"],
  },
  {
    id: "kobe-wine-festa",
    name: "神戸ワイナリー 収穫祭",
    category: "体験・収穫",
    area: "神戸",
    city: "神戸市西区",
    venue: "神戸ワイナリー(農業公園)",
    start: "2026-10-10",
    end: "2026-10-11",
    description: "ぶどう畑に囲まれて、できたてワインの試飲やぶどう収穫体験を。秋の里山でのんびり過ごす収穫の一日。",
    fee: "入園無料(体験は別途)",
    relatedStoreId: "okubo",
    tags: ["ワイン", "収穫体験", "里山"],
  },
  // ───── 冬 ─────
  {
    id: "kobe-luminarie",
    name: "神戸ルミナリエ",
    category: "イルミネーション",
    area: "神戸",
    city: "神戸市中央区",
    venue: "旧居留地・東遊園地",
    start: "2026-12-04",
    end: "2026-12-13",
    description: "震災の記憶を伝え、街に希望の灯をともす光の祭典。荘厳な光の回廊が冬の神戸を幻想的に包みます。",
    fee: "観覧無料(募金あり)",
    relatedStoreId: "kobe-honten",
    tags: ["光の回廊", "冬の風物詩", "夜"],
    featured: true,
  },
  {
    id: "nesta-illumina",
    name: "ネスタイルミナ",
    category: "イルミネーション",
    area: "北播磨",
    city: "三木市",
    venue: "ネスタリゾート神戸",
    start: "2026-11-14",
    end: "2027-02-28",
    description: "大自然を舞台にした体感型イルミネーション。光と音、炎の演出が織りなすナイトショーは圧巻のスケール。",
    fee: "入場料別途",
    relatedStoreId: "miki",
    tags: ["イルミネーション", "ナイト", "家族"],
  },
  {
    id: "nishinomiya-ebisu",
    name: "西宮神社 十日えびす",
    category: "祭り",
    area: "阪神",
    city: "西宮市",
    venue: "西宮神社",
    start: "2027-01-09",
    end: "2027-01-11",
    description: "全国のえびす神社の総本社で行われる商売繁盛の大祭。本殿一番乗りを競う「開門神事 福男選び」で有名。",
    fee: "参拝無料",
    relatedStoreId: "nishinomiya",
    tags: ["初詣", "福男", "縁起"],
  },
  {
    id: "takarazuka-revue",
    name: "宝塚歌劇 花組公演",
    category: "音楽・ステージ",
    area: "阪神",
    city: "宝塚市",
    venue: "宝塚大劇場",
    start: "2026-07-17",
    end: "2026-08-24",
    description: "夢と憧れの舞台、宝塚歌劇。華やかなレビューと本格的なミュージカルで、非日常のひとときを。",
    fee: "S席等あり",
    relatedStoreId: "takarazuka",
    tags: ["歌劇", "華やか", "ステージ"],
  },
];

export const EVENT_MAP: Record<string, HyogoEvent> = Object.fromEntries(
  EVENTS.map((e) => [e.id, e]),
);

export function eventPhoto(e: HyogoEvent, w = 800, h = 600): string {
  if (e.photo && e.photo.trim()) return e.photo;
  // オフラインでは実写真(public/offline)があればそれを、無ければカテゴリ絵文字の画像を返す
  if (OFFLINE) {
    return offlineImage(
      EVENT_CATEGORY_TAGS[e.category],
      "hevent-" + e.id,
      w,
      h,
      EVENT_EMOJI[e.category],
      EVENT_THEME[e.category],
    );
  }
  return photoByTags(EVENT_CATEGORY_TAGS[e.category], "hevent-" + e.id, w, h);
}

/** 開催状況 */
export type EventStatus = "開催中" | "まもなく" | "予定" | "終了";

/** 基準日（TODAY）に対する開催状況を返す */
export function eventStatus(e: HyogoEvent, today: string = TODAY): EventStatus {
  if (today > e.end) return "終了";
  if (today >= e.start) return "開催中";
  // 開始まで14日以内なら「まもなく」
  const days = daysBetween(today, e.start);
  return days <= 14 ? "まもなく" : "予定";
}

/** 2つの YYYY-MM-DD の差（日数, a→b） */
function daysBetween(a: string, b: string): number {
  const da = new Date(a + "T00:00:00").getTime();
  const db = new Date(b + "T00:00:00").getTime();
  return Math.round((db - da) / 86400000);
}

/**
 * 開催予定・開催中のイベントを開始日順で返す（終了済みは末尾）。
 */
export function sortedEvents(today: string = TODAY): HyogoEvent[] {
  const live = EVENTS.filter((e) => eventStatus(e, today) !== "終了");
  const ended = EVENTS.filter((e) => eventStatus(e, today) === "終了");
  const byStart = (a: HyogoEvent, b: HyogoEvent) =>
    a.start < b.start ? -1 : a.start > b.start ? 1 : 0;
  return [...live.sort(byStart), ...ended.sort(byStart)];
}

/** トップ用：近日開催（開催中・まもなく・予定）の注目イベント */
export function upcomingEvents(count = 4, today: string = TODAY): HyogoEvent[] {
  const live = sortedEvents(today).filter(
    (e) => eventStatus(e, today) !== "終了",
  );
  const featured = live.filter((e) => e.featured);
  const rest = live.filter((e) => !e.featured);
  return [...featured, ...rest].slice(0, count);
}

/** 開催期間の表示用文字列（単日 or 期間） */
export function formatEventDate(e: HyogoEvent): string {
  if (e.start === e.end) return formatDate(e.start);
  return `${formatDate(e.start)}〜${formatDate(e.end)}`;
}
