// 어느 경로에도 맞지 않는 주소(언어 폴더 밖 오타 등)에 보여 주는 404. 레이아웃을 거치지 않으므로 스타일을 직접 불러온다.
import "./globals.css";
import Link from "next/link";
import "./pretendard.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다 | PC FIX",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="ko">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-surface px-5">
          <div className="text-center">
            <p className="text-7xl font-extrabold text-action">404</p>
            <h1 className="mt-5 text-3xl font-extrabold text-ink">페이지를 찾을 수 없습니다</h1>
            <p className="mt-3 text-muted">주소가 바뀌었거나 없는 페이지입니다. 증상이나 오류 코드로 다시 검색해 보세요.</p>
            <Link href="/" className="mt-7 inline-flex rounded-md bg-action px-6 py-3 text-sm font-bold text-white hover:bg-action-strong">
              PC FIX 홈으로
            </Link>
            <p className="mt-6 text-sm text-muted">
              <a href="/en" lang="en">English</a> · <a href="/ja" lang="ja">日本語</a> · <a href="/zh-CN" lang="zh-CN">简体中文</a>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
