import { staticPageMetadata } from "@/lib/staticPageMetadata";
export const metadata = staticPageMetadata("/privacy");
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
                1. 직접 수집하는 정보
              </h2>

              <p className="mt-2">
                PC FIX는 회원가입·로그인·댓글 기능이 없으며, 이름·전화번호·이메일 주소 같은 개인정보를 입력받지 않습니다.
              </p>

              <p className="mt-2">
                검색창에 입력한 증상·오류 코드는 브라우저 안에서 결과를 찾는 데 사용되고 주소창의 ?q= 값으로 남습니다. PC FIX 서버에 따로 저장하지 않지만, 그 주소로 다시 접속하면 다른 요청 주소와 마찬가지로 아래 접속 기록에 포함될 수 있습니다.
              </p>

              <p className="mt-2">
                문의 이메일을 보내면 답변을 위해 보낸 사람의 이메일 주소와 문의 내용을 받게 되며, 답변과 관련 처리 외의 목적으로 사용하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-950">
                2. 접속 기록
              </h2>

              <p className="mt-2">
                페이지를 전송하고 공격을 막기 위해 PC FIX 서버와 전송·보안 서비스인 Cloudflare가 IP 주소, 브라우저 종류, 요청한 주소, 접속 시각 같은 접속 기록을 처리할 수 있습니다.
              </p>

              <p className="mt-2">
                PC FIX는 별도의 방문 통계 분석 도구를 사용하지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-950">
                3. 언어 선택 쿠키
              </h2>

              <p className="mt-2">
                언어 메뉴에서 언어를 직접 고르면 다음 방문에도 같은 언어를 보여주기 위해 pcfix-language 쿠키에 선택한 언어(ko, en, ja, zh-CN)만 최대 1년 동안 저장합니다.
              </p>

              <p className="mt-2">
                이 쿠키는 브라우저 설정에서 언제든 삭제할 수 있으며, 삭제하면 기본 언어로 표시됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-950">
                4. Google AdSense 광고
              </h2>

              <p className="mt-2">
                PC FIX는 Google AdSense 광고를 게재합니다. Google을 포함한 제3자 광고 업체는 쿠키를 사용해 이용자가 이 사이트나 다른 사이트를 방문한 기록을 바탕으로 광고를 게재하고 광고 성과를 측정할 수 있습니다.
              </p>

              <p className="mt-2">
                Google은 광고 쿠키를 사용해 이용자의 PC FIX 방문 및 다른 웹사이트 방문 기록에 기반한 광고를 제공할 수 있습니다. Google이 이 정보를 어떻게 사용하는지는{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Google 파트너 사이트 정보 사용 방식
                </a>
                에서 확인할 수 있습니다.
              </p>

              <p className="mt-2">
                맞춤 광고는{" "}
                <a
                  href="https://myadcenter.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Google 내 광고 센터
                </a>
                에서 끌 수 있고, 제3자 업체의 맞춤 광고 쿠키는{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline"
                >
                  aboutads.info
                </a>
                에서 거부할 수 있습니다. 맞춤 광고를 끄더라도 맞춤이 아닌 광고는 표시될 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-950">
                5. 문의
              </h2>

              <p className="mt-2">
                개인정보 처리에 관한 문의는 문의 페이지의 이메일로 보내 주세요.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-950">
                6. 방침 변경
              </h2>

              <p className="mt-2">
                사용하는 서비스나 기능이 바뀌면 이 방침을 고치고 아래 시행일을 갱신합니다.
              </p>
            </section>

            <p className="border-t border-slate-100 pt-6 text-xs text-slate-400">
              시행일: 2026년 11월 14일 (이전 방침 시행일: 2026년 10월 6일)
            </p>
          </div>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
