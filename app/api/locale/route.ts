import { NextRequest, NextResponse } from "next/server";
import { languageCookie, visitorLocale } from "@/lib/visitorLocale";

export function GET(request: NextRequest) {
  // 로컬 개발에서는 국가 정보가 없으므로 한국어로 본다.
  const country = request.headers.get("cf-ipcountry") ?? (process.env.NODE_ENV === "development" ? "KR" : null);
  return NextResponse.json({ country, locale: visitorLocale(country, request.cookies.get(languageCookie)?.value) }, { headers: { "Cache-Control": "private, no-store" } });
}
