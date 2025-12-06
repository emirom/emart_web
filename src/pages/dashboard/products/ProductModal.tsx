"use client";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { useAppStore } from "@lib/stores/store";
import { useEffect, useState } from "react";
import UploadImageForm from "./UploadImageForm";

interface ProductModalProps {
  productId: string;
}

export default function ProductModal({ productId }: ProductModalProps) {
  const { currentFile } = useAppStore((state) => state);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (currentFile) {
      setOpen(true);
    }
  }, [currentFile, setOpen]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DashboardCustomModal
      title="آپلود تصویر"
      open={open}
      element={<UploadImageForm productId={productId} onClose={handleClose} />}
      onOpenChange={setOpen}
    />
  );
}
