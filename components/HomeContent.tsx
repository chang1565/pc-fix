"use client";
import SupportIcon from "@/components/SupportIcon";
import DisplayAd from "@/components/DisplayAd";
import SymptomNavigator from "@/components/SymptomNavigator";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

type Card = { slug: string; title: string; category: string; description: string };
type SearchCard = Card & { href: string };

export default function HomeContent({ popularProblems, categories, commonErrors }: { popularProblems: Card[]; categories: { name: string; count: number }[]; commonErrors: { slug: string; code: string; title: string }[] }) {
  const [searchState, setSearchState] = useState<{ query: string; results: SearchCard[]; failed: boolean }>({ query: "", results: [], failed: false });
  const [inputQuery, setInputQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearchStateReady, setIsSearchStateReady] = useState(false);
  const [expandedQuery, setExpandedQuery] = useState<string | null>(null);

  /*
   * 처음 홈 화면이 열릴 때 URL의 ?q= 검색어를 복원합니다.
   * 문제 상세 페이지에서 브라우저 뒤로가기를 눌렀을 때
   * 이전 검색어와 검색 결과가 그대로 돌아오게 하기 위한 처리입니다.
   */
  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const queryFromUrl = params.get("q")?.trim() ?? "";

      setInputQuery(queryFromUrl);
      setDebouncedQuery(queryFromUrl);
      setIsSearchStateReady(true);
    };

    syncFromUrl();

    window.addEventListener("popstate", syncFromUrl);

    return () => {
      window.removeEventListener("popstate", syncFromUrl);
    };
  }, []);

  function updateSearchUrl(query: string) {
    const url = new URL(window.location.href);
    const normalizedQuery = query.trim();

    if (normalizedQuery) {
      url.searchParams.set("q", normalizedQuery);
    } else {
      url.searchParams.delete("q");
    }

    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`
    );
  }

  /*
   * 250ms 디바운스
   * 사용자가 입력을 멈춘 뒤 검색을 실행하고,
   * 검색어를 URL의 ?q= 값에도 함께 저장합니다.
   */
  useEffect(() => {
    if (!isSearchStateReady) {
      return;
    }

    const timer = setTimeout(() => {
      const normalizedQuery = inputQuery.trim();

      setDebouncedQuery(normalizedQuery);
      updateSearchUrl(normalizedQuery);
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [inputQuery, isSearchStateReady]);

  useEffect(() => {
    if (!debouncedQuery) return;
    let active = true;
    import("@/lib/unifiedSearch").then(({ searchPcFix }) => {
      const results = searchPcFix(debouncedQuery).map(({ slug, title, category, description, href }) => ({ slug, title, category, description, href }));
      if (active) setSearchState({ query: debouncedQuery, results, failed: false });
    }).catch(() => {
      if (active) setSearchState({ query: debouncedQuery, results: [], failed: true });
    });
    return () => { active = false; };
  }, [debouncedQuery]);
  const searchResults = searchState.query === debouncedQuery ? searchState.results : [];
  const searchPending = Boolean(debouncedQuery) && searchState.query !== debouncedQuery;

  const isSearching = debouncedQuery.length > 0;

  function handleExampleSearch(example: string) {
    setInputQuery(example);
    setDebouncedQuery(example);
    updateSearchUrl(example);
  }

  function handleClear() {
    setInputQuery("");
    setDebouncedQuery("");
    updateSearchUrl("");
  }

  return (
    <main className="home-page relative min-h-screen text-slate-900">
      <SiteHeader />

      <section className="support-hero">
        <div className="support-hero-inner">
          <h1>어떤 문제가 있나요?</h1>
          <p className="support-intro">Windows부터 하드웨어까지, 증상에 맞는 해결 방법을 찾아보세요.</p>
          <form className="support-search" role="search" onSubmit={event => {
            event.preventDefault();
            handleExampleSearch(inputQuery.trim());
            document.getElementById("support-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}>
            <SupportIcon name="search" />
            <input type="search" aria-label="컴퓨터 증상 또는 오류 코드 검색" placeholder="증상이나 오류 코드를 입력하세요" disabled={!isSearchStateReady} value={inputQuery} onChange={event => setInputQuery(event.target.value)} />
            <button type="submit" disabled={!isSearchStateReady}>검색</button>
          </form>
          <div className="support-devices">
            <Image src="/images/support-devices.png" alt="" width={1536} height={512} sizes="(max-width: 700px) 700px, 1160px" preload />
            <nav aria-label="기기별 문제 찾기" className="device-links">
              <Link href={`/category/${encodeURIComponent("전원")}`}><span>전원</span></Link>
              <Link href={`/category/${encodeURIComponent("화면")}`}><span>화면</span></Link>
              <Link href={`/category/${encodeURIComponent("인터넷")}`}><span>인터넷</span></Link>
              <Link href={`/category/${encodeURIComponent("오디오")}`}><span>소리</span></Link>
              <Link href={`/category/${encodeURIComponent("게임")}`}><span>게임</span></Link>
            </nav>
          </div>
        </div>
      </section>

      {/* 본문 */}
      <div id="support-content" className="support-content mx-auto max-w-6xl px-5 py-12">
        {isSearching ? (
          <section id="search-results" aria-live="polite" aria-label="검색 결과">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  검색 결과
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  &quot;{debouncedQuery}&quot;와 관련된 문제와 오류입니다.
                </p>
              </div>

              <span className="text-sm text-slate-400">
                {searchResults.length}개
              </span>
            </div>

            {searchPending ? <p role="status" className="rounded-xl border border-slate-200 bg-white p-6">검색 자료를 불러오는 중입니다.</p> : searchState.failed ? <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-6"><p>검색 자료를 불러오지 못했습니다. 연결을 확인하거나 증상별 목록을 이용하세요.</p><button type="button" onClick={handleClear} className="mt-4 underline">증상별 목록 보기</button></div> : searchResults.length > 0 ? (
              <>
                <div className="search-result-list">
                  {searchResults
                    .slice(0, expandedQuery === debouncedQuery ? undefined : 10)
                    .map((problem, index) => (
                      <Link
                        key={problem.href}
                        href={problem.href}
                        className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-bold text-blue-600">
                            {problem.category}
                          </span>

                          {index === 0 && (
                            <span className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-700">
                              가장 관련 있음
                            </span>
                          )}
                        </div>

                        <h3 className="mt-3 text-lg font-bold text-slate-950 group-hover:text-blue-600">
                          {problem.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {problem.description}
                        </p>

                        <div className="mt-5 text-sm font-semibold text-blue-600">
                          해결 방법 보기
                        </div>
                      </Link>
                    ))}
                </div>

                {searchResults.length > 10 && expandedQuery !== debouncedQuery && (
                  <div className="mt-6 text-center"><button type="button" onClick={() => setExpandedQuery(debouncedQuery)} className="rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-600">검색 결과 더 보기 ({searchResults.length - 10}개)</button></div>
                )}
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
                  >
                    다른 문제 검색하기
                  </button>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <div className="text-4xl">
                  🔎
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-950">
                  관련 문제를 찾지 못했습니다.
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  증상을 조금 더 자세하게 입력해 보세요.
                  <br />
                  예: &quot;게임 중 화면이 꺼지고 본체는 계속 켜져
                  있어요&quot;
                </p>

                <button
                  type="button"
                  onClick={handleClear}
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  다시 검색하기
                </button>
              </div>
            )}
          </section>
        ) : (
          <>
            <div className="knowledge-layout">
            {/* 대표 가이드 */}
            <section className="featured-guides">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-950">
                  많이 찾는 해결 방법
                </h2>
              </div>

              <div className="featured-grid">
                {popularProblems.map((problem) => {
                  if (!problem) {
                    return null;
                  }

                  return (
                    <Link
                      key={problem.slug}
                      href={`/problems/${problem.slug}`}
                      className="featured-card group"
                    >
                      <span className="text-xs font-bold text-blue-600">
                        {problem.category}
                      </span>

                      <h3 className="mt-2 font-bold leading-6 text-slate-950 group-hover:text-blue-600">
                        {problem.title}
                      </h3>
                    </Link>
                  );
                })}
              </div>
            </section>

            <div className="support-side">
              <section className="error-library">
                <div className="library-heading"><h2>오류 코드로 찾기</h2><Link href="/errors">전체 보기</Link></div>
                <div className="error-shortcuts">{commonErrors.map(error => <Link href={`/errors/${error.slug}`} key={error.slug}><code>{error.code}</code><span>{error.title}</span></Link>)}</div>
              </section>
              <Link className="windows-library" href="/category/Windows">
                <span className="window-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
                <span><strong>Windows 문제 해결 가이드</strong><span>업데이트·설정·시스템 오류</span></span>
              </Link>
            </div>
            </div>
            <div className="support-browse"><SymptomNavigator /></div>
            {/* 카테고리 */}
            <section className="category-directory">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-950">
                  카테고리별 문제 찾기
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {categories.map(({ name: category, count }) => {
                  return (
                    <Link
                      key={category}
                      href={`/category/${encodeURIComponent(
                        category
                      )}`}
                      className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
                    >
                      <div className="font-bold text-slate-950">
                        {category}
                      </div>

                      <div className="mt-1 text-xs text-slate-400">
                        {count}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

          </>
        )}
      </div>

      <div className="display-ad-sides"><DisplayAd label="광고" placement="left" /><DisplayAd label="광고" placement="right" /></div><DisplayAd label="광고" /><SiteFooter />
    </main>
  );
}
