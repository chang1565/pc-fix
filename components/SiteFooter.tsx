import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <div className="font-black text-slate-950">PC FIX</div>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              컴퓨터에서 발생하는 다양한 문제의 원인과 해결 방법을
              누구나 쉽게 확인할 수 있도록 정리합니다.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-500 sm:justify-end">
            <Link href="/about" className="hover:text-slate-950">
              서비스 소개
            </Link>

            <Link href="/contact" className="hover:text-slate-950">
              문의
            </Link>

            <Link href="/privacy" className="hover:text-slate-950">
              개인정보처리방침
            </Link>

            <Link href="/terms" className="hover:text-slate-950">
              이용약관
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6 text-xs leading-5 text-slate-400">
          <p>
            PC FIX의 정보는 일반적인 문제 해결을 위한 참고 자료입니다.
            중요한 데이터가 저장된 장치나 전기적·물리적 고장이 의심되는
            경우 전문가의 점검을 권장합니다.
          </p>

          <p className="mt-3">
            © {new Date().getFullYear()} PC FIX
          </p>
        </div>
      </div>
    </footer>
  );
}