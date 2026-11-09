// 실행: node scripts/check-errors.mjs (새 의존성 없이 TypeScript 데이터 검사)
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const nodeRequire = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cache = new Map();
function load(relative) {
  const filename = path.resolve(root, relative);
  if (filename.endsWith(".json")) return JSON.parse(fs.readFileSync(filename, "utf8"));
  if (cache.has(filename)) return cache.get(filename).exports;
  const loadedModule = { exports: {} }; cache.set(filename, loadedModule);
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  const localRequire = name => name.startsWith("@/") ? load(name.slice(2) + (name.endsWith(".json") ? "" : ".ts")) : name.startsWith(".") ? load(path.resolve(path.dirname(filename), name + (name.endsWith(".json") ? "" : ".ts"))) : nodeRequire(name);
  new Function("require", "module", "exports", output)(localRequire, loadedModule, loadedModule.exports);
  return loadedModule.exports;
}
export { load };
const { errorCodes, errorCategories } = load("data/errorCodes.ts");
const { problems } = load("data/problems.ts");
const { searchErrorCodes, isExactErrorQuery } = load("lib/errorSearch.ts");
const { smartSearchProblems } = load("lib/search.ts");
const { searchPcFix } = load("lib/unifiedSearch.ts");
const sitemap = load("app/sitemap.ts").default;
assert.equal(errorCodes.length, 80);
assert.equal(problems.length, 217);
assert.equal(errorCategories.length, 7);
for (const field of ["slug", "code", "description", "seoTitle", "seoDescription"]) assert.equal(new Set(errorCodes.map(entry => entry[field])).size, 80, `duplicate ${field}`);
for (const entry of errorCodes) {
  assert.match(entry.slug, /^[a-z0-9-]+$/);
  assert.ok(entry.solutions.length >= 2 && entry.faqs.length >= 2);
  for (const slug of entry.relatedProblemSlugs) assert.ok(problems.some(problem => problem.slug === slug), `broken link: ${slug}`);
}
for (const [query, slug] of [
  ["0xc0000005", "0xc0000005"], ["0XC000007B", "0xc000007b"],
  ["Code 43", "device-manager-code-43"], ["코드 43", "device-manager-code-43"],
  ["WHEA_UNCORRECTABLE_ERROR", "whea-uncorrectable-error"],
  ["whea uncorrectable error", "whea-uncorrectable-error"],
  ["DXGI_ERROR_DEVICE_HUNG", "dxgi-error-device-hung"],
  ["VCRUNTIME140.dll", "vcruntime140-dll"],
]) {
  assert.equal(searchErrorCodes(query)[0]?.slug, slug, query);
  assert.ok(isExactErrorQuery(query), query);
  assert.equal(searchPcFix(query)[0]?.href, `/errors/${slug}`, `unified: ${query}`);
}
assert.deepEqual(searchErrorCodes(""), []);
assert.deepEqual(searchErrorCodes("존재하지않는오류987654"), []);
assert.ok(searchErrorCodes("WHEA").some(entry => entry.slug === "whea-uncorrectable-error"));
assert.equal(isExactErrorQuery("게임하다 검은화면 재부팅"), false);
assert.equal(smartSearchProblems(problems, "게임하다 검은화면 재부팅")[0].slug, "game-black-screen-restart");
assert.equal(searchPcFix("WHEA")[0].href, "/errors/whea-uncorrectable-error");
assert.deepEqual(searchPcFix(""), []);
for (const query of ["게임하다 검은화면 재부팅", "메모리", "인터넷", "블루스크린"]) {
  const combined = searchPcFix(query);
  const original = smartSearchProblems(problems, query);
  assert.deepEqual(combined.filter(entry => entry.href.startsWith("/problems/")).map(entry => entry.slug), original.map(entry => entry.slug), `symptom order: ${query}`);
  assert.equal(new Set(combined.map(entry => entry.href)).size, combined.length);
  if (searchErrorCodes(query).length) assert.ok(combined.slice(0, 10).some(entry => entry.href.startsWith("/errors/")), `visible errors: ${query}`);
}
const first = sitemap(), second = sitemap();
assert.deepEqual(first, second);
assert.equal(new Set(first.map(entry => entry.url)).size, first.length);
assert.equal(first.length, 4 * (1 + 4 + new Set(problems.map(problem => problem.category)).size + 217 + 1 + 80));
for (const entry of errorCodes) assert.ok(first.some(item => item.url.endsWith(`/errors/${entry.slug}`)));
console.log(`PASS: ${problems.length} problems, ${errorCodes.length} errors, ${errorCategories.length} categories, ${first.length} sitemap URLs; exact code and symptom search, unique metadata, valid links, stable dates.`);
