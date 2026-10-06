import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader />

      <article className="mx-auto max-w-3xl px-5 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-10">
          <h1 className="text-3xl font-black text-slate-950">
            문의
          </h1>

          <p className="mt-6 leading-7 text-slate-600">
            PC FIX의 내용 오류, 수정 요청, 제휴 및 기타 문의를 위한
            페이지입니다.
          </p>

          <div className="mt-8 rounded-xl bg-slate-50 p-5">
            <h2 className="font-bold text-slate-950">
              문의 방법
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              서비스 공개 전 공식 문의 이메일 주소를 추가할 예정입니다.
            </p>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}