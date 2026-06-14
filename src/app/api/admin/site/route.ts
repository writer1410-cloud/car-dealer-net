import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { getSiteSettings, saveSiteSettings, SiteSettings } from "@/lib/content";

export async function GET() {
  return NextResponse.json(getSiteSettings());
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const body = (await req.json().catch(() => ({}))) as Partial<SiteSettings>;
  const settings: SiteSettings = {
    storeImages: body.storeImages ?? {},
  };
  try {
    saveSiteSettings(settings);
  } catch {
    return NextResponse.json(
      { ok: false, message: "保存に失敗しました（本番ではストレージ設定が必要です）" },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
