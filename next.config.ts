import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  // 루트 레이아웃이 언어별로 여러 개라, 어느 경로에도 맞지 않는 주소는 app/global-not-found.tsx로 보여 준다.
  experimental: { globalNotFound: true },
  async headers() {
    return [{ source: "/:path*", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Strict-Transport-Security", value: "max-age=86400" },
      // Leave script, frame and network sources unrestricted for AdSense/CMP.
      { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'self'" },
    ] }];
  },
};

export default nextConfig;
