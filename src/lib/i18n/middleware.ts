import { DEFAULT_LOCALE, isLocaleStringValid } from "@lib/configs/i18n";
import { NextRequest } from "next/server";
import { routing } from "./routing";
import { redirect, resolveLocale, rewrite } from "./utils";

export default function nextIntlMiddleware(req: NextRequest) {
  const { localePrefix } = routing;
  const { pathname } = req.nextUrl;

  const pathnameSegments = pathname.split("/").filter(Boolean);
  const pathnameLocale = isLocaleStringValid(pathnameSegments[0])
    ? pathnameSegments[0]
    : undefined;

  const resolvedLocale = resolveLocale(req);
  const isDefault = resolvedLocale === DEFAULT_LOCALE;
  const hasLocalePrefix = Boolean(pathnameLocale);

  const isUnprefixedRouting =
    (localePrefix as string) === "never" ||
    (isDefault && localePrefix === "as-needed");

  const unprefixedPathname = hasLocalePrefix
    ? "/" + pathnameSegments.slice(1).join("/")
    : pathname;

  const internalPathname = `/${resolvedLocale}${unprefixedPathname}`;

  if (!hasLocalePrefix && !isUnprefixedRouting) {
    return redirect(req, `/${resolvedLocale}${pathname}`);
  }

  if (hasLocalePrefix && isUnprefixedRouting) {
    return redirect(req, unprefixedPathname || "/");
  }

  return rewrite(req, internalPathname, resolvedLocale);
}
