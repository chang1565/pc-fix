// 번역 파일은 저장된 콘텐츠입니다. 외부 번역 서비스 없이 SSR·정적 생성에 사용합니다.
const identifiers = new Set(["slug", "code", "relatedSlugs", "relatedProblemSlugs", "difficulty", "updatedAt", "url"]);
export function localizeData<T>(value: T, dictionary: Record<string, string>, field = ""): T {
  if (identifiers.has(field)) return value;
  if (typeof value === "string") return (dictionary[value] ?? value) as T;
  if (Array.isArray(value)) return value.map(item => localizeData(item, dictionary)) as T;
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, localizeData(item, dictionary, key)])) as T;
  return value;
}
