// Full data coverage and safety-sensitive access paths. --baseline compares an earlier assembled corpus.
import assert from "node:assert/strict";
import fs from "node:fs";
import { loadData } from "./translate-content.mjs";
import { load } from "./check-errors.mjs";
const map = JSON.parse(fs.readFileSync("data/procedureAccess.json", "utf8"));
const profiles = JSON.parse(fs.readFileSync("data/accessProfiles.json", "utf8"));
const problems = loadData("data/problems.ts").problems;
const errors = loadData("data/errorCodes.ts").errorCodes;
const all = [...problems, ...errors];
const titles = new Set(), primary = new Set();
let actions = 0;
const records = [];
for (const entry of all) {
  const solutions = entry.code ? entry.solutions : entry.solutions.slice(1);
  assert.ok(solutions.length, entry.slug);
  primary.add(map[solutions[0].title]);
  for (const s of solutions) {
    const id = map[s.title];
    assert.ok(id && profiles[id], `${entry.slug}: unmapped ${s.title}`);
    assert.deepEqual(s.access, profiles[id], entry.slug);
    assert.equal(s.access.route.length, 3);
    assert.ok([s.access.when, s.access.caution, ...s.access.route].every(v => v.length >= 10), s.title);
    assert.ok(s.location?.length && s.checkPoint?.length && s.steps.length, s.title);
    titles.add(s.title); actions++;
  }
  records.push({ url: `https://pcfixbase.com/${entry.code ? "errors" : "problems"}/${entry.slug}`, actions: solutions.length, guides: solutions.map(s => map[s.title]) });
}
assert.equal(all.length, 296);
assert.equal(titles.size, 435);
assert.deepEqual([...titles].sort(), Object.keys(map).sort());
const forTitle = text => profiles[map[text]];
assert.match(forTitle("그래픽 드라이버를 단축키로 재시작하기").route.join(" "), /Windows 키\+Ctrl\+Shift\+B/);
assert.match(forTitle("새 탭에서 사이트 첫 화면부터 다시 열기").route[0], /처리 내역/);
assert.match(forTitle("팬 정지 상태에서 부하 시험 중단하기").route[0], /중단/);
assert.doesNotMatch(forTitle("포트·케이블·링크 속도 확인하기").route.join(" "), /Wi-Fi|공유기/);
assert.match(forTitle("직접 설정한 안전 부팅 해제하기").route[0], /msconfig/);
assert.match(forTitle("복구 키 ID에 맞는 48자리 키 찾기").route.join(" "), /48자리/);
const critical = ["stop-battery", "stop-disk", "fan-stop", "hardware", "storage-link", "bitlocker", "certificate", "command", "disk"];
for (const locale of ["en", "ja", "zh-CN"]) {
  const dataset = load(`data/locales/${locale}.ts`);
  const localized = [...dataset.problems, ...dataset.errorCodes];
  assert.equal(localized.length, 296);
  for (const entry of localized) for (const s of entry.code ? entry.solutions : entry.solutions.slice(1)) {
    assert.ok(s.access && !/[가-힣]/.test(JSON.stringify(s.access)), `${locale}: ${entry.slug}`);
  }
  const dictionary = load(`data/locales/${locale}.json`);
  for (const id of critical) assert.ok(dictionary[profiles[id].caution], `${locale}: ${id}`);
  assert.match(dictionary[profiles.certificate.caution], {en:/Do not bypass/,ja:/警告を無視.*しない/,"zh-CN":/请勿绕过/}[locale]);
  assert.match(dictionary[profiles["storage-link"].caution], {en:/shutting down.*and disconnecting AC/i,ja:/終了し、AC電源も外/,"zh-CN":/先关机并断开交流电源/}[locale]);
  assert.match(dictionary[profiles.bitlocker.caution], {en:/TPM or format the drive/,ja:/TPMの初期化やドライブのフォーマット/,"zh-CN":/重置 TPM 或格式化驱动器/}[locale]);
  // Preserve executable names and command switches in all newly added route labels and cautions.
  for (const profile of Object.values(profiles)) for (const source of [...profile.route, profile.caution]) {
    for (const command of source.match(/\b[a-z]+\.(?:msc|exe)\b|\/(?:Online)\b|\b(?:msconfig|optionalfeatures|dxdiag)\b/g) ?? []) {
      assert.ok(dictionary[source]?.includes(command), `${locale}: changed ${command}: ${source}`);
    }
  }
}
const baseline = process.argv.find(v => v.startsWith("--baseline="))?.slice(11);
if (baseline) {
  const before = JSON.parse(fs.readFileSync(baseline, "utf8"));
  assert.deepEqual(all.map(e => e.slug), before.map(e => e.slug), "URL set/order changed");
  for (let i = 0; i < all.length; i++) {
    for (const field of ["title", "seoTitle", "seoDescription", "warning", "symptoms", "description", "beforeSteps", "unresolved", "relatedSlugs", "relatedProblemSlugs"]) {
      assert.deepEqual(all[i][field], before[i][field], `${all[i].slug}: changed ${field}`);
    }
    assert.deepEqual(all[i].solutions.map(s => s.title), before[i].solutions.map(s => s.title), all[i].slug);
    assert.ok(all[i].solutions.flatMap(s => s.steps).length >= before[i].solutions.flatMap(s => s.steps).length, `shortened action count: ${all[i].slug}`);
  }
  console.log("PASS: all prior URLs, titles, search metadata, branch text, warnings and article relationships preserved; action counts not reduced.");
}
const report = process.argv.find(v => v.startsWith("--report="))?.slice(9);
if (report) fs.writeFileSync(report, JSON.stringify({ reviewedAt: "2026-10-27", articles: all.length, localizedPages: 1184, procedureTitles: titles.size, accessProfiles: Object.keys(profiles).length, primaryDiagramTypes: primary.size, actions, records }, null, 2) + "\n");
console.log(`PASS: ${all.length} articles, ${actions} actions, ${titles.size} exact procedure mappings, ${Object.keys(profiles).length} access profiles, ${primary.size} primary diagram types; four-language conditions and critical safety translations.`);
