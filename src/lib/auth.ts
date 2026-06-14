import { cookies } from "next/headers";

export const ADMIN_COOKIE = "kmz_admin";

/** 管理画面のパスワード（本番は環境変数 ADMIN_PASSWORD を設定してください） */
export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "kobemazda";
}

/** Cookieに保存する認証トークン（生パスワードは保存しない） */
export function expectedToken(): string {
  return Buffer.from("kmz:" + adminPassword()).toString("base64");
}

/** 現在のリクエストが管理者としてログイン済みか */
export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === expectedToken();
}
