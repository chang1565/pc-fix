import { problems } from "@/data/problems";
import { smartSearchProblems } from "@/lib/search";
import { searchErrorCodes, isExactErrorQuery } from "@/lib/errorSearch";

export function searchPcFix(query: string) {
  const symptoms = smartSearchProblems(problems, query).map(problem => ({
    ...problem, href: `/problems/${problem.slug}`,
  }));
  const errors = searchErrorCodes(query).map(entry => ({
    ...entry, category: `오류 코드 · ${entry.category}`, href: `/errors/${entry.slug}`,
  }));
  const codePart = query.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
  const isCodeSearch = isExactErrorQuery(query) || (codePart.length >= 3 && errors.some(entry => entry.code.toLowerCase().replace(/[^a-z0-9]/g, "").includes(codePart)));
  if (isCodeSearch) return [...errors, ...symptoms];
  // 증상의 기존 상대 순위를 보존하며 첫 화면에도 관련 오류를 노출합니다.
  return [...symptoms.slice(0, 3), ...errors.slice(0, 3), ...symptoms.slice(3), ...errors.slice(3)];
}
