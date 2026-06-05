import Link from "next/link";
import { StaffHeader } from "@/components/StaffHeader";

export const metadata = {
  title: "管理ポータル | 神戸マツダ ぐるっと点検ネット",
};

export default function StaffLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-full flex flex-col flex-1">
      <StaffHeader />
      <main className="flex-1">{children}</main>
      <footer className="bg-ink text-white/50 mt-16">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <span>© 2026 神戸マツダ 管理ポータル（店舗・本部向け）</span>
          <Link href="/" className="hover:text-white">
            お客様ページを見る →
          </Link>
        </div>
      </footer>
    </div>
  );
}
