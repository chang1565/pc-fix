import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
      <div className="text-center">
        <div className="text-7xl font-black text-slate-200">
          404
        </div>

        <h1 className="mt-5 text-3xl font-black text-slate-950">
          페이지를 찾을 수 없습니다
        </h1>

        <p className="mt-3 text-slate-500">
          주소가 변경되었거나 존재하지 않는 페이지입니다.
        </p>

        <Link
          href="/"
          className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
        >
          PC FIX 홈으로
        </Link>
      </div>
    </main>
  );
}