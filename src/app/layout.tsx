import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "神戸マツダ ぐるっと点検ネット | 兵庫のおでかけ × 車検・点検",
  description:
    "兵庫県内の神戸マツダ複数店舗をつなぐ点検予約プラットフォーム。お出かけ先の店舗で車検・点検が受けられ、AIが店舗とスタッフのスケジュールを最適化します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-platinum text-ink">
        {children}
      </body>
    </html>
  );
}
