# オフライン用の代表写真（任意・差し替え自由）

このフォルダに画像を置くと、**オフライン静的版**（`npm run build:offline`）で
自動生成のプレースホルダの代わりに、その**実写真**が使われます。
置かないテーマは、これまで通りブランド風プレースホルダ（絵文字＋グラデ）に
なります。**1枚も置かなくてもオフライン表示は成立します。**

## 使い方

1. 下の「ファイル名」で画像を保存（推奨: 横長 1200×800 程度の `.jpg`）
2. `npm run build:offline` を実行（自動で反映されます）

## ファイル名一覧（置きたいものだけでOK）

### スポット／店舗まわり
| ファイル名 | 用途（テーマ） |
|---|---|
| `gourmet.jpg`     | グルメ・和食・海鮮・名物 |
| `cafe.jpg`        | カフェ・喫茶 |
| `bakery.jpg`      | パン・ベーカリー |
| `onsen.jpg`       | 温泉 |
| `castle.jpg`      | 城（姫路城など） |
| `temple.jpg`      | 寺・神社 |
| `sightseeing.jpg` | 観光・名所・異人館・タワー |
| `nature.jpg`      | 自然・山・公園・田園 |
| `sea.jpg`         | 海・港・橋・海岸 |
| `leisure.jpg`     | レジャー・遊園地・スタジアム・動物 |
| `shopping.jpg`    | ショッピング・モール |
| `farm.jpg`        | 牧場・ぶどう園 |
| `night.jpg`       | 夜景 |
| `resort.jpg`      | リゾート |
| `store.jpg`       | 店舗ヒーロー（既定の背景） |

### イベント
| ファイル名 | 用途（カテゴリ） |
|---|---|
| `event-festival.jpg`     | 祭り |
| `event-fireworks.jpg`    | 花火 |
| `event-illumination.jpg` | イルミネーション |
| `event-art.jpg`          | アート |
| `event-music.jpg`        | 音楽・ステージ |
| `event-sports.jpg`       | スポーツ |
| `event-harvest.jpg`      | 体験・収穫 |
| `event-market.jpg`       | マルシェ・市 |

> 特定スポット（南京町・姫路城 等）の実写真は従来どおり `public/spots/` に
> 置いて個別固定できます。こちらのフォルダは「テーマ単位の代表写真」用です。
