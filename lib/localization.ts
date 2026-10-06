import categoryLocales from "@/data/categoryLocales.json";

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
export function languageAlternates(pathname: string) {
  return { canonical: pathname, languages: {
    ...Object.fromEntries(locales.map(locale => [locale, localizePath(pathname, locale)])),
    "x-default": localizePath(pathname, "ko"),
  } };
}
