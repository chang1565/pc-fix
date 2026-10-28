import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <Link href="/" className="support-brand">
          <span className="support-wordmark">PC FIX</span>
          <span className="support-tagline">컴퓨터 문제 해결 가이드</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium text-slate-600">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950"
          >
            통합 검색
          </Link>

          <Link
            href="/about"
            className="hidden rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 sm:block"
          >
            PC FIX 소개
          </Link>
          <Link href="/errors" className="rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950">오류 코드</Link>
          <LanguageSelector />
        </nav>
      </div>
    </header>
  );
}
