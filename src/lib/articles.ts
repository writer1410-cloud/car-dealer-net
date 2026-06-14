import { Area } from "./types";
import { pic } from "./stores";

/** 兵庫おでかけ記事のカテゴリ */
export type ArticleCategory = "観光" | "グルメ" | "パン" | "カフェ" | "体験" | "イベント";

export interface ArticleSection {
  heading: string;
  body: string;
}

export interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  area: Area;
  /** 一覧用の短い紹介文 */
  excerpt: string;
  /** 本文（見出し＋本文のブロック） */
  sections: ArticleSection[];
  /** 公開日 YYYY-MM-DD */
  date: string;
  tags: string[];
  /** 関連店舗ID（あれば「近くの店舗で点検」導線に使用） */
  relatedStoreId?: string;
  /** おすすめ度（PICK UP表示などに使用） */
  featured?: boolean;
  /** メイン画像URL（管理画面で差し替え可。未設定なら自動画像） */
  photo?: string;
}

const photo = (id: string, w = 1200, h = 800) => pic("article-" + id, w, h);

export const ARTICLES: Article[] = [
  {
    id: "himeji-castle-walk",
    title: "世界遺産・姫路城を遊びつくす半日さんぽ",
    category: "観光",
    area: "西播磨",
    excerpt:
      "白鷺城の愛称で親しまれる国宝・姫路城。天守からの眺め、好古園の庭園、城下のグルメまで、点検待ちの半日で満喫できるモデルコースをご紹介。",
    date: "2026-06-10",
    tags: ["姫路城", "世界遺産", "半日コース", "家族"],
    relatedStoreId: "himeji",
    featured: true,
    sections: [
      {
        heading: "まずは大手門から天守へ",
        body: "大手門をくぐると、青空に映える真っ白な天守が出迎えてくれます。急な階段を登った最上階からは、姫路の街並みと播磨灘までを一望。朝いちばんは人も少なく、写真撮影にも最適です。",
      },
      {
        heading: "好古園で和の庭園さんぽ",
        body: "姫路城のすぐ隣にある日本庭園「好古園」。9つの趣の異なる庭が連なり、池には錦鯉が泳ぎます。園内のお茶室で抹茶と和菓子をいただけば、ちょっと贅沢なひと休み。",
      },
      {
        heading: "城下町グルメも忘れずに",
        body: "城下では生姜醤油でいただく「姫路おでん」や、瀬戸内のあなご料理が名物。食べ歩きにはアーモンドトーストの文化も。点検が終わるころには、おなかも心も大満足です。",
      },
    ],
  },
  {
    id: "kinosaki-onsen-day",
    title: "城崎温泉で外湯めぐり。浴衣で歩く但馬の名湯",
    category: "観光",
    area: "但馬",
    excerpt:
      "柳並木と川沿いの風情が美しい城崎温泉。7つの外湯を浴衣でめぐる、レトロかわいい温泉街の楽しみ方をまとめました。",
    date: "2026-06-08",
    tags: ["城崎温泉", "外湯めぐり", "浴衣", "但馬"],
    relatedStoreId: "toyooka",
    featured: true,
    sections: [
      {
        heading: "浴衣に着替えて、いざ外湯へ",
        body: "城崎では「駅は玄関、道は廊下、宿は客室、外湯はお風呂」と言われます。浴衣と下駄でからんころんと歩けば、それだけで気分は旅人。7つの外湯はそれぞれ趣が異なります。",
      },
      {
        heading: "食べ歩きと但馬牛グルメ",
        body: "温泉たまごや但馬牛コロッケの食べ歩きはもちろん、ランチには但馬牛の鉄板焼きやステーキを。冬場は松葉ガニも登場し、一年を通して食の楽しみが尽きません。",
      },
    ],
  },
  {
    id: "akashi-tako-gourmet",
    title: "明石の台所「魚の棚」で本場の明石焼きを",
    category: "グルメ",
    area: "東播磨",
    excerpt:
      "活気あふれる魚の棚商店街（うおんたな）。新鮮な明石ダコと、出汁にひたしていただく本場の明石焼き（玉子焼）の魅力をレポート。",
    date: "2026-06-05",
    tags: ["明石焼き", "魚の棚", "タコ", "食べ歩き"],
    relatedStoreId: "okubo",
    featured: false,
    sections: [
      {
        heading: "昼網の魚介がずらり",
        body: "明石海峡の速い潮で身の締まった「明石ダコ」や鯛など、昼網であがった魚介が並ぶ商店街。お店の人との会話も楽しく、見て歩くだけでわくわくします。",
      },
      {
        heading: "ふわとろ明石焼きの食べ比べ",
        body: "玉子をたっぷり使ったふわとろの生地に、プリッとしたタコ。だし汁にひたしていただくのが明石流です。お店ごとに生地やだしが違うので、食べ比べもおすすめ。",
      },
    ],
  },
  {
    id: "kobe-bakery-pick",
    title: "パンのまち神戸。今行きたい話題のベーカリー",
    category: "パン",
    area: "神戸",
    excerpt:
      "人口あたりのパン消費量トップクラスの神戸。老舗から新進気鋭まで、いま注目のベーカリーを編集部がピックアップしました。",
    date: "2026-06-12",
    tags: ["パン屋", "神戸", "食パン", "クロワッサン"],
    relatedStoreId: "kobe-honten",
    featured: true,
    sections: [
      {
        heading: "朝いちばんの焼きたてを狙う",
        body: "神戸は港町として早くからパン文化が根づいたまち。名物の山型食パンは、外はパリッと中はもっちり。朝いちばんの焼きたてに出会えたら、その日はきっといい一日になります。",
      },
      {
        heading: "ハード系もスイーツ系も充実",
        body: "バター香るクロワッサンやデニッシュ、ライ麦のハード系、季節のフルーツを使った菓子パンまで品ぞろえはさまざま。イートインで淹れたてコーヒーと合わせるのも至福です。",
      },
      {
        heading: "電動自転車でベーカリーめぐり",
        body: "坂の多い神戸の街も、店舗で貸し出す電動アシスト自転車「ぐるっとバイク」ならスイスイ。点検を待つあいだに、お気に入りの一軒を探す“パン屋さんめぐり”はいかがでしょう。",
      },
    ],
  },
  {
    id: "awaji-island-trip",
    title: "淡路島でうずしおと絶景グルメ。島まるごと一日旅",
    category: "観光",
    area: "淡路",
    excerpt:
      "うずしお、玉ねぎグルメ、海沿いのおしゃれカフェ。本州から橋でつながる淡路島の、欲ばり日帰りプランをご提案します。",
    date: "2026-06-03",
    tags: ["淡路島", "うずしお", "玉ねぎ", "ドライブ"],
    relatedStoreId: "sumoto",
    featured: false,
    sections: [
      {
        heading: "迫力のうずしおを間近で",
        body: "鳴門海峡に渦巻く世界最大級のうずしお。観潮船に乗れば、轟音とともに渦が生まれる瞬間を間近で体感できます。潮の時間を事前にチェックして出かけましょう。",
      },
      {
        heading: "島グルメと海カフェ",
        body: "甘くてとろける淡路島玉ねぎを使った料理や、新鮮なしらす丼は外せません。海を見渡すテラスカフェでのんびり過ごせば、島時間にすっかり癒やされます。",
      },
    ],
  },
  {
    id: "rokko-arima-nature",
    title: "六甲山と有馬温泉。神戸の山あそびと名湯めぐり",
    category: "体験",
    area: "神戸",
    excerpt:
      "ロープウェーで結ばれた六甲山と有馬温泉。アスレチックや牧場で遊び、金泉・銀泉で疲れを癒やす、山あそびの一日プラン。",
    date: "2026-05-30",
    tags: ["六甲山", "有馬温泉", "アウトドア", "牧場"],
    relatedStoreId: "hokushin",
    featured: false,
    sections: [
      {
        heading: "六甲山でアクティブに",
        body: "六甲山上には牧場やアスレチック、音楽の森など見どころがいっぱい。羊やヤギとふれあったり、空中アスレチックに挑戦したり、子どもから大人まで一日中楽しめます。",
      },
      {
        heading: "有馬温泉でほっとひと息",
        body: "日本三古湯のひとつ、有馬温泉へは六甲有馬ロープウェーでひとっ飛び。鉄分豊富な「金泉」と無色透明の「銀泉」、二つの名湯で身も心もリフレッシュ。",
      },
    ],
  },
  {
    id: "takarazuka-culture",
    title: "宝塚で華やかカルチャー散歩。歌劇とマンガの聖地",
    category: "観光",
    area: "阪神",
    excerpt:
      "夢と憧れの宝塚大劇場、そして手塚治虫記念館。華やかでどこか懐かしい、宝塚のカルチャースポットをめぐります。",
    date: "2026-05-28",
    tags: ["宝塚", "歌劇", "手塚治虫", "カルチャー"],
    relatedStoreId: "takarazuka",
    featured: false,
    sections: [
      {
        heading: "花のみち〜大劇場へ",
        body: "阪急宝塚駅から大劇場へと続く「花のみち」は、四季折々の花が彩る並木道。観劇の予定がなくても、街全体に漂う華やかな空気を味わえます。",
      },
      {
        heading: "手塚治虫記念館でマンガの世界へ",
        body: "鉄腕アトムや火の鳥でおなじみ、宝塚で少年時代を過ごした手塚治虫のミュージアム。原画やアニメ制作体験など、世代を問わず楽しめる展示が魅力です。",
      },
    ],
  },
  {
    id: "harima-bakery-cafe",
    title: "播磨の小さなパン屋＆古民家カフェめぐり",
    category: "カフェ",
    area: "西播磨",
    excerpt:
      "龍野の城下町や太子の里に点在する、こだわりのベーカリーと古民家カフェ。のんびりドライブで訪ねたい名店をご紹介。",
    date: "2026-06-11",
    tags: ["パン屋", "古民家カフェ", "龍野", "太子"],
    relatedStoreId: "taishi",
    featured: false,
    sections: [
      {
        heading: "醤油のまち・龍野のベーカリー",
        body: "淡口醤油発祥の地・龍野には、地元の食材や醤油を生地に使ったユニークなパンを焼く小さなお店が点在。城下町の風情ある街並みと一緒に楽しめます。",
      },
      {
        heading: "古民家をリノベしたカフェで休憩",
        body: "築100年を超える町家を改装したカフェでは、自家焙煎コーヒーと手づくりスイーツが評判。時間がゆっくり流れる空間で、旅の疲れをそっと癒やせます。",
      },
    ],
  },
];

export const ARTICLE_MAP: Record<string, Article> = Object.fromEntries(
  ARTICLES.map((a) => [a.id, a]),
);

export function getArticle(id: string): Article | undefined {
  return ARTICLE_MAP[id];
}

/** 記事のメイン写真URL */
export function articlePhoto(a: Article, w = 1200, h = 800): string {
  return a.photo && a.photo.trim() ? a.photo : photo(a.id, w, h);
}

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  "観光",
  "グルメ",
  "パン",
  "カフェ",
  "体験",
  "イベント",
];

export const CATEGORY_EMOJI: Record<ArticleCategory, string> = {
  観光: "📸",
  グルメ: "🍴",
  パン: "🥐",
  カフェ: "☕",
  体験: "🎒",
  イベント: "🎪",
};
