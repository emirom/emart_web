export function buildMediaUrl(url?: string | null) {
  if (!url) return "";
  const base =
    process.env.NEXT_PUBLIC_MEDIA_BASE_URL || "http://localhost:3010";
  return `${base}${url}`;
}
