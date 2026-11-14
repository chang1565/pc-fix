import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";
import LanguageSuggestion from "@/components/LanguageSuggestion";

export default function SiteHeader({ showSearch = true }: { showSearch?: boolean }) {
  return (
    <>
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-5 gap-y-3 px-5 py-3">
        <Link href="/" className="flex shrink-0 items-baseline gap-2">
          <span className="text-lg font-extrabold tracking-tight text-ink">
            PC FIX
          </span>

          <span className="hidden text-xs text-muted sm:inline">
            컴퓨터 문제 해결 가이드
          </span>
        </Link>

        {showSearch && <form action="/" role="search" className="order-last w-full sm:order-none sm:w-auto sm:flex-1">
          <input
            type="search"
            name="q"
            aria-label="컴퓨터 증상 또는 오류 코드 검색"
            placeholder="증상이나 오류 코드 검색"
            className="h-10 w-full rounded-md border border-line bg-paper px-3 text-sm text-ink placeholder:text-muted focus:border-action focus:bg-surface"
          />
        </form>}

        <nav className="ml-auto flex items-center gap-1 text-sm text-muted sm:ml-0">
          <Link
            href="/about"
            className="hidden rounded-md px-3 py-2 hover:text-ink sm:block"
          >
            PC FIX 소개
          </Link>
          <LanguageSelector />
        </nav>
      </div>
    </header>
    <LanguageSuggestion />
    </>
  );
}
