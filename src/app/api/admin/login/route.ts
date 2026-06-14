import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminPassword, expectedToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = (await req.json().catch(() => ({}))) as {
    password?: string;
  };
  if (!password || password !== adminPassword()) {
    return NextResponse.json(
      { ok: false, message: "パスワードが違います" },
      { status: 401 },
    );
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8時間
  });
  return res;
}
