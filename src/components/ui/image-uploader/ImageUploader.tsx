"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FileWithPreview } from "@lib/types/file-with-preview";
import { toast } from "react-toastify";

interface ImageUploaderProps {
  onImageChange: (file: FileWithPreview) => Promise<void> | void;
  onRemove?: () => void;
  previewImage?: FileWithPreview;
  placeholderText?: string;
  className?: string;
  disabled?: boolean;
  hasOtherImages?: boolean; // Added prop to indicate if other images exist
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageChange,
  onRemove,
  previewImage,
  placeholderText = "بارگذاری تصویر",
  className = "",
  disabled = false,
  hasOtherImages = false, // Default to false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (hasOtherImages) {
        toast.warning(
          "لطفاً تصویر فعلی را حذف کنید قبل از بارگذاری تصویر جدید.",
        );
        return;
      }

      const file = e.target.files?.[0];
      if (file) {
        const fileWithPreview: FileWithPreview = {
          file: file,
          preview: URL.createObjectURL(file),
        };
        await onImageChange(fileWithPreview);
      }
    },
    [onImageChange, hasOtherImages],
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (hasOtherImages) {
        return; // Prevent drag over if other images exist
      }
      setIsDragging(true);
    },
    [hasOtherImages],
  );

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      if (hasOtherImages) {
        toast.warning(
          "لطفاً تصویر فعلی را حذف کنید قبل از بارگذاری تصویر جدید.",
        );
        return;
      }

      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith("image/")) {
        const fileWithPreview: FileWithPreview = {
          file: file,
          preview: URL.createObjectURL(file),
        };
        await onImageChange(fileWithPreview);
      }
    },
    [onImageChange, hasOtherImages],
  );

  const handleClick = useCallback(() => {
    if (hasOtherImages) {
      toast.warning("لطفاً تصویر فعلی را حذف کنید قبل از بارگذاری تصویر جدید.");
      return;
    }

    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  }, [disabled, hasOtherImages]);

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onRemove) {
        onRemove();
      }
    },
    [onRemove],
  );

  return (
    <div
      className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg overflow-hidden
        ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"}
        ${hasOtherImages && !previewImage ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${previewImage ? "cursor-pointer" : ""}
        ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
        disabled={disabled || hasOtherImages}
      />

      {previewImage ? (
        <div className="relative w-full h-full min-h-32">
          <img
            key={previewImage.preview} // Force re-render when preview URL changes
            src={previewImage.preview}
            alt="Preview"
            className="object-cover w-full h-full"
            onError={() => {
              console.error("Image failed to load:", previewImage?.preview);
            }}
            onLoad={() => {
              console.log("Image loaded successfully:", previewImage.preview);
            }}
          />
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-10"
              aria-label="حذف تصویر"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center p-6 text-gray-500"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mb-2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-center">{placeholderText}</p>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUploader;
