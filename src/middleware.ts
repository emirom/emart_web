import { NextRequest } from "next/server";
import nextIntlMiddleware from "./lib/i18n/middleware";

export function middleware(request: NextRequest) {
  return nextIntlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
