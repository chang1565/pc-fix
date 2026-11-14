"use client";

import { useEffect, useState } from "react";
import { errorCodes, errorCategories } from "@/data/errorCodes";
import ErrorCard from "@/components/ErrorCard";

export default function ErrorBrowser() {
  const [category, setCategory] = useState("");
  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      const legacyQuery = params.get("q")?.trim();
      if (legacyQuery) { window.location.replace(`/?q=${encodeURIComponent(legacyQuery)}`); return; }
      const selected = params.get("category") ?? "";
      setCategory(errorCategories.includes(selected) ? selected : "");
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  function update(nextCategory: string) {
    setCategory(nextCategory);
    const url = new URL(window.location.href);
    url.searchParams.delete("q");
    if (nextCategory) url.searchParams.set("category", nextCategory); else url.searchParams.delete("category");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }
  const results = errorCodes.filter(entry => !category || entry.category === category);
  return <section className="mt-8">
    <div className="max-w-sm"><label htmlFor="error-category" className="mb-2 block text-sm font-semibold">카테고리</label>
      <select id="error-category" value={category} onChange={event => update(event.target.value)} className="w-full rounded-xl border border-[#cfd4da] bg-paper p-3 focus:border-action focus:bg-surface"><option value="">전체 카테고리</option>{errorCategories.map(value => <option key={value}>{value}</option>)}</select>
    </div>
    <p role="status" className="mt-6 text-sm text-muted">{results.length}개 오류</p>
    {results.length ? <div className="mt-2 grid gap-x-10 md:grid-cols-2">{results.map(entry => <ErrorCard key={entry.slug} entry={entry} />)}</div>
      : <div className="mt-4 rounded-xl bg-paper p-8 text-center"><p>일치하는 오류가 없습니다. 다른 카테고리를 선택하세요.</p><button onClick={() => update("")} className="mt-4 font-bold text-action">전체 오류 보기</button></div>}
  </section>;
}
