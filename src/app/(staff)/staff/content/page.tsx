import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { getArticles } from "@/lib/content";
import { CATEGORY_EMOJI } from "@/lib/articles";
import { Badge, Card, SectionTitle } from "@/components/ui";
import { DeleteArticleButton } from "@/components/admin/DeleteArticleButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "コンテンツ管理 | 神戸マツダ" };

export default async function ContentAdminPage() {
  if (!(await isAuthed())) redirect("/staff/login");
  const articles = getArticles();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <SectionTitle
          eyebrow="管理画面"
          title="コンテンツ管理（記事）"
          desc="兵庫おでかけ特集の記事を投稿・編集・削除できます。"
        />
        <Link
          href="/staff/content/new"
          className="mb-6 rounded-xl bg-accent text-white font-bold px-5 py-2.5 hover:bg-accent-dark transition"
        >
          ＋ 新規記事を作成
        </Link>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-mist text-ink/60 text-xs">
              <tr>
                <th className="text-left px-4 py-3">タイトル</th>
                <th className="text-left px-4 py-3">カテゴリ</th>
                <th className="text-left px-4 py-3">エリア</th>
                <th className="text-left px-4 py-3">公開日</th>
                <th className="text-left px-4 py-3">PICK UP</th>
                <th className="text-right px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a, i) => (
                <tr key={a.id} className={i % 2 ? "bg-platinum" : "bg-white"}>
                  <td className="px-4 py-3 font-bold">{a.title}</td>
                  <td className="px-4 py-3 text-ink/70">
                    {CATEGORY_EMOJI[a.category]} {a.category}
                  </td>
                  <td className="px-4 py-3 text-ink/70">{a.area}</td>
                  <td className="px-4 py-3 text-ink/60">{a.date}</td>
                  <td className="px-4 py-3">
                    {a.featured ? <Badge tone="accent">PICK UP</Badge> : "—"}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link
                      href={`/staff/content/${a.id}`}
                      className="text-xs font-bold text-ink hover:underline mr-3"
                    >
                      編集
                    </Link>
                    <Link
                      href={`/media/${a.id}`}
                      className="text-xs text-ink/50 hover:underline mr-3"
                    >
                      表示
                    </Link>
                    <DeleteArticleButton id={a.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="mt-4 text-xs text-ink/45">
        ※ 編集内容はサーバーに保存されます（ローカル／Node実行環境）。Vercel等の
        読み取り専用環境で永続化するには、Vercel Blob / KV などの設定が別途必要です。
      </p>
    </div>
  );
}
