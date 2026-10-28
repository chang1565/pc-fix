// Run after a production build: navigation destinations, FAQ content and initial JS budget.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { load } from './check-errors.mjs';
const escape = text => text.replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#x27;' }[c]));
const stripScripts = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
let checked = 0;
for (const locale of ['ko','en','ja','zh-CN']) {
  const prefix = locale === 'ko' ? '' : `${locale}/`;
  const home = fs.readFileSync(`.next/server/app/${locale === 'ko' ? 'index' : locale}.html`, 'utf8');
  const navigation = stripScripts(home).match(/<section id="symptom-start"[\s\S]*?<\/section>/)?.[0];
  assert.ok(navigation, `symptom navigator missing: ${locale}`);
  const links = [...navigation.matchAll(/href="([^"]+)"/g)].map(match => match[1]);
  assert.equal(links.length, 21, `19 symptom routes and 2 safety routes: ${locale}`);
  for (const link of links) {
    assert.ok(link.startsWith(`/${prefix}problems/`), `wrong language: ${link}`);
    assert.ok(fs.existsSync(`.next/server/app${link}.html`), `missing destination: ${link}`);
  }
  const scripts = [...new Set([...home.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m => m[1].split('?')[0]).filter(p => p.startsWith('/_next/static/')))];
  const bytes = scripts.reduce((total, file) => total + fs.statSync(`.next/${file.slice('/_next/'.length)}`).size, 0);
  assert.ok(bytes < 850_000, `initial JS budget exceeded: ${locale}: ${bytes}`);
  const data = locale === 'ko' ? { ...load('data/problems.ts'), ...load('data/errorCodes.ts') } : load(`data/locales/${locale}.ts`);
  for (const [kind, entries] of [['problems', data.problems], ['errors', data.errorCodes]]) {
    for (const entry of entries) {
      const html = stripScripts(fs.readFileSync(`.next/server/app/${prefix}${kind}/${entry.slug}.html`, 'utf8'));
      for (const faq of entry.faqs) assert.ok(html.includes(escape(faq.answer)), `FAQ absent from initial HTML: ${locale}/${entry.slug}`);
      assert.ok(html.includes('id="official-sources"'), `missing sources anchor: ${entry.slug}`);
      assert.ok(html.includes('id="diagnostic-notes"'), `missing worksheet: ${entry.slug}`);
      assert.ok(html.includes('class="route-visual"'), `missing optional diagram: ${entry.slug}`);
      checked++;
    }
  }
  console.log(`PASS ${locale}: 21 localized routes; ${bytes} bytes of initial script files (uncompressed).`);
}
console.log(`PASS: ${checked} detail pages retain FAQ answers, official sources, notes and optional diagrams in initial HTML.`);
