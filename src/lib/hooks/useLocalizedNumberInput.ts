import { useCallback, useState } from "react";

export function convertToEnglishDigits(value: string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return value
    .split("")
    .map((char) => {
      const p = persianDigits.indexOf(char);
      if (p !== -1) return p.toString();
      const a = arabicDigits.indexOf(char);
      if (a !== -1) return a.toString();
      return char;
    })
    .join("");
}

export function convertToPersianDigits(value: string): string {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return value.replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

function detectLocaleFromInput(value: string): "fa" | "en" {
  const lastChar = value.at(-1);
  if (!lastChar) return "en";
  const code = lastChar.charCodeAt(0);
  return code >= 0x0600 && code <= 0x06ff ? "fa" : "en";
}

export function useSmartLocalizedInput() {
  const [displayValue, setDisplayValue] = useState("");
  const [locale, setLocale] = useState<"fa" | "en">("fa");

  const handleChange = useCallback(
    (value: string | React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = typeof value === "string" ? value : value.target.value;
      const englishValue = convertToEnglishDigits(rawValue);
      setDisplayValue(convertToPersianDigits(englishValue));
      setLocale(detectLocaleFromInput(rawValue));
      return englishValue;
    },
    [],
  );

  return { displayValue, handleChange, locale, setDisplayValue };
}
