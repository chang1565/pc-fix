import { languageAlternates } from "@/lib/localization";
export const metadata = { alternates: languageAlternates("/privacy") };
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
              <h2 className="text-lg font-bold text-slate-950">1. 사이트 이용과 문의</h2>
              <p className="mt-2">PC FIX는 회원가입 없이 이용할 수 있습니다. 문의 이메일을 보내면 회신 주소와 문의 내용을 답변 및 오류 수정에 사용합니다. 비밀번호, 결제 정보, 복구 키 등 민감한 정보는 보내지 마세요. 문의 정보의 삭제 요청은 contact@pcfixbase.com으로 보내주세요.</p>
              <p className="mt-2">페이지 제공과 보안 처리를 위해 서버 및 Cloudflare가 IP 주소, 요청 주소, 브라우저 정보 등을 처리할 수 있습니다. Cloudflare의 국가 정보는 첫 방문의 기본 언어 선택에 사용합니다.</p>
              <a className="text-blue-600 underline" href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare 개인정보처리방침</a>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-950">2. 언어 선택 쿠키</h2>
              <p className="mt-2">언어를 직접 선택하면 pcfix-language 쿠키에 선택한 언어를 최대 1년 동안 저장합니다. 다음 방문에도 같은 언어를 보여주기 위한 기능 쿠키입니다. 브라우저의 사이트 데이터 설정에서 삭제하거나 차단할 수 있습니다. 삭제하면 다음 방문 시 국가 정보 등을 기준으로 기본 언어가 다시 선택됩니다.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-950">3. Google 광고와 외부 쿠키</h2>
              <p className="mt-2">PC FIX에는 Google AdSense 광고 코드가 설치되어 있습니다. 광고 게재 여부는 Google의 심사와 광고 공급 상황에 따라 달라집니다. Google 및 제3자 광고 공급업체는 광고 제공·측정·부정 이용 방지를 위해 쿠키, IP 주소, 브라우저·기기 정보 등을 처리할 수 있습니다.</p>
              <p className="mt-2">Google과 파트너는 이 사이트 또는 다른 웹사이트의 이전 방문 기록에 따라 개인 맞춤 광고를 제공할 수 있습니다. 적용 지역과 동의 선택에 따라 광고 및 정보 처리 방식이 달라집니다. 동의 메시지가 표시되는 경우 동의 여부와 세부 옵션을 선택할 수 있습니다.</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li><a className="text-blue-600 underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google이 파트너 사이트의 정보를 사용하는 방법</a></li>
                <li><a className="text-blue-600 underline" href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer">Google 개인 맞춤 광고 설정 및 해제</a></li>
                <li><a className="text-blue-600 underline" href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">제3자 광고 공급업체의 개인 맞춤 광고 거부</a></li>
              </ul>
              <p className="mt-2">브라우저 설정에서도 쿠키와 사이트 데이터를 삭제하거나 차단할 수 있습니다. 이 경우 언어 저장 등 일부 기능이 달라질 수 있습니다. 쿠키 삭제나 개인 맞춤 광고 해제는 광고 자체를 모두 제거하는 기능은 아닙니다.</p>
            </section>
            <section>
              <h2 className="text-lg font-bold text-slate-950">4. 문의와 방침 변경</h2>
              <p className="mt-2">개인정보와 콘텐츠에 관한 문의는 contact@pcfixbase.com으로 보내주세요. 서비스와 외부 서비스의 변경 사항은 이 페이지에 반영합니다.</p>
            </section>
            <p className="border-t border-slate-100 pt-6 text-xs text-slate-400">시행일: 2026년 10월 6일 · 최종 수정일: 2026년 10월 18일</p>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}