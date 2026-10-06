"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { problems } from "@/data/problems";
import { smartSearchProblems } from "@/lib/search";

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

export default function Home() {
  const [inputQuery, setInputQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  /*
   * 250ms 디바운스
   * 사용자가 입력을 멈춘 뒤 250ms 후 검색 실행
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputQuery.trim());
    }, 250);

    return () => {
      clearTimeout(timer);
    };
  }, [inputQuery]);

  const searchResults = useMemo(() => {
    if (!debouncedQuery) {
      return [];
    }

    return smartSearchProblems(problems, debouncedQuery);
  }, [debouncedQuery]);

  const popularProblems = popularSlugs
    .map((slug) => problems.find((problem) => problem.slug === slug))
    .filter(Boolean);

  const categories = Array.from(
    new Set(problems.map((problem) => problem.category))
  );

  const isSearching = debouncedQuery.length > 0;

  function handleExampleSearch(example: string) {
    setInputQuery(example);
    setDebouncedQuery(example);
  }

  function handleClear() {
    setInputQuery("");
    setDebouncedQuery("");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <SiteHeader />

      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-5 py-16 text-center sm:py-24">
          <div className="mx-auto mb-5 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            컴퓨터 문제를 증상으로 검색하세요
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">
            컴퓨터가 이상한데
            <br />
            <span className="text-blue-600">
              어디가 문제일까요?
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            어려운 컴퓨터 용어를 몰라도 됩니다.
            <br className="hidden sm:block" />
            지금 겪고 있는 증상을 그대로 입력해 보세요.
          </p>

          {/* 검색 영역 */}
          <div
            className="mx-auto mt-9"
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
                value={inputQuery}
                onChange={(event) =>
                  setInputQuery(event.target.value)
                }
                placeholder="예: 게임하다가 갑자기 화면이 검게 변하고 재부팅돼요"
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
                  outline: "none",
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
              입력을 멈추면 자동으로 관련 문제를 찾아드립니다.
            </p>

            {/* 빠른 검색 */}
            <div className="mt-5 flex flex-wrap justify-center gap-2 text-xs text-slate-500">
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
      </section>

      {/* 본문 */}
      <div className="mx-auto max-w-6xl px-5 py-12">
        {isSearching ? (
          <section>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  검색 결과
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  &quot;{debouncedQuery}&quot;와 관련된 문제입니다.
                </p>
              </div>

              <span className="text-sm text-slate-400">
                {searchResults.length}개
              </span>
            </div>

            {searchResults.length > 0 ? (
              <>
                <div className="grid gap-4 md:grid-cols-2">
                  {searchResults
                    .slice(0, 10)
                    .map((problem, index) => (
                      <Link
                        key={problem.slug}
                        href={`/problems/${problem.slug}`}
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
            {/* 자주 발생하는 문제 */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-black text-slate-950">
                  자주 발생하는 문제
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  많이 발생하는 PC 문제부터 확인해 보세요.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {popularProblems.map((problem) => {
                  if (!problem) {
                    return null;
                  }

                  return (
                    <Link
                      key={problem.slug}
                      href={`/problems/${problem.slug}`}
                      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                    >
                      <span className="text-xs font-bold text-blue-600">
                        {problem.category}
                      </span>

                      <h3 className="mt-2 font-bold leading-6 text-slate-950 group-hover:text-blue-600">
                        {problem.title}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
                        {problem.description}
                      </p>
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
                  문제가 발생한 분야를 알고 있다면 카테고리에서
                  찾아보세요.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {categories.map((category) => {
                  const count = problems.filter(
                    (problem) =>
                      problem.category === category
                  ).length;

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

            {/* 사용 방법 */}
            <section className="mt-14 rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10">
              <h2 className="text-2xl font-black">
                PC FIX는 이렇게 사용하면 됩니다
              </h2>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                <div>
                  <div className="text-sm font-black text-blue-400">
                    01
                  </div>

                  <h3 className="mt-2 font-bold">
                    증상을 그대로 검색
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    전문 용어 대신 실제로 보이는 현상을 입력하세요.
                  </p>
                </div>

                <div>
                  <div className="text-sm font-black text-blue-400">
                    02
                  </div>

                  <h3 className="mt-2 font-bold">
                    쉬운 방법부터 확인
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    비용과 위험이 적은 해결 방법부터 순서대로
                    안내합니다.
                  </p>
                </div>

                <div>
                  <div className="text-sm font-black text-blue-400">
                    03
                  </div>

                  <h3 className="mt-2 font-bold">
                    해결될 때까지만 진행
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    문제가 해결되었다면 더 어려운 단계까지 진행할
                    필요가 없습니다.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}