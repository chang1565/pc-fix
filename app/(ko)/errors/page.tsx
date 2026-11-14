import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ErrorBrowser from "@/components/ErrorBrowser";
import { languageAlternates } from "@/lib/localization";

export const metadata: Metadata = {
  title: "PC·Windows 오류 코드 검색과 해결 방법 | PC FIX",
  description: "블루스크린, Windows Update, 장치 관리자, 그래픽·게임, 브라우저와 DLL 오류의 의미와 단계별 해결 방법을 찾아보세요.",
  alternates: languageAlternates("/errors"),
};
export default function ErrorsPage() {
  return <main className="min-h-screen bg-surface text-ink"><SiteHeader />
    <div className="mx-auto max-w-5xl px-5 py-10"><h1 className="text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">오류 코드 목록</h1>
      <p className="mt-3 max-w-2xl leading-7 text-muted">카테고리별 오류를 둘러보세요. 증상과 오류 코드 검색은 메인 검색창에서 한 번에 할 수 있습니다.</p>
      <ErrorBrowser /></div><SiteFooter /></main>;
}
