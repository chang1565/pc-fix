"use client";
import DisplayAd from "@/components/DisplayAd";
import SymptomNavigator from "@/components/SymptomNavigator";

import Link from "next/link";
import { useEffect, useState } from "react";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

type Card = { slug: string; title: string; category: string; description: string };
type SearchCard = Card & { href: string };

export default function HomeContent({ popularProblems, categories }: { popularProblems: Card[]; categories: { name: string; count: number }[] }) {
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

      {/* HERO */}
      <section className="home-hero">
        <div className="hero-grid"><div className="hero-copy">
          <div className="eyebrow">
            PC FIX · 컴퓨터 문제 해결 가이드
          </div>

          <h1 className="hero-title">
            문제를 나누면,
            <br />
            <span className="hero-accent">
              다음 할 일이 보입니다.
            </span>
          </h1>

          <p className="hero-description">
            증상을 구분하고, 필요한 항목만 점검하세요.
            <br className="hidden sm:block" />
            바꿔야 할 설정부터 멈춰야 할 상황까지 안내합니다.
          </p>

          {/* 검색 영역 */}
          <div
            className="hero-search"
            style={{
              width: "min(760px, 100%)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <input
                type="text"
                aria-label="컴퓨터 증상 또는 오류 코드 검색"
                disabled={!isSearchStateReady}
                aria-busy={!isSearchStateReady}
                value={inputQuery}
                onChange={(event) =>
                  setInputQuery(event.target.value)
                }
                placeholder="예: 게임 중 검은 화면, 0xc0000005, Code 43"
                style={{
                  display: "block",
                  width: "100%",
                  height: "64px",
                  boxSizing: "border-box",
                  paddingLeft: "22px",
                  paddingRight: "54px",
                  borderRadius: "16px",
                  border: "1px solid #cbd5e1",
                  backgroundColor: "#ffffff",
                  fontSize: "16px",
                  boxShadow:
                    "0 8px 24px rgba(15, 23, 42, 0.08)",
                }}
                className="placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              {inputQuery && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="검색어 지우기"
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                  }}
                  className="text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                >
                  ✕
                </button>
              )}
            </div>

            <p className="mt-4 text-xs text-slate-400">
              증상뿐 아니라 0xc0000005, Code 43 같은 오류 코드도 검색할 수 있습니다.
            </p>

            {/* 빠른 검색 */}
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500">
              <button
                type="button"
                onClick={() =>
                  handleExampleSearch(
                    "게임하다가 검은 화면이 나오고 재부팅돼요"
                  )
                }
                className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-blue-300 hover:text-blue-600"
              >
                게임 중 검은 화면
              </button>

              <button
                type="button"
                onClick={() =>
                  handleExampleSearch("게임이 계속 튕겨요")
                }
                className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-blue-300 hover:text-blue-600"
              >
                게임 튕김
              </button>

              <button
                type="button"
                onClick={() =>
                  handleExampleSearch("컴퓨터가 너무 느려졌어요")
                }
                className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-blue-300 hover:text-blue-600"
              >
                컴퓨터 느려짐
              </button>

              <button
                type="button"
                onClick={() =>
                  handleExampleSearch("인터넷이 갑자기 안돼요")
                }
                className="rounded-full border border-slate-200 bg-white px-4 py-2 transition hover:border-blue-300 hover:text-blue-600"
              >
                인터넷 안됨
              </button>
            </div>
          </div>
        </div>
        <aside className="hero-fieldnote">
          <div className="fieldnote-top"><span>PC FIX</span><span>CHECK → ACT → VERIFY</span></div>
          <h2>한 번에 하나씩,<br />결과를 확인하며.</h2>
          <ol className="fieldnote-steps">
            <li><span>01</span><div><strong>증상 구분</strong><p>어디까지 정상인지 먼저 확인합니다.</p></div></li>
            <li><span>02</span><div><strong>조건 비교</strong><p>다른 기기·앱·연결과 비교합니다.</p></div></li>
            <li><span>03</span><div><strong>결과 확인</strong><p>효과가 없으면 원래 설정으로 돌아갑니다.</p></div></li>
          </ol>
          <a href={isSearching ? "#search-results" : "#symptom-start"} className="fieldnote-link">{isSearching ? "검색 결과 보기" : "내 증상부터 찾아보기"} <span aria-hidden="true">↗</span></a>
        </aside>
        </div>
      </section>

      {/* 본문 */}
      <div className="mx-auto max-w-6xl px-5 py-12">
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
                <div className="grid gap-4 md:grid-cols-2">
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
                          해결 방법 보기 →
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
            <SymptomNavigator />
            {/* 대표 가이드 */}
            <section className="featured-guides">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-950">
                  원인을 좁히는 대표 가이드
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  비교할 조건과 결과별 다음 행동을 정리했습니다. 증상에 맞는 안내부터 확인하세요.
                </p>
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

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{problem.description}</p>
                      <span className="guide-link-label">비교 진단 읽기 <span aria-hidden="true">↗</span></span>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* 카테고리 */}
            <section className="mt-14">
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-950">
                  카테고리별 문제 찾기
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  문제가 발생한 분야를 알고 있다면 카테고리에서 찾아보세요.
                </p>
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
                        문제 {count}개
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="editorial-promise"><div><p className="eyebrow">자료를 읽는 기준</p><h2>확인한 것과<br />확인하지 못한 것을 구분합니다.</h2></div><div><p>공식 지원 문서를 바탕으로 적용 조건과 점검 순서를 정리합니다. 모든 기기의 고장을 직접 재현한 수리 기록은 아닙니다.</p><p>각 가이드의 출처와 중단 기준을 확인하세요. 해결되지 않으면 기록한 결과를 바탕으로 다음 점검을 결정하세요.</p><Link href="/about">작성·검증 기준 읽기 ↗</Link></div></section>
          </>
        )}
      </div>

      <div className="display-ad-sides"><DisplayAd label="광고" placement="left" /><DisplayAd label="광고" placement="right" /></div><DisplayAd label="광고" /><SiteFooter />
    </main>
  );
}
