// 외국어 페이지용: 한국어 전용 안내를 적용하지 않는다. lib/koGuide.ts와 같은 형태를 유지한다.
import type { Problem } from "@/data/problems";
import type { ErrorCodeEntry } from "@/data/errorCodes";

export type GuideExtras = { quickCheck: string[]; sources: { title: string; url: string }[]; reviewedAt: string };
type CategoryGuide = { intro: string; paths: { when: string; slug: string }[] };

export function applyProblemGuide(problem: Problem): { problem: Problem; extras: GuideExtras | null } {
  return { problem, extras: null };
}

export function applyErrorGuide(entry: ErrorCodeEntry): { entry: ErrorCodeEntry; extras: GuideExtras | null } {
  return { entry, extras: null };
}

export function categoryGuide(category: string): CategoryGuide | null {
  void category;
  return null;
}
