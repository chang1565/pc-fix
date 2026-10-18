// 개별 분기 누락과 위험 상태에서 공통 점검으로 넘어가는 경로를 검사합니다.
import assert from "node:assert/strict";
import fs from "node:fs";
import { load } from "./check-errors.mjs";

const { problems } = load("data/problems.ts");
const { errorCodes } = load("data/errorCodes.ts");
const symptomBranches = JSON.parse(fs.readFileSync(new URL("../data/problemDiagnostics.json", import.meta.url), "utf8"));
const errorBranches = JSON.parse(fs.readFileSync(new URL("../data/errorDiagnostics.json", import.meta.url), "utf8"));
const procedures = load("data/procedureReview.json");
const errorProcedures = load("data/errorProcedureReview.json");
assert.equal(Object.keys(procedures).length, 198);
assert.deepEqual(Object.keys(errorProcedures).sort(), errorCodes.map(e => e.code).sort());
assert.deepEqual(Object.keys(symptomBranches).sort(), problems.map(p => p.slug).sort());
assert.deepEqual(Object.keys(errorBranches).sort(), errorCodes.map(p => p.code).sort());
assert.equal(new Set(Object.values(symptomBranches).map(v => JSON.stringify(v))).size, 217);
assert.equal(new Set(Object.values(errorBranches).map(v => JSON.stringify(v))).size, 80);

for (const page of [...problems, ...errorCodes]) {
  assert.deepEqual(page.solutions.map(s => s.order), page.solutions.map((_, i) => i + 1), page.slug);
  assert.ok(page.solutions.every(s => s.steps.length && s.steps.every(v => v.trim())), page.slug);
  assert.ok(page.solutions.every(s => s.checkPoint?.trim()), `missing result: ${page.slug}`);
  const actions = page.solutions.flatMap(s => s.steps);
  assert.equal(new Set(actions).size, actions.length, `repeated action: ${page.slug}`);
  assert.ok(page.sources?.length, `missing references: ${page.slug}`);
  for (const source of page.sources) {
    const url = new URL(source.url);
    assert.equal(url.protocol, "https:");
    assert.ok(/^(support\.microsoft\.com|learn\.microsoft\.com|www\.microsoft\.com|support\.google\.com|www\.dell\.com|dl\.dell\.com|www\.seagate\.com)$/.test(url.hostname), source.url);
  }
}
for (const problem of problems) {
  assert.deepEqual(problem.solutions[0].steps, symptomBranches[problem.slug], problem.slug);
  assert.ok(problem.solutions[0].steps.length === 3);
  for (const solution of problem.solutions.slice(1)) {
    const reviewed = procedures[solution.title];
    assert.ok(reviewed, `unreviewed procedure: ${solution.title}`);
    assert.equal(solution.location, reviewed.location, problem.slug);
    assert.ok(solution.steps.every(action => reviewed.steps.includes(action)), problem.slug);
    assert.equal(solution.checkPoint, reviewed.checkPoint, problem.slug);
  }
}
assert.deepEqual(Object.keys(procedures).sort(), [...new Set(problems.flatMap(p => p.solutions.slice(1).map(s => s.title)))].sort());
for (const error of errorCodes) {
  assert.equal(error.solutions.length, 2, error.code);
  assert.equal(error.beforeSteps, errorBranches[error.code][0], error.code);
  assert.equal(error.unresolved, errorBranches[error.code][1], error.code);
  assert.ok(error.solutions.every(s => s.location?.length > 10), `missing location: ${error.code}`);
  assert.equal(error.solutions[0].checkPoint, errorProcedures[error.code].firstResult);
  assert.equal(error.solutions[0].title, errorProcedures[error.code].firstTitle);
  assert.equal(error.solutions[1].title, errorProcedures[error.code].secondTitle);
  assert.ok(error.solutions.every(s => !/첫 번째 조치|해결되지 않았을 때의 조치/.test(s.title)), error.code);
}
assert.match(procedures["USB 전원 절약 설정 확인하기"].checkPoint, /허브/);
assert.match(procedures["케이블·전원·GPU 장착 상태 확인하기"].checkPoint, /GPU/);
assert.ok(!procedures["유선 연결로 먼저 테스트하기"].checkPoint.includes("회선"));
assert.match(procedures["IP·DNS 상태 초기화하기"].steps.join(" "), /고정 IP·조직망/);
assert.match(procedures["클린 부팅 또는 새 사용자 계정으로 비교하기"].steps.join(" "), /Microsoft 서비스 숨기기/);
// 고장 디스크 반복 검사와 복구 키 없는 일반 부팅 복구 경로를 노출하지 않습니다.
assert.equal(problems.find(p => p.slug === "hdd-clicking").solutions.length, 1);
assert.equal(problems.find(p => p.slug === "bitlocker-recovery-screen").solutions.length, 1);
assert.match(symptomBranches["disk-unallocated"][2], /쓰기를 멈추세요/);
assert.match(symptomBranches["battery-swollen"].join(" "), /사용을 중단/);
assert.match(errorBranches["NET::ERR_CERT_AUTHORITY_INVALID"][1], /임의 루트 인증서를 설치하지/);

for (const locale of ["en", "ja", "zh-CN"]) {
  const localized = load(`data/locales/${locale}.ts`);
  for (const page of [...localized.problems, ...localized.errorCodes]) {
    if (page.beforeSteps) assert.ok(!/[가-힣]/.test(page.beforeSteps + page.unresolved), `${locale}: untranslated branches ${page.slug}`);
    const prose = page.solutions.map(s => [s.title, s.reason, s.location, s.steps, s.checkPoint, s.time]);
    // difficulty는 기존 UI에서 번역하므로 데이터의 한국어 식별값은 제외합니다.
    assert.ok(!/[가-힣]/.test(JSON.stringify(prose)), `${locale}: untranslated ${page.slug}`);
  }
  const dictionary = load(`data/locales/${locale}.json`);
  for (const branches of Object.values(symptomBranches)) {
    for (const source of branches) {
      for (const command of source.match(/powercfg \/(?:lastwake|waketimers|a)/g) ?? []) {
        assert.ok(dictionary[source].includes(command), `${locale}: changed ${command}`);
      }
    }
  }
  if (locale === "ja") {
    assert.match(dictionary[symptomBranches["battery-swollen"][1]], /可燃物から離れ/);
    assert.ok(!dictionary[symptomBranches["battery-swollen"][1]].includes("落と"));
  }
}
console.log("PASS: 297 distinct diagnostic paths, ordered nonempty actions, failure outcomes, protected stop paths and 4-language solution coverage.");
