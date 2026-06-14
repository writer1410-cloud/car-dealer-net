import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getArticles, saveArticles } from "@/lib/content";
import { Article } from "@/lib/articles";

export async function GET() {
  return NextResponse.json(getArticles());
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as Partial<Article>;
  if (!body.title || !body.title.trim()) {
    return NextResponse.json(
      { ok: false, message: "タイトルは必須です" },
      { status: 400 },
    );
  }

  const id = "art-" + Date.now().toString(36);
  const article: Article = {
    id,
    title: body.title.trim(),
    category: body.category ?? "観光",
    area: body.area ?? "神戸",
    excerpt: body.excerpt ?? "",
    sections: Array.isArray(body.sections) ? body.sections : [],
    date: body.date ?? new Date().toISOString().slice(0, 10),
    tags: Array.isArray(body.tags) ? body.tags : [],
    relatedStoreId: body.relatedStoreId || undefined,
    featured: !!body.featured,
    photo: body.photo?.trim() || undefined,
  };

  try {
    saveArticles([article, ...getArticles()]);
  } catch {
    return NextResponse.json(
      { ok: false, message: "保存に失敗しました（本番ではストレージ設定が必要です）" },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true, id });
}
