// Run after npm run build. Inspect initial HTML, not serialized client data.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const base = "https://pcfixbase.com";
const root = ".next/server/app";
const normalize = value => decodeURIComponent(new URL(value, base).pathname).replace(/\/$/, "") || "/";
const stripScripts = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
const attributes = text => Object.fromEntries([...text.matchAll(/([\w-]+)="([^"]*)"/g)].map(match => [match[1], match[2].replace(/&amp;/g, "&")]));
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml.body"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const pages = new Map();
for (const url of urls) {
  assert.ok(url.startsWith(base + "/") || url === base, `non-HTTPS sitemap URL: ${url}`);
  const route = normalize(url);
  const filename = path.join(root, route === "/" ? "index.html" : `${route.slice(1)}.html`);
  const html = stripScripts(fs.readFileSync(filename, "utf8"));
  const linkTags = [...html.matchAll(/<link\b([^>]+)>/g)].map(match => attributes(match[1]));
  const canonical = linkTags.filter(tag => tag.rel === "canonical");
  assert.equal(canonical.length, 1, `canonical count: ${route}`);
  assert.equal(normalize(canonical[0].href), route, `self canonical: ${route}`);
  assert.ok(canonical[0].href.startsWith(base), `HTTPS canonical: ${route}`);
  assert.ok(!/<meta[^>]+(?:name="(?:robots|googlebot)"[^>]+content="[^"]*noindex|content="[^"]*noindex[^>]+name="(?:robots|googlebot)")/.test(html), `noindex: ${route}`);
  assert.ok(/<main\b[\s\S]*?<h1\b/.test(html), `initial main/h1: ${route}`);
  const languageLabel = route.startsWith('/en') ? 'Language' : route.startsWith('/ja') ? '言語' : route.startsWith('/zh-CN') ? '语言' : '언어';
  const languages = [...html.matchAll(new RegExp(`<nav aria-label="${languageLabel}"[^>]*>([\\s\\S]*?)<\\/nav>`, 'g'))];
  assert.equal(languages.length, 1, `language navigation: ${route}`);
  assert.equal([...languages[0][1].matchAll(/<a\b/g)].length, 4, `crawlable language choices: ${route}`);
  const links = [...html.matchAll(/<a\b([^>]+)>/g)].map(match => attributes(match[1]).href).filter(Boolean).filter(href => !href.startsWith("mailto:") && !href.startsWith("tel:")).map(href => new URL(href, url)).filter(link => link.origin === base && !link.search && !link.hash);
  assert.ok(!links.some(link => link.pathname.startsWith("/cdn-cgi/l/email-protection")), `email protection pseudo-page: ${route}`);
  if (/\/(?:contact|privacy)$/.test(route)) {
    assert.ok(html.includes("<!--email_off-->"), `email rewrite opt-out: ${route}`);
    if (route.endsWith("/contact")) assert.ok(html.includes('href="mailto:contact@pcfixbase.com"'), `contact mailto: ${route}`);
  }
  pages.set(route, { links: links.map(link => normalize(link.href)) });
}
const seen = new Set(["/"]), queue = ["/"];
for (let i = 0; i < queue.length; i++) {
  for (const target of pages.get(queue[i])?.links ?? []) {
    if (pages.has(target) && !seen.has(target)) { seen.add(target); queue.push(target); }
  }
}
const unreachable = [...pages.keys()].filter(route => !seen.has(route));
assert.deepEqual(unreachable, [], "sitemap pages unreachable from homepage through initial HTML anchors");
console.log(`PASS: ${pages.size} sitemap pages; self canonical, initial body, indexable robots, four language anchors, all reachable from /; eight contact/privacy pages exempt from email rewriting.`);
