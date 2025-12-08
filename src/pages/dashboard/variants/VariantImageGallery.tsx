"use client";
import UploadedImagesGallery from "@components/UploadedImagesGallery";
import { useGetProductMedias } from "@lib/services/product-media/product-media";
import UploadProductImageAction from "../products/UploadProductImageAction";

export default function VariantUploadImageGallery({ id }: { id: string }) {
  const { data: productImages } = useGetProductMedias({
    skip: 0,
    limit: 10,
    variantId: id,
  });
  return (
    <div>
      <h2 className="mt-3">تصاویر محصول</h2>

      <div className="mt-4">
        {productImages?.data?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {productImages.data.map((image) => (
              <UploadedImagesGallery
                key={image.id}
                {...image}
                buttonsAction={<UploadProductImageAction id={image.id} />}
              />
            ))}
          </div>
        ) : (
          <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center text-gray-500">
            هنوز هیچ تصویری برای این محصول افزوده نشده است
          </div>
        )}
      </div>
    </div>
  );
}
