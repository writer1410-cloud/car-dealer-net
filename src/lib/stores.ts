import { Store, Coupon, ServiceMeta, ServiceType } from "./types";

/* ─── Unsplash 写真 URL ─────────────────────────────────
 * ブラウザ・Vercel 経由では正常に表示されます。
 * next/image の remotePatterns に images.unsplash.com を設定済み。
 * ─────────────────────────────────────────────────────── */
const U = (id: string, w = 1200, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&q=80&auto=format&fit=crop`;

/** テーマ別の代表写真（兵庫の海・山・港・城をイメージ） */
const PHOTO = {
  seaA: U("1545569341-9eb8b30979d9"),
  seaB: U("1558980394-35d349b8dbce"),
  harborA: U("1516738901171-8eb4fc13bd20"),
  harborB: U("1503899036-c27b63e5fd26"),
  mountainA: U("1540220695491-c79def14c7f9"),
  mountainB: U("1476514525535-07fb3b4ae5f1"),
  mountainC: U("1506905925346-21bda4d32df4"),
  castle: U("1580019542155-247062e19ce4"),
};

const cp = (
  spot: string,
  emoji: string,
  benefit: string,
  partner: Coupon["partner"],
): Coupon => ({ spot, emoji, benefit, partner });

/**
 * 神戸マツダ 兵庫県内 店舗マスタ（デモ用データ／全20店舗）。
 * 緯度経度はエリア間・店舗間の距離計算に使用します。
 */
export const STORES: Store[] = [
  // ───────── 神戸エリア ─────────
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
    theme: "sea",
    photo: PHOTO.seaA,
    ebikes: 8,
    coupons: [
      cp("南京町（提携店舗）", "🥟", "人気店の豚まん1個プレゼント", "提携店舗"),
      cp("神戸ポートタワー", "🗼", "展望フロア入場 10%OFF", "自治体"),
      cp("umie モザイク大観覧車", "🎡", "ペア搭乗 200円引き", "提携店舗"),
    ],
    spots: [
      { name: "南京町（神戸中華街）", category: "グルメ", emoji: "🥟", description: "食べ歩きの聖地。豚まん・小籠包で賑わう中華街。", access: "車で約10分" },
      { name: "メリケンパーク／神戸ポートタワー", category: "観光", emoji: "🗼", description: "海辺の絶景スポット。リニューアルしたタワーは必見。", access: "車で約8分" },
      { name: "北野異人館街", category: "観光", emoji: "🏛️", description: "坂の上のレトロな洋館めぐり。写真映え抜群。", access: "車で約15分" },
      { name: "神戸ハーバーランド umie", category: "ショッピング", emoji: "🛍️", description: "海沿いの大型モール。観覧車も。", access: "車で約9分" },
    ],
  },
  {
    id: "kobe-nishi",
    name: "神戸西インター店",
    area: "神戸",
    city: "神戸市西区",
    address: "神戸市西区池上3-1-1",
    lat: 34.706,
    lng: 135.052,
    bays: 4,
    tel: "078-000-0002",
    catch: "田園とワイナリー。郊外でゆったり過ごす神戸西。",
    theme: "mountain",
    photo: PHOTO.mountainA,
    ebikes: 5,
    coupons: [
      cp("神戸ワイナリー（農業公園）", "🍇", "グラスワイン1杯サービス", "提携店舗"),
      cp("太山寺", "🛕", "本堂 拝観料 割引", "自治体"),
      cp("西神中央 飲食店", "☕", "ドリンク1杯無料", "商工会議所"),
    ],
    spots: [
      { name: "神戸ワイナリー（農業公園）", category: "遊び", emoji: "🍇", description: "ぶどう畑が広がる体験型ワイナリー。試飲も。", access: "車で約10分" },
      { name: "太山寺", category: "観光", emoji: "🛕", description: "国宝の本堂を持つ古刹。新緑と紅葉が美しい。", access: "車で約15分" },
      { name: "西神中央（そごう西神店）", category: "ショッピング", emoji: "🛍️", description: "駅前の大型商業施設。買い物も食事も充実。", access: "車で約12分" },
    ],
  },
  {
    id: "nada",
    name: "灘店",
    area: "神戸",
    city: "神戸市灘区",
    address: "神戸市灘区摩耶海岸通2-1-1",
    lat: 34.711,
    lng: 135.227,
    bays: 4,
    tel: "078-000-0003",
    catch: "酒蔵と動物園、山上の夜景。多彩な灘の一日。",
    theme: "harbor",
    photo: PHOTO.harborA,
    ebikes: 5,
    coupons: [
      cp("灘五郷 酒蔵", "🍶", "利き酒 試飲1杯サービス", "商工会議所"),
      cp("王子動物園", "🐼", "入園料 100円引き", "自治体"),
      cp("六甲ケーブル", "🚡", "往復券 割引", "提携店舗"),
    ],
    spots: [
      { name: "灘五郷 酒蔵めぐり", category: "観光", emoji: "🍶", description: "日本一の酒どころ。資料館と試飲で酒文化を満喫。", access: "車で約10分" },
      { name: "王子動物園", category: "遊び", emoji: "🐼", description: "パンダとコアラに会える街なかの動物園。", access: "車で約12分" },
      { name: "六甲山 掬星台（夜景）", category: "観光", emoji: "🌃", description: "日本三大夜景のひとつ。1000万ドルの眺め。", access: "車で約30分" },
    ],
  },
  {
    id: "tarumi-tamon",
    name: "垂水多聞店",
    area: "神戸",
    city: "神戸市垂水区",
    address: "神戸市垂水区多聞台2-1-1",
    lat: 34.638,
    lng: 135.057,
    bays: 4,
    tel: "078-000-0004",
    catch: "明石海峡大橋を望む海辺。アウトレットも目の前。",
    theme: "sea",
    photo: PHOTO.seaB,
    ebikes: 5,
    coupons: [
      cp("三井アウトレットパーク マリンピア神戸", "🛍️", "対象店で使える 500円券", "提携店舗"),
      cp("橋の科学館", "🌉", "入館料 割引", "自治体"),
      cp("海沿いカフェ", "☕", "ドリンク1杯無料", "商工会議所"),
    ],
    spots: [
      { name: "三井アウトレットパーク マリンピア神戸", category: "ショッピング", emoji: "🛍️", description: "海辺の開放的なアウトレット。潮風と買い物を。", access: "車で約10分" },
      { name: "舞子公園／明石海峡大橋", category: "観光", emoji: "🌉", description: "世界最大級の吊り橋を真下から。海上散歩も。", access: "車で約8分" },
      { name: "五色塚古墳", category: "観光", emoji: "⛩️", description: "復元された県内最大の前方後円墳。海の眺めも◎。", access: "車で約9分" },
    ],
  },
  {
    id: "hokushin",
    name: "北神店",
    area: "神戸",
    city: "神戸市北区",
    address: "神戸市北区藤原台中町1-2-1",
    lat: 34.778,
    lng: 135.213,
    bays: 4,
    tel: "078-000-0005",
    catch: "有馬温泉と六甲の自然。点検待ちに名湯はいかが。",
    theme: "mountain",
    photo: PHOTO.mountainB,
    ebikes: 6,
    coupons: [
      cp("有馬温泉 金の湯", "♨️", "入浴料 割引", "自治体"),
      cp("六甲山牧場", "🐑", "入場料 100円引き", "提携店舗"),
      cp("神戸フルーツ・フラワーパーク", "🍦", "ソフトクリーム 50円引き", "提携店舗"),
    ],
    spots: [
      { name: "有馬温泉", category: "観光", emoji: "♨️", description: "日本三古湯のひとつ。金泉・銀泉の名湯めぐり。", access: "車で約20分" },
      { name: "六甲山牧場", category: "遊び", emoji: "🐑", description: "羊やヤギとふれあえる高原牧場。チーズも人気。", access: "車で約25分" },
      { name: "神戸フルーツ・フラワーパーク", category: "遊び", emoji: "🌷", description: "花と果物のテーマパーク。収穫体験も楽しい。", access: "車で約10分" },
    ],
  },
  // ───────── 阪神エリア ─────────
  {
    id: "sanda",
    name: "三田店",
    area: "阪神",
    city: "三田市",
    address: "三田市けやき台1-1-1",
    lat: 34.886,
    lng: 135.226,
    bays: 5,
    tel: "079-000-0006",
    catch: "アウトレットと自然博物館。三田牛も味わって。",
    theme: "mountain",
    photo: PHOTO.mountainC,
    ebikes: 6,
    coupons: [
      cp("神戸三田プレミアム・アウトレット", "🛍️", "ショップで使える 500円券", "提携店舗"),
      cp("県立人と自然の博物館", "🦕", "観覧料 割引", "自治体"),
      cp("三田牛 提携店", "🥩", "一品サービス", "商工会議所"),
    ],
    spots: [
      { name: "神戸三田プレミアム・アウトレット", category: "ショッピング", emoji: "🛍️", description: "西日本最大級のアウトレット。一日中楽しめる。", access: "車で約12分" },
      { name: "県立人と自然の博物館", category: "観光", emoji: "🦕", description: "恐竜化石も展示。子どもと学べる人気スポット。", access: "車で約10分" },
      { name: "有馬富士公園", category: "遊び", emoji: "🏞️", description: "里山に広がる県立公園。あそびの王国が大人気。", access: "車で約8分" },
    ],
  },
  {
    id: "amagasaki",
    name: "尼崎店",
    area: "阪神",
    city: "尼崎市",
    address: "尼崎市道意町7-1-1",
    lat: 34.733,
    lng: 135.406,
    bays: 5,
    tel: "06-000-0007",
    catch: "下町グルメと尼崎城。レジャー施設も近い活気の街。",
    theme: "harbor",
    photo: PHOTO.harborB,
    ebikes: 6,
    coupons: [
      cp("尼崎城", "🏯", "天守入場料 半額", "自治体"),
      cp("あまがさきキューズモール", "🛍️", "フードコート ドリンク1杯無料", "提携店舗"),
      cp("尼崎スポーツの森", "🏊", "プール利用 100円引き", "商工会議所"),
    ],
    spots: [
      { name: "尼崎城", category: "観光", emoji: "🏯", description: "再建された天守。最上階から街並みを一望。", access: "車で約12分" },
      { name: "あまがさきキューズモール", category: "ショッピング", emoji: "🛍️", description: "駅直結の大型施設。何でもそろう便利さ。", access: "車で約13分" },
      { name: "尼崎スポーツの森", category: "遊び", emoji: "🏊", description: "プール・リンク・アスレチックの複合施設。", access: "車で約8分" },
    ],
  },
  {
    id: "itami",
    name: "伊丹店",
    area: "阪神",
    city: "伊丹市",
    address: "伊丹市藤ノ木1-1-1",
    lat: 34.784,
    lng: 135.401,
    bays: 4,
    tel: "072-000-0008",
    catch: "飛行機と清酒発祥の地。離発着を眺めて一杯。",
    theme: "harbor",
    photo: PHOTO.harborA,
    ebikes: 5,
    coupons: [
      cp("白雪ブルワリービレッジ長寿蔵", "🍶", "試飲 1杯サービス", "商工会議所"),
      cp("伊丹スカイパーク 売店", "✈️", "ドリンク1杯無料", "提携店舗"),
      cp("伊丹市立美術館", "🖼️", "観覧料 割引", "自治体"),
    ],
    spots: [
      { name: "伊丹スカイパーク", category: "遊び", emoji: "✈️", description: "滑走路の真横で離発着を間近に。迫力満点。", access: "車で約10分" },
      { name: "清酒発祥の地 白雪 酒蔵", category: "観光", emoji: "🍶", description: "酒造の歴史と地ビール・地酒を味わえる。", access: "車で約8分" },
      { name: "昆陽池公園", category: "観光", emoji: "🦆", description: "渡り鳥が集う水辺の公園。日本列島の島も。", access: "車で約9分" },
    ],
  },
  {
    id: "kawanishi",
    name: "川西店",
    area: "阪神",
    city: "川西市",
    address: "川西市火打1-1-1",
    lat: 34.83,
    lng: 135.417,
    bays: 4,
    tel: "072-000-0009",
    catch: "源氏ゆかりの多田神社と里山。静かな川西時間。",
    theme: "mountain",
    photo: PHOTO.mountainA,
    ebikes: 4,
    coupons: [
      cp("多田神社", "⛩️", "お守り授与 割引", "自治体"),
      cp("アステ川西", "🛍️", "対象店で使える 500円券", "提携店舗"),
      cp("妙見ケーブル", "🚠", "往復券 割引", "商工会議所"),
    ],
    spots: [
      { name: "多田神社", category: "観光", emoji: "⛩️", description: "清和源氏発祥の地として知られる古社。", access: "車で約10分" },
      { name: "アステ川西", category: "ショッピング", emoji: "🛍️", description: "川西能勢口駅前の便利な商業施設。", access: "車で約8分" },
      { name: "妙見山（里山・ケーブル）", category: "遊び", emoji: "🚠", description: "ケーブルで登る信仰の山。森林浴も気持ちいい。", access: "車で約25分" },
    ],
  },
  {
    id: "takarazuka",
    name: "宝塚店",
    area: "阪神",
    city: "宝塚市",
    address: "宝塚市栄町1-1-1",
    lat: 34.799,
    lng: 135.36,
    bays: 5,
    tel: "0797-000-0010",
    catch: "歌劇と手塚マンガの街。華やかな宝塚を満喫。",
    theme: "harbor",
    photo: PHOTO.harborB,
    ebikes: 6,
    coupons: [
      cp("手塚治虫記念館", "🤖", "入館料 100円引き", "自治体"),
      cp("宝塚ホテル カフェ", "☕", "ドリンク 割引", "提携店舗"),
      cp("中山寺 参道", "🍡", "おまんじゅう 1個サービス", "商工会議所"),
    ],
    spots: [
      { name: "宝塚大劇場", category: "遊び", emoji: "🎭", description: "夢の舞台・宝塚歌劇。観劇でなくても雰囲気満点。", access: "車で約10分" },
      { name: "手塚治虫記念館", category: "観光", emoji: "🤖", description: "鉄腕アトムの世界へ。マンガファン必見。", access: "車で約11分" },
      { name: "中山寺", category: "観光", emoji: "🛕", description: "安産祈願で有名な古刹。参道の散策も楽しい。", access: "車で約12分" },
    ],
  },
  {
    id: "nishinomiya",
    name: "西宮店",
    area: "阪神",
    city: "西宮市",
    address: "西宮市鳴尾浜3-1-10",
    lat: 34.737,
    lng: 135.342,
    bays: 5,
    tel: "0798-000-0011",
    catch: "野球とお酒とガーデンズ。家族で楽しめる阪神間。",
    theme: "harbor",
    photo: PHOTO.harborA,
    ebikes: 6,
    coupons: [
      cp("阪急西宮ガーデンズ", "🛍️", "対象店で使える 500円券", "提携店舗"),
      cp("甲子園歴史館", "⚾", "入館料 100円引き", "自治体"),
      cp("灘の酒蔵", "🍶", "試飲 1杯サービス", "商工会議所"),
    ],
    spots: [
      { name: "阪神甲子園球場", category: "遊び", emoji: "⚾", description: "野球の聖地。甲子園歴史館の見学も楽しい。", access: "車で約12分" },
      { name: "阪急西宮ガーデンズ", category: "ショッピング", emoji: "🛍️", description: "阪神間最大級のモール。屋上庭園も。", access: "車で約15分" },
      { name: "西宮神社（えびす宮総本社）", category: "観光", emoji: "⛩️", description: "福の神えびす様の総本社。福男選びで有名。", access: "車で約14分" },
    ],
  },
  // ───────── 北播磨エリア ─────────
  {
    id: "miki",
    name: "三木店",
    area: "北播磨",
    city: "三木市",
    address: "三木市別所町1-1-1",
    lat: 34.797,
    lng: 134.99,
    bays: 4,
    tel: "0794-000-0012",
    catch: "大型リゾートと森林公園。山田錦のふるさと。",
    theme: "mountain",
    photo: PHOTO.mountainB,
    ebikes: 5,
    coupons: [
      cp("ネスタリゾート神戸", "🦁", "入場料 割引", "提携店舗"),
      cp("三木山森林公園", "🌲", "クラフト体験 割引", "自治体"),
      cp("山田錦の郷", "🍶", "地酒 試飲サービス", "商工会議所"),
    ],
    spots: [
      { name: "ネスタリゾート神戸", category: "遊び", emoji: "🦁", description: "大自然を遊びつくす体験型リゾート。", access: "車で約15分" },
      { name: "三木山森林公園", category: "遊び", emoji: "🌲", description: "緑あふれる公園。クラフト体験や散策に。", access: "車で約10分" },
      { name: "山田錦の郷", category: "観光", emoji: "🌾", description: "酒米・山田錦の里。地酒や物産が並ぶ。", access: "車で約12分" },
    ],
  },
  {
    id: "nishiwaki",
    name: "西脇店",
    area: "北播磨",
    city: "西脇市",
    address: "西脇市野村町1-1-1",
    lat: 34.993,
    lng: 134.971,
    bays: 3,
    tel: "0795-000-0013",
    catch: "日本のへそのまち。播州織と黒田庄和牛の里。",
    theme: "mountain",
    photo: PHOTO.mountainC,
    ebikes: 4,
    coupons: [
      cp("にしわき経緯度地球科学館", "🌐", "入館料 割引", "自治体"),
      cp("黒田庄和牛 提携店", "🐄", "一品サービス", "商工会議所"),
      cp("播州織 体験工房", "🧵", "体験料 割引", "提携店舗"),
    ],
    spots: [
      { name: "日本へそ公園", category: "遊び", emoji: "🌐", description: "東経135度・北緯35度が交わる「日本のへそ」。", access: "車で約10分" },
      { name: "岡之山美術館", category: "観光", emoji: "🖼️", description: "横尾忠則ゆかりの美術館。建築も見どころ。", access: "車で約10分" },
      { name: "黒田庄和牛", category: "グルメ", emoji: "🐄", description: "神戸ビーフの素となる極上の黒田庄和牛を堪能。", access: "市内各所" },
    ],
  },
  // ───────── 東播磨エリア ─────────
  {
    id: "kakogawa",
    name: "加古川店",
    area: "東播磨",
    city: "加古川市",
    address: "加古川市野口町良野1718",
    lat: 34.757,
    lng: 134.842,
    bays: 3,
    tel: "079-000-0014",
    catch: "名物かつめしと国宝鶴林寺。落ち着いた播磨の中核。",
    theme: "mountain",
    photo: PHOTO.mountainA,
    ebikes: 4,
    coupons: [
      cp("加古川かつめし提携店", "🍱", "ごはん大盛り 無料", "商工会議所"),
      cp("鶴林寺 宝物館", "🛕", "拝観料 100円引き", "自治体"),
      cp("日岡山公園 売店", "🍦", "ソフトクリーム 50円引き", "提携店舗"),
    ],
    spots: [
      { name: "かつめし（加古川名物）", category: "グルメ", emoji: "🍱", description: "ビフカツとデミグラスのソウルフード。", access: "市内各所" },
      { name: "鶴林寺", category: "観光", emoji: "🛕", description: "「播磨の法隆寺」。国宝の本堂と太子堂は必見。", access: "車で約10分" },
      { name: "日岡山公園", category: "遊び", emoji: "🌳", description: "桜の名所でアスレチックも充実。展望も◎。", access: "車で約12分" },
    ],
  },
  {
    id: "okubo",
    name: "大久保店",
    area: "東播磨",
    city: "明石市",
    address: "明石市大久保町ゆりのき通3-3",
    lat: 34.667,
    lng: 134.943,
    bays: 4,
    tel: "078-000-0015",
    catch: "明石焼きと海峡大橋。子午線のまちでのんびり。",
    theme: "sea",
    photo: PHOTO.seaB,
    ebikes: 5,
    coupons: [
      cp("魚の棚商店街", "🐙", "本場の明石焼き 1皿サービス", "商工会議所"),
      cp("明石市立天文科学館", "🔭", "入館料 100円引き", "自治体"),
      cp("明石公園 ボート乗り場", "🚣", "ボート 30分延長無料", "提携店舗"),
    ],
    spots: [
      { name: "魚の棚商店街", category: "グルメ", emoji: "🐙", description: "新鮮な明石ダコと本場の明石焼き(玉子焼)。", access: "車で約15分" },
      { name: "明石海峡大橋／舞子公園", category: "観光", emoji: "🌉", description: "世界最大級の吊り橋。海上47mの回遊路も。", access: "車で約18分" },
      { name: "明石市立天文科学館", category: "遊び", emoji: "🔭", description: "子午線上のプラネタリウム。家族連れに人気。", access: "車で約14分" },
    ],
  },
  // ───────── 西播磨エリア ─────────
  {
    id: "himeji-higashi",
    name: "姫路東店",
    area: "西播磨",
    city: "姫路市",
    address: "姫路市花田町加納原田1-1",
    lat: 34.834,
    lng: 134.733,
    bays: 4,
    tel: "079-000-0016",
    catch: "サファリも城も。姫路の東で遊びつくす。",
    theme: "castle",
    photo: PHOTO.castle,
    ebikes: 5,
    coupons: [
      cp("姫路セントラルパーク", "🦁", "入園 ペア500円引き", "提携店舗"),
      cp("書写山ロープウェイ", "🚡", "往復券 割引", "自治体"),
      cp("太陽公園（白鳥城）", "🏰", "入園料 100円引き", "提携店舗"),
    ],
    spots: [
      { name: "姫路セントラルパーク", category: "遊び", emoji: "🦁", description: "サファリと遊園地、夏はプールも。一日たっぷり。", access: "車で約12分" },
      { name: "書写山圓教寺", category: "観光", emoji: "🚡", description: "映画ロケ地の山上伽藍。ロープウェイで空中散歩。", access: "車で約20分" },
      { name: "太陽公園（白鳥城）", category: "観光", emoji: "🏰", description: "世界の名建築と石のモニュメントが集うテーマ公園。", access: "車で約15分" },
    ],
  },
  {
    id: "taishi",
    name: "太子店",
    area: "西播磨",
    city: "揖保郡太子町",
    address: "揖保郡太子町鵤1-1-1",
    lat: 34.836,
    lng: 134.578,
    bays: 3,
    tel: "079-000-0017",
    catch: "斑鳩寺と龍野の城下町。歴史と醤油の香る里。",
    theme: "mountain",
    photo: PHOTO.mountainB,
    ebikes: 4,
    coupons: [
      cp("斑鳩寺", "🛕", "宝物館 拝観料 割引", "自治体"),
      cp("うすくち龍野醤油資料館", "🍶", "記念品プレゼント", "商工会議所"),
      cp("新舞子 潮干狩り", "🏖️", "用具レンタル 割引", "提携店舗"),
    ],
    spots: [
      { name: "斑鳩寺", category: "観光", emoji: "🛕", description: "聖徳太子ゆかりの古刹。国宝級の三重塔が立つ。", access: "車で約8分" },
      { name: "龍野（城下町・醤油）", category: "観光", emoji: "🏯", description: "「播磨の小京都」。淡口醤油と城下町散策。", access: "車で約15分" },
      { name: "新舞子海岸（干潟）", category: "遊び", emoji: "🏖️", description: "西日本有数の遠浅干潟。潮干狩りと夕景が名物。", access: "車で約20分" },
    ],
  },
  {
    id: "himeji",
    name: "姫路店",
    area: "西播磨",
    city: "姫路市",
    address: "姫路市飾磨区中島3107",
    lat: 34.79,
    lng: 134.674,
    bays: 5,
    tel: "079-000-0018",
    catch: "世界遺産・姫路城のおひざ元。観光もグルメも満載。",
    theme: "castle",
    photo: PHOTO.castle,
    ebikes: 8,
    coupons: [
      cp("世界遺産 姫路城", "🏯", "入城料 大人100円引き", "自治体"),
      cp("姫路セントラルパーク", "🦁", "入園 ペア500円引き", "提携店舗"),
      cp("姫路おでん提携店", "🍢", "姫路おでん 1本サービス", "商工会議所"),
    ],
    spots: [
      { name: "世界遺産 姫路城", category: "観光", emoji: "🏯", description: "白鷺城の愛称で知られる現存天守。国宝見学を。", access: "車で約20分" },
      { name: "姫路セントラルパーク", category: "遊び", emoji: "🦁", description: "サファリと遊園地。一日たっぷり遊べる。", access: "車で約25分" },
      { name: "姫路おでん／あなご料理", category: "グルメ", emoji: "🍢", description: "生姜醤油の姫路おでんと瀬戸内のあなご。", access: "市内各所" },
      { name: "書写山圓教寺", category: "観光", emoji: "🚡", description: "山上の大伽藍へロープウェイで空中散歩。", access: "車で約30分" },
    ],
  },
  // ───────── 但馬エリア ─────────
  {
    id: "toyooka",
    name: "豊岡店",
    area: "但馬",
    city: "豊岡市",
    address: "豊岡市府市場1-1-1",
    lat: 35.545,
    lng: 134.823,
    bays: 4,
    tel: "0796-000-0019",
    catch: "城崎温泉とコウノトリ。日本海の幸あふれる但馬。",
    theme: "sea",
    photo: PHOTO.seaB,
    ebikes: 6,
    coupons: [
      cp("城崎温泉 外湯", "♨️", "入浴料 割引", "自治体"),
      cp("城崎マリンワールド", "🐬", "入館料 割引", "提携店舗"),
      cp("但馬牛 提携店", "🥩", "一品サービス", "商工会議所"),
    ],
    spots: [
      { name: "城崎温泉", category: "観光", emoji: "♨️", description: "外湯めぐりと浴衣そぞろ歩きが楽しい名湯。", access: "車で約20分" },
      { name: "玄武洞", category: "観光", emoji: "🪨", description: "柱状節理が織りなす不思議な造形美。", access: "車で約18分" },
      { name: "城崎マリンワールド", category: "遊び", emoji: "🐬", description: "日本一深い水槽の水族館。アジ釣り体験も。", access: "車で約25分" },
      { name: "コウノトリの郷公園", category: "観光", emoji: "🐦", description: "野生復帰したコウノトリを間近で観察できる。", access: "車で約12分" },
    ],
  },
  // ───────── 淡路エリア ─────────
  {
    id: "sumoto",
    name: "洲本店",
    area: "淡路",
    city: "洲本市",
    address: "洲本市港1-1-1",
    lat: 34.343,
    lng: 134.895,
    bays: 4,
    tel: "0799-000-0020",
    catch: "うずしおと温泉、玉ねぎの島。淡路でのんびり。",
    theme: "sea",
    photo: PHOTO.seaA,
    ebikes: 6,
    coupons: [
      cp("洲本温泉 日帰り湯", "♨️", "入浴料 割引", "自治体"),
      cp("淡路ワールドパークONOKORO", "🎡", "入園料 割引", "提携店舗"),
      cp("淡路島玉ねぎ 提携店", "🧅", "おみやげ 割引", "商工会議所"),
    ],
    spots: [
      { name: "洲本温泉", category: "観光", emoji: "♨️", description: "海辺に湯けむり立つ淡路島の温泉郷。", access: "車で約8分" },
      { name: "洲本城", category: "観光", emoji: "🏯", description: "山上から大阪湾を見渡す絶景の城跡。", access: "車で約12分" },
      { name: "大浜海岸", category: "遊び", emoji: "🏖️", description: "白砂青松の美しいビーチ。夏は海水浴で賑わう。", access: "車で約7分" },
      { name: "淡路ワールドパークONOKORO", category: "遊び", emoji: "🎡", description: "観覧車と世界の名所ミニチュアのテーマパーク。", access: "車で約15分" },
    ],
  },
];

export const STORE_MAP: Record<string, Store> = Object.fromEntries(
  STORES.map((s) => [s.id, s]),
);

export function getStore(id: string): Store | undefined {
  return STORE_MAP[id];
}

/** 無料貸し出し電動アシスト自転車のサービス名 */
export const EBIKE_BRAND = "ぐるっとバイク";

/** ネットワーク全体の電動自転車の総台数 */
export const TOTAL_EBIKES = STORES.reduce((sum, s) => sum + s.ebikes, 0);

/** ネットワーク全体の提携クーポン総数 */
export const TOTAL_COUPONS = STORES.reduce((sum, s) => sum + s.coupons.length, 0);

/** 地域活性化で連携する自治体・商工会議所など */
export const PARTNER_ORGS = [
  { name: "神戸市", type: "自治体", emoji: "🏛️" },
  { name: "姫路市", type: "自治体", emoji: "🏯" },
  { name: "明石市", type: "自治体", emoji: "🐙" },
  { name: "西宮市", type: "自治体", emoji: "⚾" },
  { name: "尼崎市", type: "自治体", emoji: "🏰" },
  { name: "宝塚市", type: "自治体", emoji: "🎭" },
  { name: "三田市", type: "自治体", emoji: "🦕" },
  { name: "豊岡市", type: "自治体", emoji: "♨️" },
  { name: "洲本市", type: "自治体", emoji: "🧅" },
  { name: "神戸商工会議所", type: "商工会議所", emoji: "🤝" },
  { name: "姫路商工会議所", type: "商工会議所", emoji: "🤝" },
  { name: "尼崎商工会議所", type: "商工会議所", emoji: "🤝" },
  { name: "東播磨観光協会", type: "観光協会", emoji: "🗺️" },
  { name: "淡路島観光協会", type: "観光協会", emoji: "🗺️" },
] as const;

/** テーマ → カラートークン名のマッピング */
export const THEME_COLORS: Record<
  Store["theme"],
  { bg: string; text: string; lightBg: string; label: string }
> = {
  sea: {
    bg: "bg-sea",
    text: "text-sea",
    lightBg: "bg-sea-light",
    label: "海の街",
  },
  mountain: {
    bg: "bg-mountain",
    text: "text-mountain",
    lightBg: "bg-mountain-light",
    label: "山と自然",
  },
  harbor: {
    bg: "bg-harbor",
    text: "text-harbor",
    lightBg: "bg-harbor-light",
    label: "港と下町",
  },
  castle: {
    bg: "bg-harbor",
    text: "text-harbor",
    lightBg: "bg-harbor-light",
    label: "城と歴史",
  },
};

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
