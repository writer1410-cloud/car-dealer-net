#!/usr/bin/env node
/*
 * プレゼン用「完全オフライン静的サイト」を out/ に書き出すビルドスクリプト。
 *
 *   npm run build:offline
 *
 * - NEXT_PUBLIC_OFFLINE=1 で next build を実行し、画像をすべて端末内生成の
 *   プレースホルダ（＋アップ済み実写真）に切り替えて static export する。
 * - 静的書き出しと両立しないサーバー機能（管理画面 API / スタッフ画面）は
 *   ビルド中だけ一時的に退避し、終了後に必ず元へ戻す。
 *
 * 生成後は、インターネットの無い環境でも以下で閲覧できる:
 *   npx serve out          （または任意の静的サーバー）
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const stashDir = path.join(root, ".offline-build-stash");

// 静的書き出しと両立しない（Request依存の）ルート群
const EXCLUDE = [
  path.join("src", "app", "api"),
  path.join("src", "app", "(staff)"),
];

// ルート設定は静的文字列でなければならないため、ビルド中だけ書き換える。
// （force-dynamic は static export と両立しないので force-static に差し替え）
const c = (...p) => path.join("src", "app", "(customer)", ...p);
const PATCH = [
  { rel: c("page.tsx") },
  { rel: c("stores", "page.tsx") },
  { rel: c("media", "page.tsx") },
  { rel: c("stores", "[id]", "page.tsx"), addStaticParams: true },
  { rel: c("media", "[id]", "page.tsx"), addStaticParams: true },
];

const backups = new Map(); // rel -> 元のソース

function patchSources() {
  for (const { rel, addStaticParams } of PATCH) {
    const file = path.join(root, rel);
    const orig = fs.readFileSync(file, "utf8");
    backups.set(rel, orig);
    let next = orig.replace(
      'export const dynamic = "force-dynamic";',
      'export const dynamic = "force-static";' +
        (addStaticParams ? "\nexport const dynamicParams = false;" : ""),
    );
    fs.writeFileSync(file, next, "utf8");
  }
}

function restoreSources() {
  for (const [rel, orig] of backups) {
    fs.writeFileSync(path.join(root, rel), orig, "utf8");
  }
  backups.clear();
}

function stash() {
  fs.rmSync(stashDir, { recursive: true, force: true });
  fs.mkdirSync(stashDir, { recursive: true });
  for (const rel of EXCLUDE) {
    const src = path.join(root, rel);
    if (!fs.existsSync(src)) continue;
    const dest = path.join(stashDir, rel.replace(/[\\/]/g, "__"));
    fs.renameSync(src, dest);
    console.log(`  退避: ${rel}`);
  }
}

function restore() {
  if (!fs.existsSync(stashDir)) return;
  for (const rel of EXCLUDE) {
    const dest = path.join(stashDir, rel.replace(/[\\/]/g, "__"));
    const src = path.join(root, rel);
    if (fs.existsSync(dest)) {
      fs.rmSync(src, { recursive: true, force: true });
      fs.renameSync(dest, src);
      console.log(`  復元: ${rel}`);
    }
  }
  fs.rmSync(stashDir, { recursive: true, force: true });
}

console.log("▶ オフライン静的サイトを書き出します (out/)\n");
stash();
patchSources();
let code = 1;
try {
  const res = spawnSync(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "build"],
    {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, NEXT_PUBLIC_OFFLINE: "1" },
    },
  );
  code = res.status ?? 1;
} finally {
  restoreSources();
  restore();
}

if (code === 0) {
  console.log(
    "\n✅ 完了: out/ に静的サイトを書き出しました。\n" +
      "   ローカルで確認:  npx serve out\n" +
      "   そのまま out/ フォルダを配布・持ち運びできます（ネット不要）。",
  );
} else {
  console.error("\n❌ ビルドに失敗しました。");
}
process.exit(code);
