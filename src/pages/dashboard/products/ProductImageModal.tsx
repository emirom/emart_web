"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import UploadedImagesGallery from "@components/UploadedImagesGallery";
import { useGetProductMedias } from "@lib/services/product-media/product-media";
import { useAppStore } from "@lib/stores/store";
import { useEffect, useRef, useState } from "react";
import AddProductImageForm from "./AddProductImageForm";
import UploadProductImageAction from "./UploadProductImageAction";

interface Props {
  productId: string;
}

export default function ProductImageModal({ productId }: Props) {
  const { currentFile } = useAppStore((state) => state);
  const [open, setOpen] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentFile) {
      setOpen(true);
    }
  }, [currentFile]);

  const handleUploaderClick = () => {
    setOpen(true);
  };
  const { data: productImages } = useGetProductMedias({
    skip: 0,
    limit: 10,
    productId,
  });

  return (
    <>
      <div
        onClick={handleUploaderClick}
        className="flex items-center justify-center w-full mx-auto p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50"
      >
        <span className="text-gray-500 text-center">
          برای آپلود تصویر کلیک کنید
        </span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            // const file = e.target.files[0];
            // const newImage: ImageItem = {
            //   id: crypto.randomUUID(),
            //   src: URL.createObjectURL(file),
            // };
          }
        }}
      />

      <DashboardCustomModal
        title="آپلود تصویر"
        open={open}
        element={<AddProductImageForm productId={productId} />}
        onOpenChange={setOpen}
      />
      <h1 className="mt-3">تصاویر محصول</h1>

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
    </>
  );
}
