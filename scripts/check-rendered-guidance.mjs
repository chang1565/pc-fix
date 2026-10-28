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
  const dictionary = locale === "ko" ? {} : load(`data/locales/${locale}.json`);
  const label = value => escape(dictionary[value] ?? value);
  for (const [kind, entries] of [["problems", dataset.problems], ["errors", dataset.errorCodes]]) {
    for (const entry of entries) {
      const filename = path.join(".next/server/app", prefix, kind, `${entry.slug}.html`);
      const html = fs.readFileSync(filename, "utf8").replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
      assert.ok(html.includes('<h1 '), filename);
      assert.ok(html.includes(`href="https://pcfixbase.com/${prefix}${kind}/${entry.slug}"`), `canonical: ${filename}`);
      const actions = kind === "problems" ? entry.solutions.slice(1) : entry.solutions;
      const headings = [...html.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/gs)].map(match => match[1].replace(/<[^>]+>/g, "").trim());
      const solutionHeading = headings.indexOf(label(kind === "problems" ? "해결 방법" : "단계별 해결 방법"));
      const causeHeading = headings.indexOf(label("주요 원인"));
      const faqHeading = headings.indexOf(label("자주 묻는 질문"));
      assert.ok(solutionHeading >= 0 && causeHeading > solutionHeading && faqHeading > causeHeading, `solution/cause/FAQ order: ${filename}`);
      for (const faq of entry.faqs) {
        assert.ok(html.includes(escape(faq.question)) && html.includes(escape(faq.answer)), `FAQ not visible: ${filename}`);
      }
      const jumps = [...html.matchAll(/href="#solution-(\d+)"/g)].map(match => Number(match[1]));
      assert.deepEqual(jumps, actions.map(s => s.order), `action jumps: ${filename}`);
      assert.equal((html.match(/<figure\b/g) ?? []).length, 1, `one meaningful route diagram: ${filename}`);
      assert.match(html, /<svg role="img" aria-label="[^"]+"/, `accessible diagram: ${filename}`);
      for (const action of actions) {
        assert.ok(html.includes(`id="solution-${action.order}"`), `jump target: ${filename}`);
        for (const text of [action.access.when, ...action.access.route, action.access.caution]) {
          assert.ok(html.includes(escape(text)), `missing access guide: ${filename}: ${text}`);
        }
      }
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
assert.equal(pages, 1184);
console.log(`PASS: ${pages} built detail pages, ${sections} rendered sections, action locations/results, all instructions and canonical URLs.`);
