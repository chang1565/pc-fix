// npm run build 후 4개 언어 상세 HTML 전체의 실제 출력 내용을 확인합니다.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { load } from "./check-errors.mjs";

const escape = text => text.replace(/[&<>"']/g, character => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;",
})[character]);
let pages = 0, sections = 0;
for (const locale of ["ko", "en", "ja", "zh-CN"]) {
  const dataset = locale === "ko"
    ? { ...load("data/problems.ts"), ...load("data/errorCodes.ts") }
    : load(`data/locales/${locale}.ts`);
  const prefix = locale === "ko" ? "" : `${locale}/`;
  for (const [kind, entries] of [["problems", dataset.problems], ["errors", dataset.errorCodes]]) {
    for (const entry of entries) {
      const filename = path.join(".next/server/app", prefix, kind, `${entry.slug}.html`);
      const html = fs.readFileSync(filename, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
      assert.ok(html.includes('<h1 '), filename);
      assert.ok(html.includes(`href="https://pcfixbase.com/${prefix}${kind}/${entry.slug}"`), `canonical: ${filename}`);
      for (const text of [entry.beforeSteps, entry.unresolved].filter(Boolean)) assert.ok(html.includes(escape(text)), `missing branch in ${filename}`);
      for (const solution of entry.solutions) {
        for (const text of [solution.title, solution.location, ...solution.steps, solution.checkPoint, ...(entry.beforeSteps || solution.order > 1 ? [solution.reason] : [])].filter(Boolean)) {
          assert.ok(html.includes(escape(text)), `missing visible instruction in ${filename}: ${text}`);
        }
        sections++;
      }
      pages++;
    }
  }
}
assert.equal(pages, 1188);
console.log(`PASS: ${pages} built detail pages, ${sections} rendered sections, action locations/results, all instructions and canonical URLs.`);
