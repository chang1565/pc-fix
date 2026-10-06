import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PC FIX | 컴퓨터 문제 해결 가이드",
  description:
    "게임 튕김, 검은 화면, 블루스크린, 느려진 컴퓨터, 인터넷 문제 등 PC에서 발생하는 다양한 문제의 원인과 해결 방법을 쉽게 찾아보세요.",
  keywords: [
    "컴퓨터 문제 해결",
    "PC 문제 해결",
    "컴퓨터 고장",
    "게임 튕김",
    "검은 화면",
    "블루스크린",
    "컴퓨터 느려짐",
    "USB 인식 안됨",
    "인터넷 안됨",
    "컴퓨터 수리",
  ],
  robots: {
    index: true,
    follow: true,
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