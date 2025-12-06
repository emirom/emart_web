"use client";

import { SubmitButton } from "@components/BtnWithIcon";
import ImageUploader from "@components/ui/image-uploader/ImageUploader";
import { postProductMediaAction } from "@lib/actions/product-media-action";
import { useAppStore } from "@lib/stores/store";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

interface UploadImageFormProps {
  productId: string;
  onClose: () => void;
}

export default function UploadImageForm({
  productId,
  onClose,
}: UploadImageFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const currentFile = useAppStore((state) => state.currentFile);
  const clearFile = useAppStore((state) => state.clearFile);

  const handleUpload = useCallback(async () => {
    if (!currentFile) {
      toast.warning("لطفاً یک تصویر انتخاب کنید");
      return;
    }

    if (currentFile.file.size > 10 * 1024 * 1024) {
      toast.error("اندازه تصویر بیش از حد مجاز است (حداکثر 10 مگابایت)");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/gif",
    ];
    if (!allowedTypes.includes(currentFile.file.type)) {
      toast.error(
        "فرمت تصویر مجاز نیست. فرمت‌های مجاز: JPEG, JPG, PNG, WEBP, GIF"
      );
      return;
    }

    try {
      setIsUploading(true);

      toast.info("در حال آپلود تصویر...");

      const uploadData = {
        file: currentFile.file,
        productId: productId,
        title: currentFile.file.name.substring(0, 100),
        altText: `Image for product ${productId}`,
      };

      const result = await postProductMediaAction(uploadData);

      if (result.success) {
        toast.success("تصویر با موفقیت آپلود شد");
        clearFile();
        onClose();
      } else {
        toast.error(result.error || "خطا در آپلود تصویر");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      const errorMessage =
        error instanceof Error ? error.message : "خطا در آپلود تصویر";
      toast.error(errorMessage);
    } finally {
      setIsUploading(false);
    }
  }, [currentFile, productId, clearFile, onClose]);

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4">
        <ImageUploader
          onRemove={clearFile}
          previewImage={currentFile}
          placeholderText="تصویر را اینجا رها کنید یا کلیک کنید"
          disabled={isUploading}
        />
      </div>

      {isUploading && (
        <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 ml-2"></div>
          <span>در حال آپلود تصویر...</span>
        </div>
      )}

      <div className="flex justify-between">
        <SubmitButton
          label={isUploading ? "در حال آپلود..." : "آپلود تصویر"}
          onClick={handleUpload}
          disabled={!currentFile || isUploading}
          className="bg-green-500 hover:bg-green-600 text-white"
        />

        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          disabled={isUploading}
        >
          انصراف
        </button>
      </div>
    </div>
  );
}
