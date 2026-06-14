import { redirect, notFound } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { getArticleById } from "@/lib/content";
import { SectionTitle } from "@/components/ui";
import { ArticleEditor } from "@/components/admin/ArticleEditor";

export const dynamic = "force-dynamic";
export const metadata = { title: "記事を編集 | 神戸マツダ" };

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isAuthed())) redirect("/staff/login");
  const { id } = await params;
  const article = getArticleById(id);
  if (!article) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <SectionTitle eyebrow="管理画面" title="記事を編集" />
      <div className="rounded-2xl bg-white border border-mist shadow-sm p-6">
        <ArticleEditor article={article} />
      </div>
    </div>
  );
}
