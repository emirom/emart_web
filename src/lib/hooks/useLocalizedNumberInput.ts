import { useCallback, useState } from "react";
import {
  convertToEnglishDigits,
  convertToPersianDigits,
} from "../helper/convertDigits";

function detectLocaleFromInput(value: string): "fa" | "en" {
  const lastChar = value.at(-1);
  if (!lastChar) return "en";
  const code = lastChar.charCodeAt(0);
  return code >= 0x0600 && code <= 0x06ff ? "fa" : "en";
}

export function useSmartLocalizedInput() {
  const [displayValue, setDisplayValue] = useState("");
  const [locale, setLocale] = useState<"fa" | "en">("fa");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;

    const detected = detectLocaleFromInput(rawValue);
    setLocale(detected);

    const englishValue = convertToEnglishDigits(rawValue);

    const localizedValue =
      detected === "fa" ? convertToPersianDigits(englishValue) : englishValue;

    setDisplayValue(localizedValue);

    return englishValue;
  }, []);

  return { displayValue, handleChange, locale, setDisplayValue };
}
