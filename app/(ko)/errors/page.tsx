import type { Metadata } from "next";
import Link from "next/link";
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
  return <main className="min-h-screen bg-slate-50 text-slate-900"><SiteHeader />
    <div className="mx-auto max-w-6xl px-5 py-12"><h1 className="text-3xl font-black sm:text-4xl">오류 코드 목록</h1>
      <p className="mt-4 max-w-3xl leading-7 text-slate-600">카테고리별 오류를 둘러보세요. 증상과 오류 코드 검색은 메인 검색창에서 한 번에 할 수 있습니다.</p>
      <Link href="/" className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-bold text-white">통합 검색으로 찾기 →</Link><ErrorBrowser /></div><SiteFooter /></main>;
}
