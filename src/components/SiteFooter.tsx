import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white/80 mt-20">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="grid place-items-center w-8 h-8 rounded-full bg-gradient-to-br from-white to-silver text-ink font-black">
              M
            </span>
            <span className="font-black text-white">神戸マツダ</span>
          </div>
          <p className="text-sm leading-relaxed text-white/60">
            ぐるっと点検ネットは、兵庫県内の店舗ネットワークをつないで
            「おでかけのついでに点検」を実現する、新しい予約のかたちです。
          </p>
        </div>
        <div className="text-sm">
          <h3 className="font-bold text-white mb-3">お客様メニュー</h3>
          <ul className="space-y-2 text-white/60">
            <li>
              <Link href="/availability" className="hover:text-white">
                空き店舗をさがす
              </Link>
            </li>
            <li>
              <Link href="/stores" className="hover:text-white">
                店舗・おでかけスポット
              </Link>
            </li>
            <li>
              <Link href="/perks" className="hover:text-white">
                おでかけ特典・地域連携
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="font-bold text-white mb-3">スタッフの方へ</h3>
          <ul className="space-y-2 text-white/60">
            <li>
              <Link href="/staff" className="hover:text-white">
                管理ポータルへログイン →
              </Link>
            </li>
          </ul>
          <p className="mt-3 text-xs text-white/40">
            入庫スケジュール・スタッフ配置・AI最適化は
            店舗／本部スタッフ専用の管理ポータルでご利用いただけます。
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/40">
        © 2026 神戸マツダ ぐるっと点検ネット（コンセプト・デモ）
      </div>
    </footer>
  );
}
