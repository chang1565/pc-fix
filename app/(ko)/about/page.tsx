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
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}