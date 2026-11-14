import Link from "next/link";
import LanguageSelector from "@/components/LanguageSelector";
import LanguageSuggestion from "@/components/LanguageSuggestion";

// 모든 페이지 위에 붙는 머리말. 홈은 남색 첫 화면과 이어지도록 tone="dark"를 쓴다.
export default function SiteHeader({ showSearch = true, tone = "light" }: { showSearch?: boolean; tone?: "light" | "dark" }) {
  return (
    <>
    <header className={`site-header${tone === "dark" ? " is-dark" : ""}`}>
      <div className="site-header-in">
        <Link href="/" className="site-brand">
          <span className="site-mark" aria-hidden="true" />
          PC FIX
        </Link>

        {showSearch && <form action="/" role="search" className="site-search">
          <input
            type="search"
            name="q"
            aria-label="컴퓨터 증상 또는 오류 코드 검색"
            placeholder="증상이나 오류 코드 검색"
          />
        </form>}

        <nav className="site-nav">
          <Link href="/errors">오류 코드</Link>
          <LanguageSelector />
        </nav>
      </div>
    </header>
    <LanguageSuggestion />
    </>
  );
}
