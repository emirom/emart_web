"use client";

import { LOCALES } from "@/configs/i18n";
import { getPathname, usePathname, useRouter } from "@lib/i18n/navigation";
import { useLocale } from "next-intl";

const COOKIE_NAME = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale();

  return (
    <select
      value={current}
      onChange={(e) => {
        const nextLocale = e.target.value;

        document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
          nextLocale
        )}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`;

        const nextHref = getPathname({
          h$ref: pathname || "/",
          locale: nextLocale,
        });

        router.replace(nextHref);
      }}
      className="border rounded px-2 py-1"
    >
      {LOCALES.map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
