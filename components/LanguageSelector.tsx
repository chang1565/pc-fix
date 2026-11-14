"use client";

import { usePathname } from "next/navigation";
import { localeFromPath, localizePath, type Locale } from "@/lib/localization";

const languages: { locale: Locale; label: string }[] = [
  { locale: "ko", label: "한국어" },
  { locale: "en", label: "English" },
  { locale: "ja", label: "日本語" },
  { locale: "zh-CN", label: "简体中文" },
];

export default function LanguageSelector() {
  const pathname = usePathname() || "/";
  const current = localeFromPath(pathname);
  return <details className="relative shrink-0" translate="no">
    <summary id="site-language" aria-label="Select language" className="cursor-pointer rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink">
      {languages.find(language => language.locale === current)?.label}
    </summary>
    <nav aria-label="Select language" className="absolute right-0 top-full z-50 mt-1 min-w-36 rounded-md border border-line bg-surface p-1 shadow-lg">
      {languages.map(({ locale, label }) => <a key={locale} href={localizePath(pathname, locale)} hrefLang={locale} lang={locale} aria-current={locale === current ? "page" : undefined} onClick={event => {
        document.cookie = `pcfix-language=${locale}; Path=/; Max-Age=31536000; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
        if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        const url = new URL(window.location.href);
        url.pathname = localizePath(url.pathname, locale);
        event.preventDefault();
        window.location.assign(url.href);
      }} className={`block rounded-md px-3 py-2 text-sm hover:bg-paper focus-visible:bg-paper ${locale === current ? "font-bold text-action" : "text-ink"}`}>{label}</a>)}
    </nav>
  </details>;
}
