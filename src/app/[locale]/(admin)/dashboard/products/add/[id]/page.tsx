import ProductImageModal from "@/pages/dashboard/products/ProductImageModal";
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
        title="آپلود تصویر محصول"
        linkHref="/dashboard/products"
        linkTitle="بازگشت"
      />

      <ProductImageModal productId={id} />
    </>
  );
}
