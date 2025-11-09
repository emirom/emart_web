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
