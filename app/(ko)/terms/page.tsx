import { staticPageMetadata } from "@/lib/staticPageMetadata";
export const metadata = staticPageMetadata("/terms");
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-surface">
      <SiteHeader />

      <article className="mx-auto max-w-[720px] px-5 pb-16 pt-10 sm:pt-14">
        <div>
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
            이용약관
          </h1>

          <div className="mt-8 space-y-9 leading-8 text-[#3d444c]">
            <section>
              <h2 className="text-xl font-bold text-ink">
                1. 서비스 목적
              </h2>

              <p className="mt-2">
                PC FIX는 컴퓨터 및 관련 장치의 문제 해결에 도움이 되는
                일반적인 정보를 제공하는 것을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">
                2. 정보 이용
              </h2>

              <p className="mt-2">
                사이트에서 제공하는 정보는 참고 목적으로 제공되며,
                사용자의 컴퓨터 환경에 따라 결과가 달라질 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">
                3. 데이터 및 장비 보호
              </h2>

              <p className="mt-2">
                시스템 설정 변경, 저장장치 작업, 부품 분리 등의 작업을
                진행하기 전에 중요한 데이터를 백업하는 것을 권장합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">
                4. 전문적인 점검
              </h2>

              <p className="mt-2">
                전원 공급 장치, 배터리, 손상된 부품 등 안전과 관련될 수 있는
                문제는 직접 작업하기보다 전문가의 점검을 권장합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">
                5. 광고와 외부 링크
              </h2>

              <p className="mt-2">
                PC FIX에는 Google AdSense 광고가 표시됩니다. 광고와 외부 사이트 링크의 내용은 해당 광고주와 사이트가 책임지며, PC FIX가 보증하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">
                6. 책임의 한계
              </h2>

              <p className="mt-2">
                안내는 고장 원인을 확정하는 진단이 아니라 원인 후보와 확인 순서를 정리한 것입니다. 안내를 따라 한 작업으로 생긴 데이터 손실이나 장비 손상에 대해 PC FIX는 고의나 중대한 과실이 없는 한 책임을 지지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">
                7. 저작권
              </h2>

              <p className="mt-2">
                사이트의 글과 구성은 PC FIX에 저작권이 있습니다. 출처를 밝힌 짧은 인용은 자유롭게 할 수 있지만, 전체를 복제해 다른 곳에 게시하려면 문의 페이지의 이메일로 먼저 허락을 받아 주세요.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-ink">
                8. 약관 변경
              </h2>

              <p className="mt-2">
                약관을 바꾸면 이 페이지에 바뀐 내용을 싣고 아래 시행일을 갱신합니다.
              </p>
            </section>

            <p className="border-t border-line pt-6 text-xs text-muted">
              시행일: 2026년 11월 14일 (이전 약관 시행일: 2026년 10월 6일)
            </p>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
