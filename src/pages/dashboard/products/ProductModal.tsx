"use client";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { useAppStore } from "@lib/stores/store";
import { useEffect, useState } from "react";
import UploadImageForm from "./UploadImageForm";

export default function ProductModal() {
  const { currentFile } = useAppStore((state) => state);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (currentFile) {
      setOpen(true);
    }
  }, [currentFile, setOpen]);

  return (
    <DashboardCustomModal
      title="آپلود‌تصویر"
      open={open}
      element={<UploadImageForm />}
      onOpenChange={setOpen}
    />
  );
}
