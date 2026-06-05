import Link from "next/link";
import { networkSummary } from "@/lib/optimizer";
import { STORES } from "@/lib/stores";
import { Badge, Card, SectionTitle } from "@/components/ui";

export default function Home() {
  const sum = networkSummary();

  return (
    <div>
      {/* ヒーロー */}
      <section className="relative overflow-hidden bg-gradient-to-br from-soul-dark via-soul to-soul-light text-white">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_2px,transparent_2px)] [background-size:28px_28px]" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <Badge tone="neutral">
            <span className="text-soul">兵庫県 × 神戸マツダ ネットワーク</span>
          </Badge>
          <h1 className="mt-4 text-3xl md:text-5xl font-black leading-tight">
            点検は「めんどう」から
            <br />
            <span className="text-amber-200">「おでかけのついで」へ。</span>
          </h1>
          <p className="mt-5 max-w-2xl text-white/85 text-lg leading-relaxed">
            姫路の方が神戸へ。神戸の方が姫路へ。お出かけ先の神戸マツダで
            車検・点検が受けられます。AIが県内{sum.storeCount}店舗の入庫枠と
            スタッフを最適化し、待ち時間の少ない時間帯へご案内します。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/availability"
              className="rounded-xl bg-white text-soul font-bold px-6 py-3 shadow-lg hover:bg-amber-50 transition"
            >
              空き店舗をさがす →
            </Link>
            <Link
              href="/stores"
              className="rounded-xl bg-white/15 text-white font-bold px-6 py-3 backdrop-blur hover:bg-white/25 transition"
            >
              店舗とおでかけ情報
            </Link>
          </div>
        </div>
      </section>

      {/* 課題 → 解決 */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle
          eyebrow="THE PROBLEM"
          title="予約が午前に集中し、午後がぽっかり空く。"
          desc="「出かける前に済ませたい」というお客様心理から、予約は午前に偏りがち。
          ネットワーク全体で見ると、その偏りがはっきりと見えてきます。"
        />
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6">
            <p className="text-sm text-ink/60">直近2週間・午前の稼働率</p>
            <p className="mt-1 text-4xl font-black text-soul">
              {(sum.amUtil * 100).toFixed(0)}%
            </p>
            <p className="mt-2 text-sm text-ink/60">
              午前は満車に近く、希望日に入れないことも。
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-ink/60">直近2週間・午後の稼働率</p>
            <p className="mt-1 text-4xl font-black text-emerald-600">
              {(sum.pmUtil * 100).toFixed(0)}%
            </p>
            <p className="mt-2 text-sm text-ink/60">
              午後はピットもスタッフも余裕あり。狙い目です。
            </p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-ink/60">午前と午後の差（偏り）</p>
            <p className="mt-1 text-4xl font-black text-amber-600">
              {(sum.imbalance * 100).toFixed(0)}pt
            </p>
            <p className="mt-2 text-sm text-ink/60">
              この偏りをならすことが、待ち時間短縮のカギ。
            </p>
          </Card>
        </div>
      </section>

      {/* 3つの仕組み */}
      <section className="bg-white border-y border-sand">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionTitle
            eyebrow="HOW IT WORKS"
            title="複数店舗だからできる、3つの仕組み"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                emoji: "🗺️",
                title: "お出かけ先で点検",
                body: "目的地のエリアを選ぶと、その近くで空いている店舗をAIが提案。買い物や観光の間に点検が完了します。",
                href: "/availability",
                cta: "空きをさがす",
              },
              {
                emoji: "📊",
                title: "全店の入庫を一目で",
                body: "各店舗のAM/PM稼働率・スタッフ数をヒートマップで把握。混雑と空きが瞬時に分かります。",
                href: "/admin",
                cta: "ダッシュボード",
              },
              {
                emoji: "🤝",
                title: "スタッフは店舗をまたいで",
                body: "神戸店が空いている日は明石店へ応援。AIが需要に合わせてスタッフ配置を提案します。",
                href: "/admin/staff",
                cta: "スタッフ配置",
              },
            ].map((f) => (
              <Card key={f.title} className="p-6 flex flex-col">
                <div className="text-4xl">{f.emoji}</div>
                <h3 className="mt-3 text-lg font-black">{f.title}</h3>
                <p className="mt-2 text-sm text-ink/65 leading-relaxed flex-1">
                  {f.body}
                </p>
                <Link
                  href={f.href}
                  className="mt-4 text-soul font-bold text-sm hover:underline"
                >
                  {f.cta} →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 店舗ネットワーク */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle
          eyebrow="OUR NETWORK"
          title={`兵庫県内 ${STORES.length} 店舗のネットワーク`}
          desc="各エリアの店舗が連携。あなたの「行き先」に必ず神戸マツダがあります。"
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STORES.map((s) => (
            <Link key={s.id} href={`/stores/${s.id}`}>
              <Card className="p-5 hover:shadow-md hover:border-soul/30 transition h-full">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-lg">{s.name}</h3>
                  <Badge tone="soul">{s.area}</Badge>
                </div>
                <p className="mt-1 text-sm text-ink/60">{s.city}</p>
                <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                  {s.catch}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
