import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { languageAlternates } from "@/lib/localization";

export const metadata: Metadata = {
  metadataBase: new URL("https://pcfixbase.com"),

  title: "컴퓨터 고장 증상별 원인과 해결 방법 | PC FIX",

  description:
    "컴퓨터 고장 증상과 Windows 오류 코드를 검색하고, 원인과 단계별 해결 방법을 확인하세요.",

  openGraph: {
    title: "컴퓨터 고장 증상별 원인과 해결 방법 | PC FIX",
    description: "컴퓨터 고장 증상과 Windows 오류 코드를 검색하고, 원인과 단계별 해결 방법을 확인하세요.",
    siteName: "PC FIX",
    type: "website",
  },

  applicationName: "PC FIX",
  verification: {
    other: {
      "naver-site-verification": "6b525e41113b389484e65e8a18615d341056f46e",
      "google-adsense-account": "ca-pub-5914836791785057",
    },
  },
  alternates: languageAlternates("/"),

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5914836791785057"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
