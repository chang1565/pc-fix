import { NextRequest, NextResponse } from "next/server";
import { languageCookie, visitorLocale } from "@/lib/visitorLocale";

export function GET(request: NextRequest) {
  const country = request.headers.get("cf-ipcountry");
  return NextResponse.json({ country, locale: visitorLocale(country, request.cookies.get(languageCookie)?.value) }, { headers: { "Cache-Control": "private, no-store" } });
}
