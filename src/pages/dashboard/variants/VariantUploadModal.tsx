"use client";

import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { useAppStore } from "@lib/stores/store";
import { useEffect, useRef, useState } from "react";
import ProductImagesGalleryList from "../products/ProductImagesGalleryList";
import VariantUploadImageForm from "./VariantUploadImageForm";

interface Props {
  productId: string;
}

export default function VariantUploadModal({ productId }: Props) {
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
        element={<VariantUploadImageForm productId={productId} />}
        onOpenChange={setOpen}
      />
      <ProductImagesGalleryList id={productId} />
    </>
  );
}
