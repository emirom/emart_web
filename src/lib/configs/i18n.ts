export const LOCALES = ["fa", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "fa";

const RTL: Locale[] = ["fa"];
export const isLocaleRTL = (l: string) => RTL.includes(l as Locale);

export function isLocaleStringValid(
  localeString?: string,
): localeString is Locale {
  return (
    !!localeString && (LOCALES as readonly string[]).includes(localeString)
  );
}
