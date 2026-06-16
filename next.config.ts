import type { NextConfig } from "next";

// オフライン（プレゼン用静的書き出し）モード
const offline = process.env.NEXT_PUBLIC_OFFLINE === "1";

const nextConfig: NextConfig = {
  // offline 時は完全静的サイト（out/）として書き出す
  ...(offline ? { output: "export", trailingSlash: true } : {}),
  images: {
    // 画像最適化サーバーを介さず直接配信し、確実に表示されるようにする
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      // 管理画面で差し替える任意の画像URLを許可
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
