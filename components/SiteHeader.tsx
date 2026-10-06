import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-black text-white">
            P
          </div>

          <div>
            <div className="text-lg font-black tracking-tight text-slate-950">
              PC FIX
            </div>

            <div className="hidden text-[11px] text-slate-400 sm:block">
              컴퓨터 문제 해결 가이드
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium text-slate-600">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950"
          >
            문제 검색
          </Link>

          <Link
            href="/about"
            className="hidden rounded-lg px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950 sm:block"
          >
            PC FIX 소개
          </Link>
        </nav>
      </div>
    </header>
  );
}