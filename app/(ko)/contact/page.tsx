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
        <div>
          <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">
            문의
          </h1>

          <p className="mt-6 leading-7 text-muted">
            PC FIX의 내용 오류, 수정 요청, 제휴 및 기타 문의를 위한
            페이지입니다.
          </p>

          <div className="mt-8 rounded-xl bg-paper p-5 sm:p-6">
            <h2 className="font-bold text-ink">
              문의 방법
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              문의 사항은 아래 이메일 주소로 보내주세요.
            </p>

            <div className="mt-3"><ContactEmail /></div>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
