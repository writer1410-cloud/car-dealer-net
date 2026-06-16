import "server-only";
import fs from "fs";
import path from "path";
import { ARTICLES as SEED_ARTICLES, Article } from "./articles";
import { STORES } from "./stores";
import { Store } from "./types";
import { OFFLINE, isRemoteUrl } from "./images";

/**
 * 管理画面で編集したコンテンツの保存先（サーバーのJSONファイル）。
 * ローカル／Node実行環境では永続化されます。
 * ※ Vercel等の読み取り専用FSでは保存できないため、本番運用では
 *   Vercel Blob / KV などのストレージへの差し替えを推奨します。
 */
const DIR = path.join(process.cwd(), "content");

function readJSON<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJSON(file: string, data: unknown): void {
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(path.join(DIR, file), JSON.stringify(data, null, 2), "utf8");
}

/* ───────── 記事 ───────── */

export function getArticles(): Article[] {
  const list = readJSON<Article[]>("articles.json", SEED_ARTICLES);
  // オフラインでは外部URLの画像は表示できないため自動画像にフォールバックさせる
  if (OFFLINE) {
    return list.map((a) =>
      isRemoteUrl(a.photo) ? { ...a, photo: undefined } : a,
    );
  }
  return list;
}

export function getArticleById(id: string): Article | undefined {
  return getArticles().find((a) => a.id === id);
}

export function saveArticles(articles: Article[]): void {
  writeJSON("articles.json", articles);
}

/* ───────── サイト設定（画像差し替え）───────── */

export interface SiteSettings {
  /** 店舗ID → 画像URL の上書き */
  storeImages: Record<string, string>;
}

export function getSiteSettings(): SiteSettings {
  return readJSON<SiteSettings>("site.json", { storeImages: {} });
}

export function saveSiteSettings(s: SiteSettings): void {
  writeJSON("site.json", s);
}

/** 画像上書きを反映した店舗一覧（サーバーコンポーネント用） */
export function getStoresResolved(): Store[] {
  const { storeImages } = getSiteSettings();
  return STORES.map((s) => {
    const override = storeImages[s.id]?.trim();
    // オフラインでは外部URLの上書きは無視し、自動画像にフォールバック
    const photo = override && !(OFFLINE && isRemoteUrl(override)) ? override : s.photo;
    return { ...s, photo };
  });
}

export function getStoreResolved(id: string): Store | undefined {
  return getStoresResolved().find((s) => s.id === id);
}
