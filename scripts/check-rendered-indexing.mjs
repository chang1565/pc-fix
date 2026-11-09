// Run after npm run build. Inspect initial HTML, excluding serialized scripts.
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const built = path.join(root, ".next/server/app");
const sitemap = fs.readFileSync(path.join(built, "sitemap.xml.body"), "utf8");
const normalize = value => decodeURIComponent(new URL(value, "https://pcfixbase.com").pathname).replace(/\/$/, "") || "/";
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => match[1]);
const urls = entries.map(entry => entry.match(/<loc>(.*?)<\/loc>/)[1]);
const routes = new Set(urls.map(normalize));
assert.equal(routes.size, urls.length, "Duplicate sitemap URL");
const links = new Map();
const titles = new Map();
for (const [index, url] of urls.entries()) {
  const pathname = new URL(url).pathname;
  const file = path.join(built, `${pathname === "/" ? "index" : decodeURIComponent(pathname.slice(1))}.html`);
  const html = fs.readFileSync(file, "utf8").replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
  assert.match(html, /<h1\b/i, `Missing heading: ${url}`);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  assert(title, `Missing title: ${url}`);
  assert(!titles.has(title), `Duplicate title: ${url} and ${titles.get(title)}`);
  titles.set(title, url);
  assert(!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html), `Blocked: ${url}`);
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1];
  assert.equal(canonical && normalize(canonical), normalize(url), `Canonical: ${url}`);
  const alternates = [...entries[index].matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].filter(match => match[1] !== "x-default");
  assert.equal(alternates.length, 4, `Sitemap languages: ${url}`);
  const anchors = [...html.matchAll(/<a\b([^>]+)>/gi)];
  for (const [, locale, target] of alternates) {
    assert(anchors.some(match => new RegExp(`hreflang="${locale}"`, "i").test(match[1]) && normalize(match[1].match(/href="([^"]+)"/)?.[1] || "/") === normalize(target)), `Missing crawlable ${locale} link: ${url}`);
  }
  const pageLinks = anchors.map(match => match[1].match(/href="([^"]+)"/)?.[1]).filter(Boolean)
    .filter(href => href.startsWith("/") && !href.startsWith("//"))
    .map(normalize);
  for (const target of pageLinks) assert(routes.has(target), `Broken internal link: ${url} -> ${target}`);
  links.set(normalize(url), pageLinks);
  const date = entries[index].match(/<lastmod>(.*?)<\/lastmod>/)?.[1];
  const policy = /\/(about|contact|privacy|terms)$/.test(pathname);
  assert.equal(date, policy ? undefined : "2026-11-09T00:00:00.000Z", `Restoration date: ${url}`);
  assert(!html.includes("/cdn-cgi/l/email-protection"), `Email rewrite link: ${url}`);
}
const reached = new Set(["/"]);
for (const route of reached) for (const target of links.get(route) || []) reached.add(target);
assert.equal(reached.size, routes.size, "Sitemap URLs unreachable through initial HTML links");
console.log(`PASS: ${routes.size} pages; self-canonicals, headings, 4 language links, sitemap dates, internal links and full HTML-link reachability.`);
