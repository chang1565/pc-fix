'use client';

import { useState } from 'react';

export default function DiagnosticNotes({ title }: { title: string }) {
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(`${title}\n${notes}`);
      setStatus('점검 기록을 복사했습니다.');
    } catch {
      setStatus('자동 복사가 안 됩니다. 입력한 내용을 선택해 직접 복사하세요.');
    }
  }
  return <details className="diagnostic-notes">
    <summary><span>내 점검 기록</span><span className="text-sm font-normal">조치 전후를 기록해 두세요</span></summary>
    <div className="notes-body">
      <p id="notes-help">장치 모델·Windows 버전, 실패한 단계, 바꾼 설정, 조치 전후 결과를 적으세요. 암호와 복구 키는 적지 마세요. 이 기록은 서버로 전송하거나 저장하지 않으며 새로고침하면 사라집니다.</p>
      <label htmlFor="diagnostic-notes" className="mt-4 block font-semibold">점검 내용</label>
      <textarea id="diagnostic-notes" aria-describedby="notes-help" rows={6} value={notes} onChange={event => { setNotes(event.target.value); setStatus(''); }} placeholder="예: 다른 기기는 정상 / 이 PC만 실패 / VPN 종료 후 접속됨" />
      <div className="mt-3 flex flex-wrap gap-3"><button type="button" disabled={!notes.trim()} onClick={copy} className="notes-copy">기록 복사</button><button type="button" disabled={!notes} onClick={() => {setNotes(''); setStatus('기록을 지웠습니다.');}} className="notes-clear">기록 지우기</button></div>
      <p role="status" className="mt-3 text-sm">{status}</p>
    </div>
  </details>;
}
