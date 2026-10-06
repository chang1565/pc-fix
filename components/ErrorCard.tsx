import Link from "next/link";
import type { ErrorCodeEntry } from "@/data/errorCodes";

export default function ErrorCard({ entry }: { entry: ErrorCodeEntry }) {
  return <Link href={`/errors/${entry.slug}`} className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md">
    <span className="text-xs font-bold text-blue-600">오류 코드 · {entry.category}</span>
    <h3 className="mt-3 break-words text-lg font-bold text-slate-950">{entry.title}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-600">{entry.description}</p>
    <p className="mt-5 text-sm font-semibold text-blue-600">해결 방법 보기 →</p>
  </Link>;
}
