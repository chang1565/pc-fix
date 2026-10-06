"use client";

import { usePathname } from "next/navigation";
import { localeFromPath, localizePath, type Locale } from "@/lib/localization";

export default function LanguageSelector() {
  const pathname = usePathname() || "/";
  return <div className="shrink-0" translate="no">
    <select id="site-language" aria-label="Select language" value={localeFromPath(pathname)} onChange={event => {
      const locale = event.target.value as Locale;
      const url = new URL(window.location.href);
      url.pathname = localizePath(url.pathname, locale);
      // 다른 root layout으로 전환하며 검색어·해시·상세 slug를 유지합니다.
      window.location.assign(url.href);
    }} className="max-w-32 rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500">
      <option value="ko">한국어</option><option value="en">English</option><option value="ja">日本語</option><option value="zh-CN">简体中文</option>
    </select>
  </div>;
}
