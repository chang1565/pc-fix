"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { localeFromPath, localizePath, type Locale } from "@/lib/localization";

// 한국어 페이지를 해외에서 연 방문자에게 자동 이동 대신 언어 안내만 보여준다.
// 언어를 직접 고른 적이 있으면(pcfix-language 쿠키) 표시하지 않는다.
const messages: Record<Exclude<Locale, "ko">, { text: string; action: string; close: string }> = {
  en: { text: "This page is in Korean. An English version is available.", action: "View in English", close: "Close" },
  ja: { text: "このページは韓国語です。日本語版があります。", action: "日本語で見る", close: "閉じる" },
  "zh-CN": { text: "此页面为韩语，提供简体中文版本。", action: "查看中文版", close: "关闭" },
};

function setLanguageCookie(locale: Locale) {
  document.cookie = `pcfix-language=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
}

export default function LanguageSuggestion() {
  const pathname = usePathname() || "/";
  const [suggested, setSuggested] = useState<Exclude<Locale, "ko"> | null>(null);

  useEffect(() => {
    if (localeFromPath(pathname) !== "ko" || document.cookie.includes("pcfix-language=")) return;
    let cancelled = false;
    fetch("/api/locale", { cache: "no-store" })
      .then(response => response.ok ? response.json() : null)
      .then((data: { locale?: Locale } | null) => {
        if (!cancelled && data?.locale && data.locale !== "ko" && data.locale in messages) setSuggested(data.locale as Exclude<Locale, "ko">);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [pathname]);

  if (!suggested) return null;
  const message = messages[suggested];
  // 본문을 밀어내지 않도록(레이아웃 이동 방지) 화면 하단에 겹쳐 띄운다.
  return <div role="region" aria-label="Language" lang={suggested} translate="no" className="fixed inset-x-0 bottom-0 z-50 border-t border-blue-200 bg-blue-50 shadow-lg">
    <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-2.5 text-sm text-blue-900">
      <p className="min-w-0 flex-1">{message.text}</p>
      <a href={localizePath(pathname, suggested) + window.location.search + window.location.hash} hrefLang={suggested} onClick={() => setLanguageCookie(suggested)} className="font-bold text-blue-700 underline">{message.action}</a>
      <button type="button" onClick={() => { setLanguageCookie("ko"); setSuggested(null); }} aria-label={message.close} className="rounded px-2 text-blue-700 hover:bg-blue-100">×</button>
    </div>
  </div>;
}
