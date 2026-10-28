import assert from 'node:assert/strict';
import fs from 'node:fs';
import { load } from './check-errors.mjs';
const { diagnosticWorkflows: guides } = load('data/diagnosticWorkflows.ts');
const { problems } = load('data/problems.ts');
const review = load('docs/content-differentiation-review-2026-10-28.json');
const required = review.groups.flatMap(g => g.articles.filter(a => !a.change && /보강 필요|수정 및 보강/.test(g.decision)));
assert.equal(required.length, 63);
for (const article of required) assert.ok(guides[article.slug], `missing differentiated guide: ${article.slug}`);
const featured = [...fs.readFileSync('app/(ko)/page.tsx', 'utf8').matchAll(/^  "([a-z0-9-]+)",$/gm)].map(m => m[1]);
assert.equal(featured.length, 10);
const escape = text => text.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#x27;'}[c]));
for (const locale of ['ko', 'en', 'ja', 'zh-CN']) {
const translated = locale === 'ko' ? guides : load(`data/locales/${locale}.ts`).diagnosticWorkflows;
const prefix = locale === 'ko' ? '' : `${locale}/`;
for (const [slug, guide] of Object.entries(translated)) {
  assert.ok(problems.some(p => p.slug === slug), `unknown article: ${slug}`);
  const html = fs.readFileSync(`.next/server/app/${prefix}problems/${slug}.html`, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  for (const text of [guide.scope, guide.compare, guide.verify, guide.stop, guide.record, ...guide.branches.flat()]) {
    assert.ok(html.includes(escape(text)), `missing visible content: ${slug}: ${text}`);
  }
  assert.ok(html.includes('comparison-heading'));
  if (locale !== 'ko') assert.ok(!/[가-힣]/.test(JSON.stringify(guide)), `untranslated workflow: ${locale}/${slug}`);
}
const home = fs.readFileSync(`.next/server/app/${locale === 'ko' ? 'index' : locale}.html`, 'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
for (const slug of featured) assert.ok(home.includes(`/${prefix}problems/${slug}`), `missing homepage link: ${slug}`);
}
console.log(`PASS: ${Object.keys(guides).length} diagnostic workflows × 4 languages; all 63 follow-ups covered, 10 curated homepage entry points.`);
