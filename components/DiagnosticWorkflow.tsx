import Link from 'next/link';
import { diagnosticWorkflows } from '@/data/diagnosticWorkflows';

export default function DiagnosticWorkflow({ slug }: { slug: string }) {
  const guide = diagnosticWorkflows[slug];
  if (!guide) return null;
  return <section aria-labelledby="comparison-heading" className="comparison-guide">
    <h2 id="comparison-heading" className="text-xl font-black text-slate-950">설정을 바꾸기 전, 원인 범위 좁히기</h2>
    <p className="mt-3 text-sm leading-7 text-slate-600">적용 범위: {guide.scope}</p>
    <p className="mt-3 leading-7 text-slate-800">{guide.compare}</p>
    <ol className="comparison-branches">{guide.branches.map(([result, action]) => <li key={result} className="min-w-0">
      <h3 className="font-bold text-slate-950">{result}</h3><p className="mt-2 leading-7 text-slate-700">{action}</p>
    </li>)}</ol>
    <div className="comparison-outcomes">
      <p><strong>해결 확인: </strong>{guide.verify}</p>
      <p><strong>여기서는 중단: </strong>{guide.stop}</p>
      <p><strong>문의 전에 기록: </strong>{guide.record}</p>
    </div>
    <p className="mt-5 border-t border-slate-200 pt-4 text-xs leading-6 text-slate-500">PC FIX 편집 · 2026-10-28 개정. 문서 기반 비교 진단 안내이며 실제 고장 재현·수리 성공 기록이 아닙니다. 아래 공식 참고 자료와 적용 조건을 함께 확인하세요. <Link href="/about" className="underline">작성·검증 기준</Link></p>
  </section>;
}
