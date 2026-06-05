import { Store, ServiceMeta, ServiceType } from "./types";

/**
 * 神戸マツダ 兵庫県内 店舗マスタ（デモ用データ）。
 * 緯度経度はエリア間の距離計算に使用します。
 */
export const STORES: Store[] = [
  {
    id: "kobe-honten",
    name: "神戸本店",
    area: "神戸",
    city: "神戸市中央区",
    address: "神戸市中央区港島中町6-3-2",
    lat: 34.6678,
    lng: 135.2089,
    bays: 6,
    tel: "078-000-0001",
    catch: "海と異国情緒の街。点検待ちの時間も神戸観光に。",
    spots: [
      {
        name: "南京町（神戸中華街）",
        category: "グルメ",
        emoji: "🥟",
        description: "食べ歩きの聖地。豚まん・小籠包・フカヒレまんで賑わう中華街。",
        access: "車で約10分",
      },
      {
        name: "メリケンパーク／神戸ポートタワー",
        category: "観光",
        emoji: "🗼",
        description: "海辺の絶景スポット。リニューアルしたポートタワーは必見。",
        access: "車で約8分",
      },
      {
        name: "北野異人館街",
        category: "観光",
        emoji: "🏛️",
        description: "坂の上のレトロな洋館めぐり。写真映え抜群の人気エリア。",
        access: "車で約15分",
      },
      {
        name: "神戸ハーバーランド umie",
        category: "ショッピング",
        emoji: "🛍️",
        description: "海沿いの大型モール。観覧車とアンパンマンミュージアムも。",
        access: "車で約9分",
      },
    ],
  },
  {
    id: "nishinomiya",
    name: "西宮店",
    area: "阪神",
    city: "西宮市",
    address: "西宮市鳴尾浜3-1-10",
    lat: 34.7062,
    lng: 135.3506,
    bays: 5,
    tel: "0798-000-0002",
    catch: "野球とお酒とガーデンズ。家族で楽しめる阪神間。",
    spots: [
      {
        name: "阪神甲子園球場",
        category: "遊び",
        emoji: "⚾",
        description: "言わずと知れた野球の聖地。甲子園歴史館の見学も楽しい。",
        access: "車で約12分",
      },
      {
        name: "阪急西宮ガーデンズ",
        category: "ショッピング",
        emoji: "🛍️",
        description: "阪神間最大級のモール。シネマ・屋上庭園・グルメが充実。",
        access: "車で約15分",
      },
      {
        name: "白鹿記念酒造博物館（灘の酒蔵）",
        category: "観光",
        emoji: "🍶",
        description: "日本一の酒どころ「灘五郷」。試飲と酒蔵見学が人気。",
        access: "車で約10分",
      },
      {
        name: "西宮神社（えびす宮総本社）",
        category: "観光",
        emoji: "⛩️",
        description: "福の神えびす様の総本社。十日えびすの福男選びで有名。",
        access: "車で約14分",
      },
    ],
  },
  {
    id: "amagasaki",
    name: "尼崎店",
    area: "阪神",
    city: "尼崎市",
    address: "尼崎市道意町7-1-1",
    lat: 34.7158,
    lng: 135.4144,
    bays: 4,
    tel: "06-000-0003",
    catch: "下町グルメと尼崎城。レジャー施設も近い活気の街。",
    spots: [
      {
        name: "尼崎城",
        category: "観光",
        emoji: "🏯",
        description: "2019年に再建された天守。最上階から尼崎の街並みを一望。",
        access: "車で約12分",
      },
      {
        name: "あまがさき阪神／キューズモール",
        category: "ショッピング",
        emoji: "🛍️",
        description: "駅直結の大型商業施設。食料品からファッションまで何でも。",
        access: "車で約13分",
      },
      {
        name: "尼崎市立スポーツの森",
        category: "遊び",
        emoji: "🏊",
        description: "プール・スケートリンク・アスレチック。一日中遊べる複合施設。",
        access: "車で約8分",
      },
    ],
  },
  {
    id: "akashi",
    name: "明石店",
    area: "東播磨",
    city: "明石市",
    address: "明石市大久保町ゆりのき通3-3",
    lat: 34.6498,
    lng: 134.9396,
    bays: 4,
    tel: "078-000-0004",
    catch: "明石焼きと海峡大橋。子午線のまちでのんびり。",
    spots: [
      {
        name: "魚の棚商店街",
        category: "グルメ",
        emoji: "🐙",
        description: "新鮮な明石ダコや昼網の魚介。本場の明石焼き(玉子焼)を味わって。",
        access: "車で約15分",
      },
      {
        name: "明石公園",
        category: "観光",
        emoji: "🌸",
        description: "明石城跡を中心とした広大な公園。ボートや桜の名所としても人気。",
        access: "車で約13分",
      },
      {
        name: "明石海峡大橋／舞子公園",
        category: "観光",
        emoji: "🌉",
        description: "世界最大級の吊り橋を真下から。海上47mの回遊路はスリル満点。",
        access: "車で約20分",
      },
      {
        name: "明石市立天文科学館",
        category: "遊び",
        emoji: "🔭",
        description: "日本標準時子午線の上に建つプラネタリウム。家族連れに大人気。",
        access: "車で約14分",
      },
    ],
  },
  {
    id: "kakogawa",
    name: "加古川店",
    area: "東播磨",
    city: "加古川市",
    address: "加古川市野口町良野1718",
    lat: 34.7574,
    lng: 134.8417,
    bays: 3,
    tel: "079-000-0005",
    catch: "名物かつめしと国宝鶴林寺。落ち着いた播磨の中核。",
    spots: [
      {
        name: "かつめし（加古川名物）",
        category: "グルメ",
        emoji: "🍱",
        description: "ご飯の上にビフカツとデミグラス。市内200店超で味わえるソウルフード。",
        access: "市内各所",
      },
      {
        name: "鶴林寺",
        category: "観光",
        emoji: "🛕",
        description: "「播磨の法隆寺」と呼ばれる古刹。国宝の本堂と太子堂は必見。",
        access: "車で約10分",
      },
      {
        name: "日岡山公園",
        category: "遊び",
        emoji: "🌳",
        description: "桜の名所でアスレチックも充実。展望台から加古川を一望できる。",
        access: "車で約12分",
      },
    ],
  },
  {
    id: "himeji",
    name: "姫路店",
    area: "西播磨",
    city: "姫路市",
    address: "姫路市飾磨区中島3107",
    lat: 34.7905,
    lng: 134.6739,
    bays: 5,
    tel: "079-000-0006",
    catch: "世界遺産・姫路城のおひざ元。観光もグルメも盛りだくさん。",
    spots: [
      {
        name: "世界遺産 姫路城",
        category: "観光",
        emoji: "🏯",
        description: "白鷺城の愛称で知られる現存天守。点検のついでに国宝見学を。",
        access: "車で約20分",
      },
      {
        name: "姫路セントラルパーク",
        category: "遊び",
        emoji: "🦁",
        description: "サファリと遊園地、夏はプールも。一日たっぷり遊べるレジャー施設。",
        access: "車で約25分",
      },
      {
        name: "姫路おでん／あなご料理",
        category: "グルメ",
        emoji: "🍢",
        description: "生姜醤油で食べる姫路おでんと、瀬戸内のあなご。地元の味を堪能。",
        access: "市内各所",
      },
      {
        name: "書写山圓教寺（ロープウェイ）",
        category: "観光",
        emoji: "🚡",
        description: "映画ロケ地にもなった山上の大伽藍。ロープウェイで空中散歩。",
        access: "車で約30分",
      },
    ],
  },
];

export const STORE_MAP: Record<string, Store> = Object.fromEntries(
  STORES.map((s) => [s.id, s]),
);

export function getStore(id: string): Store | undefined {
  return STORE_MAP[id];
}

/** サービス種別のメタ情報 */
export const SERVICES: Record<ServiceType, ServiceMeta> = {
  車検: {
    type: "車検",
    durationMin: 120,
    staffNeeded: 2,
    label: "車検（指定整備）",
    emoji: "🔧",
  },
  "12ヶ月点検": {
    type: "12ヶ月点検",
    durationMin: 90,
    staffNeeded: 1,
    label: "12ヶ月法定点検",
    emoji: "🛠️",
  },
  "6ヶ月点検": {
    type: "6ヶ月点検",
    durationMin: 60,
    staffNeeded: 1,
    label: "6ヶ月点検",
    emoji: "🔩",
  },
  オイル交換: {
    type: "オイル交換",
    durationMin: 30,
    staffNeeded: 1,
    label: "オイル交換",
    emoji: "🛢️",
  },
  タイヤ交換: {
    type: "タイヤ交換",
    durationMin: 45,
    staffNeeded: 1,
    label: "タイヤ交換",
    emoji: "🛞",
  },
};

export const SERVICE_LIST = Object.values(SERVICES);

/** 2点間のおおよその距離(km)。Haversineの簡易版。 */
export function distanceKm(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(h)) * 10) / 10;
}
