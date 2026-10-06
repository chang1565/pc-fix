import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader />

      <article className="mx-auto max-w-3xl px-5 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-10">
          <h1 className="text-3xl font-black text-slate-950">
            개인정보처리방침
          </h1>

          <div className="mt-8 space-y-7 text-sm leading-7 text-slate-600">
            <section>
              <h2 className="text-lg font-bold text-slate-950">
                1. 개인정보 처리
              </h2>

              <p className="mt-2">
                PC FIX는 현재 회원가입 기능을 제공하지 않으며,
                사용자의 이름, 전화번호 등의 개인정보를 직접 수집하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-950">
                2. 쿠키 및 외부 서비스
              </h2>

              <p className="mt-2">
                향후 서비스 개선, 방문 통계 분석 및 광고 제공을 위해
                쿠키 또는 외부 서비스가 사용될 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-950">
                3. 광고
              </h2>

              <p className="mt-2">
                PC FIX는 향후 Google AdSense 등 외부 광고 서비스를
                사용할 수 있으며, 해당 서비스에서 광고 제공 및 측정을 위해
                쿠키를 사용할 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-950">
                4. 방침 변경
              </h2>

              <p className="mt-2">
                서비스 기능 변경에 따라 본 개인정보처리방침의 내용이
                변경될 수 있습니다.
              </p>
            </section>

            <p className="border-t border-slate-100 pt-6 text-xs text-slate-400">
              시행일: 2026년 10월 6일
            </p>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}