import assert from 'node:assert/strict';
import fs from 'node:fs';
import { load } from './check-errors.mjs';
const { diagnosticWorkflows: guides } = load('data/diagnosticWorkflows.ts');
const { problems } = load('data/problems.ts');
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
for (const slug of Object.keys(guides)) assert.ok(home.includes(`/${prefix}problems/${slug}`), `missing homepage link: ${slug}`);
}
console.log(`PASS: ${Object.keys(guides).length} diagnostic workflows × 4 languages rendered with homepage entry points and evidence limits.`);
