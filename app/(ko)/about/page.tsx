import { staticPageMetadata } from "@/lib/staticPageMetadata";
export const metadata = staticPageMetadata("/about");
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import ContactEmail from "@/components/ContactEmail";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface">
      <SiteHeader />

      <article className="mx-auto max-w-[720px] px-5 pb-16 pt-10 sm:pt-14">
        <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">PC FIX 소개</h1>

        <div className="mt-6 space-y-6 leading-8 text-[#3d444c]">
          <p>PC FIX는 화면에 보이는 증상이나 오류 코드로 컴퓨터 문제의 원인 후보와 확인 순서를 찾는 사이트입니다. 전원, 부팅, Windows, 화면, 저장장치, 네트워크, 주변기기처럼 증상이 나타나는 곳별로 글을 나눠 두었습니다.</p>

          <h2 className="pt-2 text-xl font-extrabold text-ink">글을 만드는 방식</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>제목은 이용자가 실제로 검색하는 증상 문장이나 오류 문구를 그대로 씁니다.</li>
            <li>해결 단계는 비용과 위험이 적은 확인부터 적고, 되돌리기 어렵거나 부품을 다루는 작업은 고급 단계로 따로 표시합니다.</li>
            <li>각 단계에는 무엇을 확인하면 되는지와 결과에 따라 다음에 할 일을 적습니다.</li>
            <li>명령어, 설정 위치, 오류 코드의 의미는 Microsoft와 제조사의 공식 문서를 근거로 하고, 근거로 쓴 문서는 글 아래 참고 자료에 링크합니다.</li>
            <li>직접 다시 검토한 글에는 검토일을 표시합니다.</li>
          </ul>

          <h2 className="pt-2 text-xl font-extrabold text-ink">이 안내의 한계</h2>
          <p>안내는 원인 후보와 확인 순서를 정리한 것이며 고장 원인을 확정하는 진단이 아닙니다. 컴퓨터 구성과 Windows 버전에 따라 메뉴 이름이나 결과가 다를 수 있습니다. 중요한 데이터가 있으면 먼저 백업하고, 부풀어 오른 배터리나 타는 냄새처럼 안전과 관련된 증상은 직접 작업하지 말고 점검을 맡기세요.</p>
          <p>영어·일본어·중국어 페이지는 한국어 원문을 번역 도구로 옮긴 것입니다. 명령어와 오류 코드는 원문과 같은지 자동으로 검사하지만, 문장은 원어민 감수를 거치지 않았습니다.</p>

          <h2 className="pt-2 text-xl font-extrabold text-ink">운영과 광고</h2>
          <p>PC FIX는 개인이 운영하며, 운영비를 위해 Google AdSense 광고를 게재합니다. 광고는 &quot;광고&quot; 표시가 붙은 자리에만 나오고, 광고 여부가 해결 단계의 순서나 내용에 영향을 주지 않습니다.</p>

          <h2 className="pt-2 text-xl font-extrabold text-ink">틀린 내용 알리기</h2>
          <p>안내대로 했는데 화면이 다르거나 내용이 틀렸다면 <ContactEmail />로 알려 주세요. 확인한 내용은 글에 반영하고 검토일을 갱신합니다.</p>
        </div>
      </article>

      <SiteFooter />
    </main>
  );
}
