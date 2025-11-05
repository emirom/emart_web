"use client";

import { isLocaleStringValid, type Locale } from "@lib/configs/i18n";
import { routing } from "@lib/i18n/routing";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

const COOKIE_NAME = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export default function useI18n() {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const current = useLocale() as Locale;
  const [locale, setLocale] = useState<Locale>(current);

  const pushToNewUrl = useCallback(
    (newLocale: Locale) => {
      const segments = pathname.split("/").filter(Boolean);
      const maybeLocale = segments[0];
      const hasPrefix = isLocaleStringValid(maybeLocale);

      const base = hasPrefix ? `/${segments.slice(1).join("/")}` : pathname;

      const to =
        newLocale === routing.defaultLocale &&
        routing.localePrefix === "as-needed"
          ? base || "/"
          : `/${newLocale}${base === "/" ? "" : base}`;

      router.push(to);
    },
    [pathname, router],
  );

  const changeLocale = useCallback(
    (newLocale: Locale) => {
      if (!isLocaleStringValid(newLocale)) return;

      if (typeof document !== "undefined") {
        document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
          newLocale,
        )}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;
      }

      setLocale(newLocale);
      pushToNewUrl(newLocale);
    },
    [pushToNewUrl],
  );

  return { locale, changeLocale };
}
