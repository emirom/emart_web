"use client";

import { buildMediaUrl } from "@lib/utils/build-media-url";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export interface FileWithPreview extends File {
  preview: string;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholderText?: string;
  url?: string;
}

export function ImageUploader<T extends FieldValues>({
  name,
  control,
  label,
  disabled = false,
  className,
  placeholderText = "بارگذاری تصویر",
  url,
}: Props<T>) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (!disabled) inputRef.current?.click();
  };

  const createPreviewFile = (file: File): FileWithPreview => {
    return Object.assign(file, { preview: URL.createObjectURL(file) });
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (file: FileWithPreview | null) => void,
  ) => {
    const file = e.target.files?.[0] ?? null;
    const fileWithPreview = file ? createPreviewFile(file) : null;
    onChange(fileWithPreview);
  };

  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  useEffect(() => {
    if (url) setCurrentUrl(url);
  }, [url]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <div className={`flex flex-col gap-2 ${className}`}>
          {label && (
            <label className="text-sm font-medium text-gray-700">{label}</label>
          )}

          <div
            className={`border relative border-gray-300 rounded-xl p-3 flex flex-col items-center justify-center cursor-pointer transition hover:bg-gray-50 ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleClick}
          >
            {!value && !currentUrl ? (
              <div className="flex flex-col items-center justify-center py-6">
                <span className="text-sm text-gray-500">{placeholderText}</span>
              </div>
            ) : (
              <div className="relative w-40 h-40">
                <Image
                  src={value ? value.preview : buildMediaUrl(currentUrl!)}
                  fill
                  alt="preview"
                  className="rounded-lg object-cover"
                />
              </div>
            )}

            {(value || currentUrl) && (
              <button
                type="button"
                className="absolute bottom-1 right-1 bg-black/60 text-white px-1 py-1 rounded-md text-xs font-medium cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(null);
                  setCurrentUrl(null);
                  if (inputRef.current) inputRef.current.value = "";
                }}
              >
                حذف
              </button>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            disabled={disabled}
            onChange={(e) => handleFileChange(e, onChange)}
          />
        </div>
      )}
    />
  );
}
