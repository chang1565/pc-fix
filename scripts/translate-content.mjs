// 저장된 번역 초안을 만드는 개발용 도구입니다. 사이트 실행 중 외부 번역 요청은 없습니다.
// Google 공개 번역 엔드포인트는 정식 Cloud API 계약이 없으므로 재생성 시 가용성이 보장되지 않습니다.
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const korean = /[가-힣]/;
const sourceDir = fs.existsSync(path.join(root, "app/(ko)")) ? "app/(ko)" : "app";
export const sourceFiles = ["layout.tsx", "page.tsx", "not-found.tsx", "about/page.tsx", "contact/page.tsx", "privacy/page.tsx", "terms/page.tsx", "category/[category]/page.tsx", "problems/[slug]/page.tsx", "errors/page.tsx", "errors/[slug]/page.tsx"].map(p => `${sourceDir}/${p}`).concat(["components/SiteHeader.tsx", "components/SiteFooter.tsx", "components/ErrorBrowser.tsx", "components/ErrorCard.tsx", "lib/unifiedSearch.ts", "lib/errorSearch.ts"]);
export function loadData(filename) {
  const output = ts.transpileModule(fs.readFileSync(path.join(root, filename), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const loaded = { exports: {} };
  new Function("module", "exports", output)(loaded, loaded.exports);
  return loaded.exports;
}
export function collectStrings() {
  const values = new Set();
  function add(value) { if (typeof value === "string" && korean.test(value)) values.add(value); }
  function walk(value) {
    if (typeof value === "string") add(value);
    else if (Array.isArray(value)) value.forEach(walk);
    else if (value && typeof value === "object") Object.values(value).forEach(walk);
  }
  walk(loadData("data/problems.ts").problems); walk(loadData("data/errorCodes.ts").errorCodes);
  for (const filename of sourceFiles) {
    const source = ts.createSourceFile(filename, fs.readFileSync(path.join(root, filename), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    function visit(node) {
      if (ts.isJsxText(node)) add(node.text.replace(/\s+/g, " ").trim());
      else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) add(node.text);
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  return [...values];
}
const commands = /DISM \/Online \/Cleanup-Image \/RestoreHealth|sfc \/scannow|chkdsk C: \/scan|chkdsk \/r|ipconfig \/(?:flushdns|release|renew)|netsh (?:winsock reset|int ip reset)|\b0x[0-9a-f]+\b|\b[A-Z][A-Z0-9]+(?:_[A-Z0-9]+)+\b|\b[A-Za-z0-9_]+\.(?:dll|sys|msc)\b/gi;
function protect(text) {
  const tokens = [];
  const masked = text.replace(commands, value => { const key = `ZXQCMD${tokens.length}ZXQ`; tokens.push(value); return key; });
  return { masked, restore(value) {
    tokens.forEach((token, index) => {
      const marker = new RegExp(`ZXQ\\s*CMD\\s*${index}\\s*ZXQ`, "gi");
      if (!marker.test(value)) throw new Error(`Missing protected token ${index}`);
      value = value.replace(marker, token);
    });
    return value;
  } };
}
async function translateBatch(batch, locale) {
  const protectedItems = batch.map(protect);
  const query = protectedItems.map((item, index) => `⟦${String(index).padStart(4, "0")}⟧\n${item.masked}`).join("\n");
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.search = new URLSearchParams({ client: "gtx", sl: "ko", tl: locale, dt: "t", q: query }).toString();
  const response = await fetch(url, { signal: AbortSignal.timeout(45000) });
  if (!response.ok) throw new Error(`Translation HTTP ${response.status}`);
  const json = await response.json();
  const text = json[0].map(part => part[0] ?? "").join("");
  const markers = [...text.matchAll(/⟦\s*(\d{4})\s*⟧/g)];
  if (markers.length !== batch.length) throw new Error(`Translation boundary mismatch ${markers.length}/${batch.length}`);
  return markers.map((marker, index) => {
    if (Number(marker[1]) !== index) throw new Error("Translation order mismatch");
    const translated = text.slice(marker.index + marker[0].length, markers[index + 1]?.index ?? text.length).trim();
    if (!translated) throw new Error("Empty translation");
    return protectedItems[index].restore(translated);
  });
}
async function run() {
  const strings = collectStrings();
  console.log(`Unique Korean strings: ${strings.length}; characters: ${strings.reduce((n, s) => n + s.length, 0)}`);
  if (process.argv.includes("--collect")) return;
  fs.mkdirSync(path.join(root, "data/locales"), { recursive: true });
  await Promise.all(["en", "ja", "zh-CN"].map(async locale => {
    const filename = path.join(root, `data/locales/${locale}.json`);
    const dictionary = fs.existsSync(filename) ? JSON.parse(fs.readFileSync(filename, "utf8")) : {};
    const pending = strings.filter(value => !dictionary[value]);
    let done = 0;
    while (done < pending.length) {
      const batch = []; let length = 0;
      while (done + batch.length < pending.length && length < 2600 && batch.length < 24) {
        const value = pending[done + batch.length]; batch.push(value); length += value.length + 35;
      }
      let translated;
      for (let attempt = 0; attempt < 4; attempt++) {
        try { translated = await translateBatch(batch, locale); break; }
        catch (error) {
          if (attempt === 3) throw error;
          await new Promise(resolve => setTimeout(resolve, 1500 * (attempt + 1)));
        }
      }
      batch.forEach((value, index) => { dictionary[value] = translated[index]; });
      fs.writeFileSync(filename, JSON.stringify(dictionary, null, 2) + "\n");
      done += batch.length;
      if (done % 240 < 24 || done === pending.length) console.log(`${locale}: ${done}/${pending.length}`);
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  }));
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) run().catch(error => { console.error(error); process.exitCode = 1; });
