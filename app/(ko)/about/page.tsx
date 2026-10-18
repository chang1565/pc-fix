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
              중요한 데이터가 있는 경우 먼저 백업하고,
              물리적인 고장이 의심되는 경우 전문적인 점검을 받는 것을
              권장합니다.
            </p>
            <section>
              <h2 className="text-lg font-bold text-slate-950">작성·검토 방식</h2>
              <p className="mt-2">PC FIX 운영자가 증상별 확인 순서, 결과에 따른 다음 조치, 중단해야 할 조건을 정리합니다. 제조사와 Microsoft·Google 등의 공식 문서를 참고하며, 상세 페이지에서 관련 자료를 확인할 수 있습니다. 공통 점검은 해당 증상의 분기로 원인을 좁힌 뒤 필요한 경우에만 진행합니다.</p>
              <p className="mt-2">가이드는 모든 기기에서 직접 재현한 수리 기록이 아닙니다. 내용 검토일은 안내를 수정·검토한 날짜이며 모든 환경의 실험 완료를 뜻하지 않습니다. 메뉴 이름은 Windows 버전과 제조사에 따라 다를 수 있습니다.</p>
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