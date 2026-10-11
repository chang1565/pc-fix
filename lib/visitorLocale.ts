import { locales, type Locale } from "./localization";

export const languageCookie = "pcfix-language";

export function visitorLocale(country: string | null, preference?: string): Locale {
  if (locales.includes(preference as Locale)) return preference as Locale;
  switch (country?.toUpperCase()) {
    case "KR": return "ko";
    case "JP": return "ja";
    case "CN": return "zh-CN";
    default: return "en";
  }
}
