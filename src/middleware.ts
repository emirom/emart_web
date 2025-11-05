import { NextRequest, NextResponse } from "next/server";
import nextIntlMiddleware from "./lib/i18n/middleware";

export function middleware(request: NextRequest) {
  const response = nextIntlMiddleware(request);

  const token = request.cookies.get("access_token")?.value;

  const isProtected = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtected && !token) {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
