import { DEFAULT_LOCALE, isLocaleStringValid } from "@lib/configs/i18n";
import { NextRequest, NextResponse } from "next/server";

export function resolveLocale(req: NextRequest): string {
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isLocaleStringValid(cookieLocale)) return cookieLocale;
  return DEFAULT_LOCALE;
}

export function rewrite(
  req: NextRequest,
  internalPathname: string,
  locale: string,
) {
  const url = req.nextUrl.clone();
  url.pathname = internalPathname;
  const headers = new Headers(req.headers);
  headers.set("x-locale", locale);
  return NextResponse.rewrite(url, { request: { headers } });
}

export function redirect(req: NextRequest, to: string) {
  const url = req.nextUrl.clone();
  url.pathname = to;
  return NextResponse.redirect(url);
}
