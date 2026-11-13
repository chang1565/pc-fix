// 한국어 페이지에서만 직접 작성한 안내(data/koGuides)를 기존 템플릿 내용 위에 적용한다.
// 외국어 페이지는 scripts/generate-locales.mjs가 이 모듈을 lib/noKoGuide로 바꿔 기존 번역을 그대로 쓴다.
import type { Problem } from "@/data/problems";
import type { ErrorCodeEntry } from "@/data/errorCodes";
import { koErrorGuides, koProblemGuides, type KoGuide } from "@/data/koGuides/index";
import { koCategoryGuides, type CategoryGuide } from "@/data/koGuides/categories";

export type GuideExtras = Pick<KoGuide, "quickCheck" | "sources" | "reviewedAt">;

export function applyProblemGuide(problem: Problem): { problem: Problem; extras: GuideExtras | null } {
  const guide = koProblemGuides[problem.slug];
  if (!guide) return { problem, extras: null };
  return {
    problem: {
      ...problem,
      description: guide.description,
      causes: guide.causes,
      solutions: guide.solutions.map((solution, index) => ({ ...solution, order: index + 1, cost: solution.cost ?? "0원" })),
      faqs: guide.faqs,
      warning: guide.warning ?? problem.warning,
    },
    extras: { quickCheck: guide.quickCheck, sources: guide.sources, reviewedAt: guide.reviewedAt },
  };
}

export function applyErrorGuide(entry: ErrorCodeEntry): { entry: ErrorCodeEntry; extras: GuideExtras | null } {
  const guide = koErrorGuides[entry.slug];
  if (!guide) return { entry, extras: null };
  return {
    entry: {
      ...entry,
      description: guide.description,
      causes: guide.causes,
      solutions: guide.solutions.map((solution, index) => ({ ...solution, order: index + 1 })),
      faqs: guide.faqs,
      sources: guide.sources.length ? guide.sources : entry.sources,
      updatedAt: `${guide.reviewedAt}T00:00:00.000Z`,
    },
    extras: { quickCheck: guide.quickCheck, sources: guide.sources, reviewedAt: guide.reviewedAt },
  };
}

export function categoryGuide(category: string): CategoryGuide | null {
  return koCategoryGuides[category] ?? null;
}

/** 사이트맵 lastmod용: 직접 검토한 페이지의 검토일. */
export function guideReviewedAt(kind: "problems" | "errors", slug: string): string | null {
  return (kind === "problems" ? koProblemGuides : koErrorGuides)[slug]?.reviewedAt ?? null;
}
