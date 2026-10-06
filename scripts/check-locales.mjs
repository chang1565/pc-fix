import assert from "node:assert/strict";
import fs from "node:fs";
import { load } from "./check-errors.mjs";
import { collectStrings } from "./translate-content.mjs";
const { problems, errorCodes } = { ...load("data/problems.ts"), ...load("data/errorCodes.ts") };
const { localizePath, languageAlternates } = load("lib/localization.ts");
const strings = collectStrings();
const commands = /DISM \/Online \/Cleanup-Image \/RestoreHealth|sfc \/scannow|chkdsk C: \/scan|chkdsk \/r|ipconfig \/(?:flushdns|release|renew)|netsh (?:winsock reset|int ip reset)|\b0x[0-9a-f]+\b|\b[A-Z][A-Z0-9]+(?:_[A-Z0-9]+)+\b|\b[A-Za-z0-9_]+\.(?:dll|sys|msc)\b/gi;
for (const locale of ["en", "ja", "zh-CN"]) {
  const localized = load(`data/locales/${locale}.ts`);
  const dictionary = load(`data/locales/${locale}.json`);
  assert.equal(localized.problems.length, 217);
  assert.equal(localized.errorCodes.length, 80);
  for (const value of strings) {
    assert.ok(dictionary[value], `missing ${locale}: ${value}`);
    for (const command of value.match(commands) ?? []) assert.ok(dictionary[value].includes(command), `changed command ${locale}: ${command}`);
    if (value.includes("PC FIX")) assert.ok(dictionary[value].includes("PC FIX"), `${locale}: translated brand name`);
    if (locale === "zh-CN" && value.includes("드라이버")) assert.ok(!/司机|驾驶员/.test(dictionary[value]), `driver terminology: ${value}`);
    if (locale === "zh-CN" && value.includes("메모리")) assert.ok(!/记忆/.test(dictionary[value]), `memory terminology: ${value}`);
    if (locale === "ja" && value.includes("튕") && !value.includes("커서")) assert.ok(!/飛び散|バウンス/.test(dictionary[value]), `crash terminology: ${value}`);
  }
  // Diagnostic questions must not become instructions to introduce the fault.
  const diagnosticPhrases = {
    en: /[Cc]heck whether/,
    ja: /か確認|かどうか確認/,
    "zh-CN": /检查.*是否/,
  };
  for (const source of [
    "services.msc에서 Windows Update 서비스가 사용 안 함인지 확인하세요.",
    "Windows 폴더나 임시 폴더를 이동했는지 확인하세요.",
    "다른 기기도 인터넷에 연결되지 않는지 확인하세요.",
    "최근 XMP 또는 EXPO 설정을 적용했는지 확인하세요.",
  ]) assert.match(dictionary[source], diagnosticPhrases[locale], `${locale}: diagnostic instruction changed meaning`);
  const missingComponent = {
    en: /is missing/,
    ja: /見つかりません/,
    "zh-CN": /缺少.*所需/,
  };
  for (const source of [
    "앱이 필요로 하는 v14 런타임의 추가 구성요소가 없습니다.",
    "앱이 필요로 하는 레거시 DirectX 보조 구성요소가 없습니다.",
    "게임이 사용하는 레거시 XInput 구성요소가 없습니다.",
  ]) assert.match(dictionary[source], missingComponent[locale], `${locale}: required component missing changed meaning`);
  for (const [index, entry] of localized.problems.entries()) {
    assert.equal(entry.slug, problems[index].slug);
    assert.deepEqual(entry.relatedSlugs, problems[index].relatedSlugs);
    assert.ok(!/[가-힣]/.test(entry.description), `${locale}: untranslated problem`);
  }
  for (const [index, entry] of localized.errorCodes.entries()) {
    assert.equal(entry.slug, errorCodes[index].slug);
    assert.equal(entry.code, errorCodes[index].code);
    assert.ok(!/[가-힣]/.test(entry.description), `${locale}: untranslated error`);
  }
  for (const field of ["seoTitle", "seoDescription"]) {
    assert.equal(new Set(localized.problems.map(entry => entry[field])).size, 217, `${locale}: duplicate problem ${field}`);
    assert.equal(new Set(localized.errorCodes.map(entry => entry[field])).size, 80, `${locale}: duplicate error ${field}`);
  }
  const search = load(`lib/locales/${locale}/unifiedSearch.ts`).searchPcFix;
  for (const entry of localized.errorCodes) assert.equal(search(entry.code)[0]?.href, `/${locale}/errors/${entry.slug}`);
  assert.equal(search(localized.problems[0].title)[0]?.slug, localized.problems[0].slug);
  for (const problem of problems) {
    const target = localizePath(`/category/${encodeURIComponent(problem.category)}`, locale);
    assert.equal(localizePath(target, "ko"), `/category/${encodeURIComponent(problem.category)}`);
  }
  assert.equal(localizePath("/errors/memory-management", locale), `/${locale}/errors/memory-management`);
  assert.equal(localizePath(`/${locale}/errors/memory-management`, "ko"), "/errors/memory-management");
  assert.equal(Object.keys(languageAlternates(`/${locale}/errors/memory-management`).languages).length, 5);
  const layout = fs.readFileSync(new URL(`../app/${locale}/layout.tsx`, import.meta.url), "utf8");
  assert.ok(layout.includes(`lang="${locale}"`));
  console.log(`PASS ${locale}: 217 problems, 80 errors, ${strings.length} translated strings, preserved codes/commands/slugs, localized search and language links.`);
}
