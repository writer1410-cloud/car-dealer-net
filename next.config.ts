import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 画像最適化サーバーを介さず直接配信し、確実に表示されるようにする
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
