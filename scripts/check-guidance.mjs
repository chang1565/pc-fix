// 개별 분기 누락과 위험 상태에서 공통 점검으로 넘어가는 경로를 검사합니다.
import assert from "node:assert/strict";
import fs from "node:fs";
import { load } from "./check-errors.mjs";

const { problems } = load("data/problems.ts");
const { errorCodes } = load("data/errorCodes.ts");
const symptomBranches = JSON.parse(fs.readFileSync(new URL("../data/problemDiagnostics.json", import.meta.url), "utf8"));
const errorBranches = JSON.parse(fs.readFileSync(new URL("../data/errorDiagnostics.json", import.meta.url), "utf8"));
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
}
for (const error of errorCodes) {
  assert.equal(error.solutions.length, 4, error.code);
  assert.ok(error.solutions[0].steps.includes(errorBranches[error.code][0]), error.code);
  assert.ok(error.solutions.at(-1).steps.includes(errorBranches[error.code][1]), error.code);
}
// 고장 디스크 반복 검사와 복구 키 없는 일반 부팅 복구 경로를 노출하지 않습니다.
assert.equal(problems.find(p => p.slug === "hdd-clicking").solutions.length, 1);
assert.equal(problems.find(p => p.slug === "bitlocker-recovery-screen").solutions.length, 1);
assert.match(symptomBranches["disk-unallocated"][2], /쓰기를 멈추세요/);
assert.match(symptomBranches["battery-swollen"].join(" "), /사용을 중단/);
assert.match(errorBranches["NET::ERR_CERT_AUTHORITY_INVALID"][1], /임의 루트 인증서를 설치하지/);

for (const locale of ["en", "ja", "zh-CN"]) {
  const localized = load(`data/locales/${locale}.ts`);
  for (const page of [...localized.problems, ...localized.errorCodes]) {
    const prose = page.solutions.map(s => [s.title, s.reason, s.steps, s.checkPoint, s.time]);
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
