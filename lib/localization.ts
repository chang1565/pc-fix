import categoryLocales from "@/data/categoryLocales.json";
import zhIndexable from "@/data/zhIndexable.json";

export const locales = ["ko", "en", "ja", "zh-CN"] as const;
export type Locale = typeof locales[number];
const categories = categoryLocales as Record<string, Record<string, string>>;
export function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/")[1];
  return locales.find(locale => locale !== "ko" && locale === first) ?? "ko";
}
export function localizePath(pathname: string, target: Locale): string {
  const current = localeFromPath(pathname);
  let base = current === "ko" ? pathname : pathname.slice(current.length + 1) || "/";
  if (base.startsWith("/category/")) {
    const name = decodeURIComponent(base.slice("/category/".length));
    const original = Object.keys(categories).find(key => key === name || Object.values(categories[key]).includes(name));
    if (original) base = `/category/${encodeURIComponent(target === "ko" ? original : categories[original][target] ?? original)}`;
  }
  return target === "ko" ? base : `/${target}${base === "/" ? "" : base}`;
}
// 중국어는 Google에 색인된 페이지만 검색 대상으로 둔다. 나머지는 이용자에게 그대로 보이되 noindex다(proxy.ts).
const zhIndexablePaths = new Set<string>(zhIndexable);
export function isIndexablePath(pathname: string) {
  if (localeFromPath(pathname) !== "zh-CN") return true;
  let path = pathname.replace(/\/$/, "");
  try { path = decodeURIComponent(path); } catch {}
  return zhIndexablePaths.has(path);
}
export function languageAlternates(pathname: string) {
  return { canonical: pathname, languages: {
    ...Object.fromEntries(locales.map(locale => [locale, localizePath(pathname, locale)]).filter(([, path]) => isIndexablePath(path))),
    "x-default": localizePath(pathname, "ko"),
  } };
}
