import type { MetadataRoute } from "next";
import { problems } from "@/data/problems";
import { errorCodes, errorsUpdatedAt } from "@/data/errorCodes";
import { locales, localizePath, languageAlternates } from "@/lib/localization";

const baseUrl =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://pcfixbase.com").replace(/\/$/, "");

const problemsUpdatedAt = "2026-10-06T00:00:00.000Z";

export default function sitemap(): MetadataRoute.Sitemap {
  const problemPages = problems.map((problem) => ({
    url: `${baseUrl}/problems/${problem.slug}`,
    lastModified: problemsUpdatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const pages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: errorsUpdatedAt,
      changeFrequency: "weekly",
      priority: 1,
    },
    // 수정일이 확인되지 않은 정책 페이지는 lastModified를 생략합니다.
    ...["about", "contact", "privacy", "terms"].map(path => ({ url: `${baseUrl}/${path}`, changeFrequency: "yearly" as const, priority: 0.3 })),
    ...[...new Set(problems.map(problem => problem.category))].map(category => ({ url: `${baseUrl}/category/${encodeURIComponent(category)}`, lastModified: problemsUpdatedAt, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...problemPages,
    { url: `${baseUrl}/errors`, lastModified: errorsUpdatedAt, changeFrequency: "monthly", priority: 0.8 },
    ...errorCodes.map(entry => ({ url: `${baseUrl}/errors/${entry.slug}`, lastModified: entry.updatedAt, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
  return pages.flatMap(page => {
    const pathname = new URL(page.url).pathname;
    const languages = Object.fromEntries(Object.entries(languageAlternates(pathname).languages).map(([locale, route]) => [locale, `${baseUrl}${route}`]));
    return locales.map(locale => ({
      ...page,
      url: `${baseUrl}${localizePath(pathname, locale)}`,
      ...(locale !== "ko" ? { lastModified: errorsUpdatedAt } : {}),
      alternates: { languages },
    }));
  });
}
