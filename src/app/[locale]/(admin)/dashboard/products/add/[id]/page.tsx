import ProductModal from "@/pages/dashboard/products/ProductModal";
import ImageUploader from "@components/ui/image-uploader/ImageUploader";
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
      <ImageUploader />
      <ProductModal productId={id} />
    </>
  );
}
