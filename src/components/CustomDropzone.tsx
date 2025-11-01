"use client";

import { useFileStore } from "@lib/stores/store";
import { FileWithPreview } from "@lib/types/file-with-preview";
import { PauseCircle, Star, Upload, X } from "lucide-react";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "./lib/utils";

interface CustomDropzoneProps {
  onUpload?: (
    file: FileWithPreview,
    onProgress: (p: number) => void,
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
  showPreview = true,
}: CustomDropzoneProps) {
  const {
    currentFile,
    setCurrentFile,
    updateFileProgress,
    setFileUploading,
    setFileAsCover,
    clearFile,
  } = useFileStore();

  const { getRootProps, getInputProps } = useDropzone({
    accept,
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
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
    } catch (err) {
      console.error("Upload canceled or failed:", err);
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
      if (currentFile?.preview) {
        URL.revokeObjectURL(currentFile.preview);
      }
    };
  }, [currentFile]);

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
      {showPreview && currentFile && (
        <div className="mt-4 inline-flex flex-col items-center">
          <div className="relative w-24 h-32 border rounded-md overflow-hidden">
            <img
              src={currentFile.preview}
              alt={currentFile.path || "preview"}
              className="w-full h-full object-cover"
            />
            {currentFile.isUploading && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                <div
                  className="h-1 bg-blue-500 transition-all duration-200"
                  style={{ width: `${currentFile.progress}%` }}
                />
              </div>
            )}
          </div>
          <div className="flex gap-1 mt-2">
            {!currentFile.isUploading ? (
              <>
                <button
                  type="button"
                  onClick={() => uploadFile(currentFile)}
                  className="p-1 rounded bg-blue-500 hover:bg-blue-600 text-white"
                  title="آپلود"
                >
                  <Upload size={14} />
                </button>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1 rounded bg-red-500 hover:bg-red-600 text-white"
                  title="حذف"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => cancelUpload(currentFile)}
                className="p-1 rounded bg-gray-400 hover:bg-gray-500 text-white"
                title="لغو آپلود"
              >
                <PauseCircle size={14} />
              </button>
            )}
            <button
              type="button"
              onClick={() => setFileAsCover()}
              className={cn(
                "p-1 rounded",
                currentFile.isCover
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300",
              )}
              title="انتخاب به عنوان کاور"
            >
              <Star size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
