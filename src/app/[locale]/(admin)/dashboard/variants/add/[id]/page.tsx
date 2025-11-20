import VariantFileUploader from "@/pages/dashboard/variants/VariantFileUploader";

export default async function Page({
  params,
}: {
  params: Promise<Record<string, string>>;
}) {
  const { id } = await params;
  return (
    <>
      <VariantFileUploader id={id} />
    </>
  );
}
