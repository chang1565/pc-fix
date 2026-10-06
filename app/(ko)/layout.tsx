import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { languageAlternates } from "@/lib/localization";

export const metadata: Metadata = {
  metadataBase: new URL("https://pcfixbase.com"),

  title: "컴퓨터 고장 증상별 원인과 해결 방법 | PC FIX",

  description:
    "컴퓨터 전원 안 켜짐, 부팅 실패, 검은 화면, 블루스크린, 게임 튕김, 인터넷·Wi-Fi 문제 등 PC 고장 증상별 원인과 해결 방법을 단계별로 확인하세요.",

  applicationName: "PC FIX",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
