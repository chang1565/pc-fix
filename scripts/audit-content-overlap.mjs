// 실행: node scripts/audit-content-overlap.mjs. 유사도는 심사 결과나 삭제 판정이 아닙니다.
import fs from 'node:fs';
import { load } from './check-errors.mjs';
const { problems } = load('data/problems.ts');
const groups = new Map();
for (const problem of problems) {
  const key = JSON.stringify(problem.solutions.slice(1).map(s => s.steps));
  const group = groups.get(key) ?? [];
  group.push(problem.slug);
  groups.set(key, group);
}
const repeated = [...groups.values()].filter(g => g.length > 1).sort((a,b) => b.length-a.length);
const rows = repeated.map((g,i) => `| ${i+1} | ${g.length} | ${g.join(', ')} |`);
fs.writeFileSync('docs/content-overlap-2026-10-28.md', `# PC FIX 절차 중복 점검 — 2026-10-28\n\n증상 ${problems.length}개 중 첫 진단을 제외한 추가 절차의 실행 문장과 순서가 같은 그룹 ${repeated.length}개, 해당 문서 ${repeated.reduce((n,g)=>n+g.length,0)}개.\n\n전체 본문의 중복 판정이 아니다. 첫 진단·제목·증상·출처·FAQ가 다를 수 있다. 자동 삭제·리다이렉트·noindex 대상 목록으로 사용하지 않는다.\n\n| 그룹 | 문서 수 | URL slug |\n| --- | --- | --- |\n${rows.join('\n')}\n\n## 편집 결정\n\n- 대표 10개 문서·4개 언어에 독립적인 비교 진단·결과 해석·중단·기록 기준 추가.\n- 기존 증상별 첫 진단은 보존. 정확히 다른 증상을 찾은 사용자의 진입 경로를 일괄 삭제하지 않음.\n- 통합 전에는 제목의 검색 의도와 첫 분기까지 사람이 비교해야 한다. 동일 의도가 확인된 문서만 리다이렉트와 내부 링크를 함께 수정한다.\n- 대표 글의 실제 고장 재현, 화면 증거, 외국어 원어민 감수와 전체 통합 판단은 아직 미완료.\n`);
console.log(`Overlap audit: ${repeated.length} groups / ${repeated.reduce((n,g)=>n+g.length,0)} articles. Report saved.`);
