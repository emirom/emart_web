export const localizeNumber = (input: string | number): string => {
  const num =
    typeof input === "number"
      ? input
      : parseFloat(input.toString().replace(/,/g, ""));
  if (isNaN(num)) return "";
  return num.toLocaleString("fa-IR");
};
