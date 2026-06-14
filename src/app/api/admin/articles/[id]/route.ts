import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getArticles, saveArticles } from "@/lib/content";
import { Article } from "@/lib/articles";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as Partial<Article>;
  const articles = getArticles();
  const idx = articles.findIndex((a) => a.id === id);
  if (idx === -1) {
    return NextResponse.json({ ok: false, message: "記事が見つかりません" }, { status: 404 });
  }

  articles[idx] = {
    ...articles[idx],
    title: body.title?.trim() || articles[idx].title,
    category: body.category ?? articles[idx].category,
    area: body.area ?? articles[idx].area,
    excerpt: body.excerpt ?? articles[idx].excerpt,
    sections: Array.isArray(body.sections) ? body.sections : articles[idx].sections,
    date: body.date ?? articles[idx].date,
    tags: Array.isArray(body.tags) ? body.tags : articles[idx].tags,
    relatedStoreId: body.relatedStoreId || undefined,
    featured: !!body.featured,
    photo: body.photo?.trim() || undefined,
  };

  try {
    saveArticles(articles);
  } catch {
    return NextResponse.json(
      { ok: false, message: "保存に失敗しました（本番ではストレージ設定が必要です）" },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const { id } = await params;
  try {
    saveArticles(getArticles().filter((a) => a.id !== id));
  } catch {
    return NextResponse.json(
      { ok: false, message: "保存に失敗しました（本番ではストレージ設定が必要です）" },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
