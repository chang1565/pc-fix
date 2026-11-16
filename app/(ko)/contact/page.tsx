import { staticPageMetadata } from "@/lib/staticPageMetadata";
export const metadata = staticPageMetadata("/contact");
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ContactEmail from "@/components/ContactEmail";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-surface">
      <SiteHeader />

      <article className="mx-auto max-w-[720px] px-5 pb-16 pt-10 sm:pt-14">
        <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">문의</h1>

        <p className="mt-6 leading-7 text-muted">글의 틀린 내용, 수정 요청, 개인정보 관련 요청, 제휴 문의를 받습니다.</p>

        <div className="mt-8 rounded-xl bg-paper p-5 sm:p-6">
          <h2 className="font-bold text-ink">이메일</h2>
          <div className="mt-3"><ContactEmail /></div>
        </div>

        <div className="mt-8 space-y-4 leading-7 text-[#3d444c]">
          <h2 className="text-xl font-extrabold text-ink">수정 요청을 보낼 때</h2>
          <p>아래 내용을 함께 적어 주시면 확인이 빠릅니다.</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>문제가 있는 페이지 주소</li>
            <li>몇 단계에서 무엇이 달랐는지(메뉴 이름, 화면에 나온 문구)</li>
            <li>Windows 버전과 컴퓨터 제조사·모델</li>
          </ul>
          <p>이름, 전화번호, 계정 정보, 제품 인증 키는 보내지 마세요. 문제 확인에 필요하지 않습니다.</p>

          <h2 className="pt-2 text-xl font-extrabold text-ink">개별 고장 상담은 하지 않습니다</h2>
          <p>PC FIX는 공개된 안내 글을 고치는 데 문의를 사용합니다. 특정 컴퓨터의 고장을 원격으로 진단하거나 수리를 대신하지 않으니, 안내대로 해도 해결되지 않으면 제조사 고객 지원이나 가까운 수리점에 점검을 맡기세요.</p>

          <p>개인정보 열람·삭제 요청은 10일 안에 처리 결과를 알려 드립니다. 자세한 내용은 개인정보처리방침을 확인하세요.</p>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
