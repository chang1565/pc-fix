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

// 분야 타일 아이콘(40×40 선 그림). 분야 이름은 번역 파일이 함께 바꾼다.
const categoryIcons: Record<string, string> = {
  "전원": "M20 7v11 M12.5 11.5a11 11 0 1 0 15 0",
  "부팅": "M8 8h24v18H8z M14 32h12 M20 26v6 M16 15l4 4-4 4",
  Windows: "M7 7h12v12H7z M21 7h12v12H21z M7 21h12v12H7z M21 21h12v12H21z",
  "화면": "M5 7h30v19H5z M20 26v6 M14 32h12",
  "그래픽": "M6 12h28v16H6z M12 28v5 M28 28v5 M14 20a4 4 0 1 0 8 0a4 4 0 1 0-8 0",
  "게임": "M11 13h18a6 6 0 0 1 6 6v3a5 5 0 0 1-9 3l-2-2h-8l-2 2a5 5 0 0 1-9-3v-3a6 6 0 0 1 6-6z M12 17v5 M9.5 19.5h5",
  "성능": "M6 30a14 14 0 1 1 28 0 M20 30l6-9",
  "저장장치": "M7 9h26v22H7z M14 20a6 6 0 1 0 12 0a6 6 0 1 0-12 0",
  "메모리": "M5 13h30v12H5z M10 25v4 M16 25v4 M22 25v4 M28 25v4 M10 17h4v4h-4z M18 17h4v4h-4z M26 17h4v4h-4z",
  CPU: "M11 11h18v18H11z M16 16h8v8h-8z M15 6v5 M20 6v5 M25 6v5 M15 29v5 M20 29v5 M25 29v5 M6 15h5 M6 20h5 M6 25h5 M29 15h5 M29 20h5 M29 25h5",
  "인터넷": "M6 16a20 20 0 0 1 28 0 M11 21a13 13 0 0 1 18 0 M16 26a6 6 0 0 1 8 0 M20 31v.5",
  Bluetooth: "M13 13l14 14-7 6V7l7 6-14 14",
  "주변기기": "M13 5h14v14H13z M10 19h20v8a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6z",
  "오디오": "M8 16h6l8-6v20l-8-6H8z M27 15a7 7 0 0 1 0 10 M30 11a12 12 0 0 1 0 18",
  "카메라": "M6 13h20v14H6z M26 18l8-4v12l-8-4",
  "프린터": "M12 6h16v9H12z M6 15h28v12H6z M12 23h16v10H12z",
  "노트북": "M9 9h22v15H9z M5 28h30l-2 3H7z",
  "발열": "M17 8a3 3 0 0 1 6 0v14a6 6 0 1 1-6 0z M20 16v9",
};

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
    <main className="home-page relative min-h-screen text-ink">
      <SiteHeader showSearch={false} tone="dark" />

      {/* 첫 화면: 지금 보이는 증상이나 오류 문구를 바로 입력하는 검색 */}
      <section className="home-hero">
        <div className="home-hero-in">
          <h1>
            컴퓨터가 이상할 때,
            <br />
            어디부터 확인해야 할까요?
          </h1>

          <p className="home-hero-lead">
            지금 겪고 있는 증상이나 화면에 표시된 오류 코드를 그대로 입력하세요.
          </p>

          <form
            role="search"
            className="home-searchbox"
            onSubmit={(event) => {
              event.preventDefault();
              handleExampleSearch(inputQuery.trim());
            }}
          >
            <input
              type="search"
              aria-label="컴퓨터 증상 또는 오류 코드 검색"
              value={inputQuery}
              onChange={(event) => setInputQuery(event.target.value)}
              placeholder="예: 게임 중 검은 화면, 0xc0000005, Code 43"
              className="home-search"
            />

            {inputQuery && (
              <button type="button" onClick={handleClear} aria-label="검색어 지우기" className="home-clear">
                ✕
              </button>
            )}

            <button type="submit" className="home-submit">검색</button>
          </form>

          <div className="home-examples">
            <p>많이 찾는 검색어</p>
            <div>
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
          </div>
        </div>
      </section>

      <div className="home-body">
        {isSearching ? (
          <section className="home-sheet">
            <div className="home-results-head">
              <h2>
                검색 결과
              </h2>

              <span>
                {searchResults.length}개
              </span>
            </div>

            <p className="home-results-note">
              &quot;{debouncedQuery}&quot;와 관련된 문제와 오류입니다.
            </p>

            {searchResults.length > 0 ? (
              <>
                <ol className="home-results">
                  {searchResults
                    .slice(0, expandedQuery === debouncedQuery ? undefined : 10)
                    .map((problem, index) => (
                      <li key={problem.href}>
                        <Link href={problem.href}>
                          <span className="home-results-cat">
                            {problem.category}
                          </span>

                          {index === 0 && (
                            <span className="home-results-best">
                              가장 관련 있음
                            </span>
                          )}

                          <h3>
                            {problem.title}
                          </h3>

                          <p>
                            {problem.description}
                          </p>
                        </Link>
                      </li>
                    ))}
                </ol>

                {searchResults.length > 10 && expandedQuery !== debouncedQuery && (
                  <button type="button" onClick={() => setExpandedQuery(debouncedQuery)} className="home-more-btn">검색 결과 더 보기 ({searchResults.length - 10}개)</button>
                )}
              </>
            ) : (
              <div className="home-empty">
                <h3>
                  관련 문제를 찾지 못했습니다.
                </h3>

                <p>
                  증상을 조금 더 자세하게 입력해 보세요.
                  <br />
                  예: &quot;게임 중 화면이 꺼지고 본체는 계속 켜져
                  있어요&quot;
                </p>

                <button type="button" onClick={handleClear}>
                  다시 검색하기
                </button>
              </div>
            )}
          </section>
        ) : (
          <div className="home-grid">
            <section className="home-sheet home-popular">
              <h2>
                자주 발생하는 문제
              </h2>

              <ol className="home-list">
                {popularProblems.map((problem, index) => {
                  if (!problem) {
                    return null;
                  }

                  return (
                    <li key={problem.slug}>
                      <Link href={`/problems/${problem.slug}`}>
                        <span className="home-rank">{index + 1}</span>
                        <span>{problem.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>

            <section className="home-sheet home-codes">
              <h2>
                자주 찾는 오류 코드
              </h2>

              <ul className="home-list">
                {popularErrors.map((entry) => (
                  <li key={entry.slug}>
                    <Link href={`/errors/${entry.slug}`} className="home-code-row">
                      <span className="home-code">
                        {entry.code}
                      </span>

                      <span className="home-code-cat">
                        {entry.category}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <Link href="/errors" className="home-more">
                전체 오류 코드 보기
              </Link>
            </section>

            <section className="home-areas">
              <h2>
                카테고리별 문제 찾기
              </h2>

              <ul>
                {categories.map((category) => {
                  const count = problems.filter(
                    (problem) =>
                      problem.category === category
                  ).length;

                  return (
                    <li key={category}>
                      <Link href={`/category/${encodeURIComponent(category)}`}>
                        <svg viewBox="0 0 40 40" aria-hidden="true">
                          <path d={categoryIcons[category] ?? "M8 8h24v24H8z"} />
                        </svg>
                        <b>{category}</b>
                        <span>{count}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="home-how-sec">
              <h2>
                PC FIX는 이렇게 사용하면 됩니다
              </h2>

              <ol className="home-how">
                <li>
                  <span aria-hidden="true">1</span>
                  <div>
                    <h3>
                      증상을 그대로 검색
                    </h3>
                    <p>
                      전문 용어 대신 실제로 보이는 현상을 입력하세요.
                    </p>
                  </div>
                </li>
                <li>
                  <span aria-hidden="true">2</span>
                  <div>
                    <h3>
                      쉬운 방법부터 확인
                    </h3>
                    <p>
                      비용과 위험이 적은 해결 방법부터 순서대로 안내합니다.
                    </p>
                  </div>
                </li>
                <li>
                  <span aria-hidden="true">3</span>
                  <div>
                    <h3>
                      해결될 때까지만 진행
                    </h3>
                    <p>
                      문제가 해결되었다면 더 어려운 단계까지 진행할
                      필요가 없습니다.
                    </p>
                  </div>
                </li>
              </ol>
            </section>
          </div>
        )}
      </div>

      <div className="display-ad-sides"><DisplayAd label="광고" placement="left" /><DisplayAd label="광고" placement="right" /></div><DisplayAd label="광고" /><SiteFooter />
    </main>
  );
}
