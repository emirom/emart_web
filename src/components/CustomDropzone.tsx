"use client";

import { useGetProductMedias } from "@lib/services/product-media/product-media";
import { useFileStore } from "@lib/stores/store";
import { FileWithPreview } from "@lib/types/file-with-preview";
import { PauseCircle, Star, Upload, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "./lib/utils";

interface CustomDropzoneProps {
  onUpload?: (
    file: FileWithPreview,
    onProgress: (p: number) => void
  ) => Promise<void>;
  onDeleteFile?: (file: FileWithPreview) => void;
  onAbortUpload?: (file: FileWithPreview) => void;
  accept?: { [mime: string]: string[] };
  showPreview?: boolean;
}

export default function CustomDropzone({
  onUpload,
  onDeleteFile,
  onAbortUpload,
  accept = { "image/*": [] },
}: CustomDropzoneProps) {
  const {
    currentFile,
    setCurrentFile,
    updateFileProgress,
    setFileUploading,
    setFileAsCover,
    clearFile,
  } = useFileStore();
  const params = useParams();
  const productId =
    typeof params?.productId === "string"
      ? params.productId
      : Array.isArray(params?.productId)
        ? params.productId[0]
        : undefined;

  const { data: productImage } = useGetProductMedias({
    skip: 0,
    limit: 10,
    productId,
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (!acceptedFiles.length) return;
      const file = acceptedFiles[0];
      const newFile: FileWithPreview = {
        file,
        preview: URL.createObjectURL(file),
        path: file.name,
        progress: 0,
        isUploading: false,
        isCover: false,
        controller: new AbortController(),
      };
      setCurrentFile(newFile);
    },
  });

  const uploadFile = async (file: FileWithPreview) => {
    const updateProgress = (p: number) => updateFileProgress(p);
    try {
      setFileUploading(true);
      if (onUpload) await onUpload(file, updateProgress);
      else {
        for (let p = 0; p <= 100; p += 10) {
          await new Promise((r) => setTimeout(r, 100));
          updateProgress(p);
        }
      }
      clearFile();
    } catch {
    } finally {
      setFileUploading(false);
      updateFileProgress(100);
    }
  };

  const cancelUpload = (file: FileWithPreview) => {
    file.controller?.abort();
    setFileUploading(false);
    updateFileProgress(0);
    onAbortUpload?.(file);
  };

  const removeFile = () => {
    if (!currentFile) return;
    onDeleteFile?.(currentFile);
    clearFile();
  };

  useEffect(() => {
    return () => {
      if (currentFile?.preview) URL.revokeObjectURL(currentFile.preview);
    };
  }, [currentFile]);

  const constructImageUrl = (url: string): string => {
    if (!url) return "";
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3010";

    const cleanBaseUrl = baseUrl.replace(/\/$/, "");
    const cleanImgUrl = url.startsWith("/") ? url.substring(1) : url;
    return `${cleanBaseUrl}/${cleanImgUrl}`;
  };

  return (
    <div>
      <label
        className="block text-xs text-tint-blue-500 font-medium mb-2"
        htmlFor="upload-file"
      >
        انتخاب تصویر محصول
      </label>
      <section className="container flex items-center justify-center py-12 border-2 border-dashed border-gray-100 rounded-lg">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} id="upload-file" />
          <p className="text-sm text-gray-500">
            فایل مورد نظر را انتخاب کنید یا فایل را رها کنید
          </p>
        </div>
      </section>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {productImage?.data &&
          productImage.data.map((img) => (
            <div
              key={img.id}
              className="relative w-full h-aut border rounded-md overflow-hidden flex flex-col items-center"
            >
              <div className="w-full h-24">
                <img
                  src={constructImageUrl(img.url)}
                  alt={img.altText || "product image"}
                  className="w-full h-24 object-cover"
                  style={{ width: "100%", height: "100%" }}
                  loading="lazy"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik03MiA3Mkg4MFM5NiA1NiA5NiAzMiA4MCAzMiA4MCAzMiA2NCAzMiA0OCAzMiA0OCA0OCA0OCA0OCA0OCA0OCIgc3Ryb2tlPSIjRTNFNEU0IiBzdHJva2Utd2lkdGg9IjgiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTE2IDE2TDMwLjQgMzAuNFoiIHN0cm9rZT0iI0UzRTRFNCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==";
                  }}
                />
              </div>
              <div className="p-1 text-xs text-center truncate w-full">
                {img.altText || "بدون عنوان"}
              </div>
              <div className="absolute top-1 right-1 flex gap-1">
                <button
                  type="button"
                  onClick={() =>
                    onDeleteFile?.(img as unknown as FileWithPreview)
                  }
                  className="p-1 rounded bg-red-500 hover:bg-red-600 text-white"
                  title="حذف تصویر"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          ))}
      </div>

      {currentFile && (
        <div className="mt-6 flex flex-col items-center">
          <div className="w-32 h-40 border rounded-md overflow-hidden mb-2">
            <Image
              src={currentFile.preview}
              alt="Preview"
              width={128}
              height={160}
              className="w-full h-full object-cover"
              unoptimized
            />
            {currentFile.isUploading && (
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200">
                <div
                  className="h-2 bg-blue-500 transition-all duration-200"
                  style={{ width: `${currentFile.progress}%` }}
                />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {!currentFile.isUploading ? (
              <>
                <button
                  type="button"
                  onClick={() => uploadFile(currentFile)}
                  className="p-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
                  title="آپلود"
                >
                  <Upload size={16} />
                </button>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-2 rounded bg-red-500 hover:bg-red-600 text-white"
                  title="حذف"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => cancelUpload(currentFile)}
                className="p-2 rounded bg-gray-400 hover:bg-gray-500 text-white"
                title="لغو آپلود"
              >
                <PauseCircle size={16} />
              </button>
            )}
            <button
              type="button"
              onClick={() => setFileAsCover()}
              className={cn(
                "p-2 rounded",
                currentFile?.isCover
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              )}
              title="انتخاب به عنوان کاور"
            >
              <Star size={16} />
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">{currentFile.path}</p>
        </div>
      )}
    </div>
  );
}
