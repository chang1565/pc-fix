import type { MetadataRoute } from "next";
import { problems } from "@/data/problems";
import { errorCodes, errorsUpdatedAt } from "@/data/errorCodes";
import { locales, localizePath, languageAlternates } from "@/lib/localization";
import { categoryGuide, guideReviewedAt } from "@/lib/koGuide";

const baseUrl =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://pcfixbase.com").replace(/\/$/, "");

const problemsUpdatedAt = "2026-10-06T00:00:00.000Z";
// The live content was restored on this date. Keep this fixed across builds;
// the historical source dates alone do not describe the latest live change.
const contentRestoredAt = "2026-11-09T00:00:00.000Z";
// 한국어 카테고리 안내를 추가한 날짜. 외국어 카테고리 페이지는 바뀌지 않았다.
const koCategoryGuidesAt = "2026-11-14T00:00:00.000Z";
const day = (date: string) => `${date}T00:00:00.000Z`;

// 한국어 주소에만 적용하는 수정일(직접 작성 안내가 들어간 페이지).
const koModified = new Map<string, string>();

export default function sitemap(): MetadataRoute.Sitemap {
  for (const problem of problems) {
    const reviewed = guideReviewedAt("problems", problem.slug);
    if (reviewed) koModified.set(`/problems/${problem.slug}`, day(reviewed));
    if (categoryGuide(problem.category)) koModified.set(`/category/${encodeURIComponent(problem.category)}`, koCategoryGuidesAt);
  }
  for (const entry of errorCodes) {
    const reviewed = guideReviewedAt("errors", entry.slug);
    if (reviewed) koModified.set(`/errors/${entry.slug}`, day(reviewed));
  }
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
      ...(page.lastModified ? { lastModified: locale === "ko" && koModified.has(pathname) ? koModified.get(pathname) : contentRestoredAt } : {}),
      alternates: { languages },
    }));
  });
}
