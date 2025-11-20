export default async function Page({
  params,
}: {
  params: Promise<Record<string, string>>;
}) {
  await params;
  return <></>;
}
