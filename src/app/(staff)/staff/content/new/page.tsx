import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { SectionTitle } from "@/components/ui";
import { ArticleEditor } from "@/components/admin/ArticleEditor";

export const dynamic = "force-dynamic";
export const metadata = { title: "新規記事 | 神戸マツダ" };

export default async function NewArticlePage() {
  if (!(await isAuthed())) redirect("/staff/login");
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <SectionTitle eyebrow="管理画面" title="新規記事を作成" />
      <div className="rounded-2xl bg-white border border-mist shadow-sm p-6">
        <ArticleEditor />
      </div>
    </div>
  );
}
