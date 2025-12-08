import VariantUploadModal from "@/pages/dashboard/variants/VariantUploadModal";
import { HeaderWithLink } from "@components/HeaderWithLink";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <HeaderWithLink
        title="آپلود تصویر موجودی"
        linkHref="/dashboard/products"
        linkTitle="بازگشت"
      />

      <VariantUploadModal productId={id} />
    </>
  );
}
