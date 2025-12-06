"use client";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { useAppStore } from "@lib/stores/store";
import { useEffect, useState } from "react";
import AddProductImageForm from "./AddProductImageForm";

interface ProductModalProps {
  productId: string;
}

export default function ProductImageModal({ productId }: ProductModalProps) {
  const { currentFile } = useAppStore((state) => state);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (currentFile) {
      setOpen(true);
    }
  }, [currentFile, setOpen]);

  return (
    <>
      <button onClick={() => setOpen(true)}>Add Image</button>
      <DashboardCustomModal
        title="آپلود تصویر"
        open={open}
        element={<AddProductImageForm productId={productId} />}
        onOpenChange={setOpen}
      />
      <div></div>
    </>
  );
}
