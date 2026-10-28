import { languageAlternates } from "@/lib/localization";
export const metadata = { alternates: languageAlternates("/about") };
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader />

      <article className="mx-auto max-w-3xl px-5 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-10">
          <h1 className="text-3xl font-black text-slate-950">
            PC FIX 소개
          </h1>

          <div className="mt-6 space-y-6 text-sm leading-7 text-slate-600 sm:text-base">
            <h2 className="text-xl font-bold text-slate-950">작성·검증 기준</h2>
            <p>PC FIX는 공식 지원 문서와 증상별 확인 절차를 바탕으로 안내를 편집합니다. 개발과 초안 작성에 AI를 활용하며, 코드 검사 통과를 실제 기기에서의 수리 성공으로 표시하지 않습니다. 모든 고장을 직접 재현한 자료는 아닙니다.</p>
            <p>가이드에는 적용 조건, 비교할 결과, 다음 행동, 중단 기준을 구분합니다. 공통 점검은 해당 증상의 분기로 원인을 좁힌 뒤 필요한 경우에만 진행합니다. 공식 문서는 절차의 근거이며 특정 PC의 고장 원인을 확정하는 증거는 아닙니다. 개정일은 본문을 바꾼 날짜이고 실물 시험일이 아닙니다.</p>
            <p>실제 재현 자료를 게시할 때는 장치 모델·Windows 빌드·재현 조건·변경 전후 결과를 함께 공개합니다. 설명용 도식과 실제 화면은 구분합니다. 현재 대표 가이드의 비교 진단에는 실물 재현 기록이 포함되지 않았습니다.</p>
            <p>잘못된 안내는 <a href="/contact" className="text-blue-700 underline">문의 페이지</a>로 알려주세요. 문서 주소, Windows 버전, 실패한 단계와 오류 문구를 보내면 확인에 도움이 됩니다. 암호·복구 키·개인 파일은 보내지 마세요.</p>
            <h2 className="text-xl font-bold text-slate-950">서비스 안내</h2>
            <p>
              PC FIX는 컴퓨터 사용 중 발생하는 다양한 문제를
              누구나 쉽게 해결할 수 있도록 돕기 위해 만들어진
              문제 해결 가이드입니다.
            </p>

            <p>
              컴퓨터 문제를 검색하려고 하면 전문적인 용어나
              복잡한 설명부터 접하게 되는 경우가 많습니다.
              PC FIX는 사용자가 실제로 경험하는 증상을 기준으로
              문제를 찾을 수 있도록 구성하고 있습니다.
            </p>

            <p>
              해결 방법은 가능한 경우 가장 쉽고 비용이 적게 드는
              방법부터 시작해 점차 고급 단계로 진행하도록 정리합니다.
            </p>

            <p>
              모든 컴퓨터 환경은 다를 수 있으므로 안내된 방법이
              모든 상황에서 동일한 결과를 보장하지는 않습니다.
              안전하게 작동하고 파일을 읽을 수 있을 때 중요한 데이터를 백업하세요.
              연기·배터리 팽창·저장장치 이상음이 있으면 사용을 중단하고
              전문 점검이나 데이터 복구를 상담하세요.
            </p>
            <section>
              <h2 className="text-lg font-bold text-slate-950">언어와 적용 환경</h2>
              <p className="mt-2">메뉴 이름과 지원 기능은 Windows 버전·장치·조직 정책에 따라 다를 수 있습니다. 실제 화면과 다른 절차는 장치 제조사의 안내를 먼저 확인하세요.</p>
              <p className="mt-2">영어·일본어·중국어 안내에는 자동 번역을 사용하며 기술 용어와 안전 문구를 점검합니다. 원문의 의미가 불명확하거나 실제 화면과 다르면 작업을 멈추고 공식 문서를 확인하세요.</p>
              <a href="/contact" className="mt-2 inline-block text-blue-600 underline">내용 오류·수정 요청 보내기</a>
            </section>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
