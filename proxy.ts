import { NextRequest, NextResponse } from "next/server";
import { localizePath, locales, type Locale } from "./lib/localization";
import { languageCookie } from "./lib/visitorLocale";

export function proxy(request: NextRequest) {
  if (request.headers.get("cf-visitor")?.match(/"scheme"\s*:\s*"http"/)) {
    const url = request.nextUrl.clone();
    url.protocol = "https:"; url.host = "pcfixbase.com"; url.port = "";
    return NextResponse.redirect(url, 308);
  }
  if (request.nextUrl.pathname !== "/") return NextResponse.next();
  // 기본 주소는 접속 국가와 관계없이 한국어 홈(x-default)을 보여준다.
  // 언어 메뉴에서 직접 고른 언어가 있을 때만 그 언어 홈으로 보낸다. 해외 방문자에게는 LanguageSuggestion이 언어 안내만 띄운다.
  const preference = request.cookies.get(languageCookie)?.value;
  const chosen = locales.includes(preference as Locale) ? (preference as Locale) : "ko";
  const response = chosen === "ko" ? NextResponse.next() : NextResponse.redirect(new URL(localizePath("/", chosen) + request.nextUrl.search, request.url), 307);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Cookie");
  return response;
}

export const config = { matcher: ["/:path*"] };
