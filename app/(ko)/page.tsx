"use client";
import DisplayAd from "@/components/DisplayAd";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

import { problems } from "@/data/problems";
import { errorCodes } from "@/data/errorCodes";
import { searchPcFix } from "@/lib/unifiedSearch";

const popularSlugs = [
  "game-black-screen-restart",
  "game-crash",
  "computer-slow",
  "computer-black-screen",
  "windows-blue-screen",
  "computer-shutdown",
  "computer-boot-failure",
  "usb-not-recognized",
];

const popularErrorSlugs = [
  "critical-process-died",
  "irql-not-less-or-equal",
  "memory-management",
  "inaccessible-boot-device",
  "0xc000007b",
  "device-manager-code-43",
  "err-network-changed",
  "0x80070057",
];

export default function Home() {
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

  const searchResults = useMemo(() => {
    if (!debouncedQuery) {
      return [];
    }

    return searchPcFix(debouncedQuery);
  }, [debouncedQuery]);

  const popularProblems = popularSlugs
    .map((slug) => problems.find((problem) => problem.slug === slug))
    .filter(Boolean);

  const popularErrors = popularErrorSlugs
    .map((slug) => errorCodes.find((entry) => entry.slug === slug))
    .filter((entry) => entry !== undefined);

  const categories = Array.from(
    new Set(problems.map((problem) => problem.category))
  );

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
    <main className="relative min-h-screen bg-surface text-ink">
      <SiteHeader showSearch={false} />

      {/* 첫 화면: 지금 보이는 증상이나 오류 문구를 바로 입력하는 검색 */}
      <section className="mx-auto max-w-5xl px-5 pb-10 pt-12 sm:pb-14 sm:pt-16">
        <h1 className="max-w-3xl text-[2rem] font-extrabold leading-[1.25] tracking-[-0.03em] sm:text-5xl">
          컴퓨터가 이상할 때,
          <br />
          어디부터 확인해야 할까요?
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-muted sm:text-lg">
          지금 겪고 있는 증상이나 화면에 표시된 오류 코드를 그대로 입력하세요.
        </p>

        <div className="relative mt-7 max-w-2xl">
          <input
            type="search"
            aria-label="컴퓨터 증상 또는 오류 코드 검색"
            value={inputQuery}
            onChange={(event) => setInputQuery(event.target.value)}
            placeholder="예: 게임 중 검은 화면, 0xc0000005, Code 43"
            className="home-search"
          />

          {inputQuery && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="검색어 지우기"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-muted hover:bg-line hover:text-ink"
            >
              ✕
            </button>
          )}
        </div>

        <div className="home-examples">
          <button type="button" onClick={() => handleExampleSearch("게임하다가 검은 화면이 나오고 재부팅돼요")}>
            게임 중 검은 화면
          </button>
          <button type="button" onClick={() => handleExampleSearch("게임이 계속 튕겨요")}>
            게임 튕김
          </button>
          <button type="button" onClick={() => handleExampleSearch("컴퓨터가 너무 느려졌어요")}>
            컴퓨터 느려짐
          </button>
          <button type="button" onClick={() => handleExampleSearch("인터넷이 갑자기 안돼요")}>
            인터넷 안됨
          </button>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 pb-14">
        {isSearching ? (
          <section>
            <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
              <h2 className="text-xl font-extrabold">
                검색 결과
              </h2>

              <span className="text-sm text-muted">
                {searchResults.length}개
              </span>
            </div>

            <p className="mt-3 text-sm text-muted">
              &quot;{debouncedQuery}&quot;와 관련된 문제와 오류입니다.
            </p>

            {searchResults.length > 0 ? (
              <>
                <ol className="mt-2">
                  {searchResults
                    .slice(0, expandedQuery === debouncedQuery ? undefined : 10)
                    .map((problem, index) => (
                      <li key={problem.href} className="border-b border-line">
                        <Link href={problem.href} className="group block py-4">
                          <span className="text-xs text-muted">
                            {problem.category}
                          </span>

                          {index === 0 && (
                            <span className="ml-2 text-xs font-bold text-action">
                              가장 관련 있음
                            </span>
                          )}

                          <h3 className="mt-1 text-lg font-bold group-hover:text-action group-hover:underline">
                            {problem.title}
                          </h3>

                          <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted">
                            {problem.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                </ol>

                {searchResults.length > 10 && expandedQuery !== debouncedQuery && (
                  <button type="button" onClick={() => setExpandedQuery(debouncedQuery)} className="mt-6 rounded-md border border-line bg-surface px-4 py-2.5 text-sm font-bold text-action hover:border-action">검색 결과 더 보기 ({searchResults.length - 10}개)</button>
                )}
              </>
            ) : (
              <div className="mt-6 rounded-md border border-line bg-surface p-6">
                <h3 className="font-bold">
                  관련 문제를 찾지 못했습니다.
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted">
                  증상을 조금 더 자세하게 입력해 보세요.
                  <br />
                  예: &quot;게임 중 화면이 꺼지고 본체는 계속 켜져
                  있어요&quot;
                </p>

                <button
                  type="button"
                  onClick={handleClear}
                  className="mt-4 rounded-md bg-action px-4 py-2.5 text-sm font-bold text-white hover:bg-action-strong"
                >
                  다시 검색하기
                </button>
              </div>
            )}
          </section>
        ) : (
          <>
            <div className="grid gap-12 md:grid-cols-[1.25fr_1fr] md:gap-14">
              <section>
                <h2 className="home-h2">
                  자주 발생하는 문제
                </h2>

                <ul>
                  {popularProblems.map((problem) => {
                    if (!problem) {
                      return null;
                    }

                    return (
                      <li key={problem.slug} className="border-b border-line">
                        <Link
                          href={`/problems/${problem.slug}`}
                          className="group flex items-baseline gap-3 py-3"
                        >
                          <span className="w-14 shrink-0 text-xs text-muted">
                            {problem.category}
                          </span>

                          <span className="font-semibold leading-6 group-hover:text-action group-hover:underline">
                            {problem.title}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section>
                <h2 className="home-h2">
                  자주 찾는 오류 코드
                </h2>

                <ul>
                  {popularErrors.map((entry) => (
                    <li key={entry.slug} className="border-b border-line">
                      <Link
                        href={`/errors/${entry.slug}`}
                        className="group flex items-baseline justify-between gap-3 py-3"
                      >
                        <span className="home-code group-hover:text-action group-hover:underline">
                          {entry.code}
                        </span>

                        <span className="shrink-0 text-xs text-muted">
                          {entry.category}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link href="/errors" className="mt-4 inline-block text-sm font-semibold text-action hover:underline">
                  전체 오류 코드 보기
                </Link>
              </section>
            </div>

            <section className="mt-14">
              <h2 className="home-h2">
                카테고리별 문제 찾기
              </h2>

              <ul className="grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:grid-cols-4">
                {categories.map((category) => {
                  const count = problems.filter(
                    (problem) =>
                      problem.category === category
                  ).length;

                  return (
                    <li key={category} className="border-b border-line">
                      <Link
                        href={`/category/${encodeURIComponent(
                          category
                        )}`}
                        className="group flex items-baseline justify-between gap-2 py-3"
                      >
                        <span className="font-semibold group-hover:text-action group-hover:underline">
                          {category}
                        </span>

                        <span className="text-sm tabular-nums text-muted">
                          {count}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="mt-14">
              <h2 className="home-h2">
                PC FIX는 이렇게 사용하면 됩니다
              </h2>

              <ol className="home-how">
                <li>
                  <span aria-hidden="true">1</span>
                  <div>
                    <h3 className="font-bold">
                      증상을 그대로 검색
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      전문 용어 대신 실제로 보이는 현상을 입력하세요.
                    </p>
                  </div>
                </li>
                <li>
                  <span aria-hidden="true">2</span>
                  <div>
                    <h3 className="font-bold">
                      쉬운 방법부터 확인
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      비용과 위험이 적은 해결 방법부터 순서대로 안내합니다.
                    </p>
                  </div>
                </li>
                <li>
                  <span aria-hidden="true">3</span>
                  <div>
                    <h3 className="font-bold">
                      해결될 때까지만 진행
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted">
                      문제가 해결되었다면 더 어려운 단계까지 진행할
                      필요가 없습니다.
                    </p>
                  </div>
                </li>
              </ol>
            </section>
          </>
        )}
      </div>

      <div className="display-ad-sides"><DisplayAd label="광고" placement="left" /><DisplayAd label="광고" placement="right" /></div><DisplayAd label="광고" /><SiteFooter />
    </main>
  );
}
