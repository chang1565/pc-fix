import type { NextConfig } from "next";
import problemRedirects from "./data/problemRedirects.json";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return ["", "/en", "/ja", "/zh-CN"].flatMap(prefix =>
      Object.entries(problemRedirects).map(([source, destination]) => ({
        source: `${prefix}/problems/${source}`,
        destination: `${prefix}/problems/${destination}`,
        permanent: true,
      }))
    );
  },
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
