import { NextRequest, NextResponse } from "next/server";
import { localizePath } from "./lib/localization";
import { languageCookie, visitorLocale } from "./lib/visitorLocale";

export function proxy(request: NextRequest) {
  const country = request.headers.get("cf-ipcountry");
  const preference = request.cookies.get(languageCookie)?.value;
  // Keep local development in Korean unless a country or preference is supplied.
  const locale = visitorLocale(country ?? (process.env.NODE_ENV === "development" ? "KR" : null), preference);
  const response = locale === "ko" ? NextResponse.next() : NextResponse.redirect(new URL(localizePath("/", locale) + request.nextUrl.search, request.url), 307);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Cookie, CF-IPCountry");
  return response;
}

export const config = { matcher: ["/"] };
