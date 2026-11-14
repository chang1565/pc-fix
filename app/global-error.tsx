"use client";

// 최상위 레이아웃에서 오류가 나면 보여 주는 화면. 레이아웃을 대신하므로 html·body를 직접 둔다.
import "./globals.css";
import Link from "next/link";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="ko">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-surface px-5">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-ink">페이지를 불러오지 못했습니다</h1>
            <p className="mt-3 text-muted">잠시 뒤 다시 시도해 주세요. 같은 화면이 계속 나오면 홈에서 다시 찾아 주세요.</p>
            <p className="mt-2 text-sm text-muted" lang="en">This page couldn&apos;t load. Please try again.</p>
            <div className="mt-7 flex justify-center gap-3">
              <button type="button" onClick={() => reset()} className="rounded-md bg-action px-6 py-3 text-sm font-bold text-white hover:bg-action-strong">
                다시 시도
              </button>
              <Link href="/" className="rounded-md border border-line px-6 py-3 text-sm font-bold text-ink">
                PC FIX 홈으로
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
