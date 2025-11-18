"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DeleteButton, EditButton } from "@components/BtnWithIcon";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { deleteBrandAction } from "@lib/actions/brand-action";
import { queryClient } from "@lib/apis/queryClient";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import EditBrandForm from "./EditBrandForm";

export default function BrandsAction({ id }: { id: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDelete = async () => {
    try {
      await deleteBrandAction(id);
      queryClient.invalidateQueries({ queryKey: ["/brands"] });
      toast.success("برند حذف شد");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داده است");
      }
    }
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center w-full">
        <AlertDialogModal
          alertTitle="آیا از حذف این برند اطمینان دارید؟"
          button={<DeleteButton />}
          onConfirm={handleDelete}
        />
        <span className="opacity-0 pointer-events-none">
          <EditButton />
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full">
      <AlertDialogModal
        alertTitle="آیا از حذف این برند اطمینان دارید؟"
        button={<DeleteButton />}
        onConfirm={handleDelete}
      />
      <DashboardCustomModal
        title="ویرایش کمیت"
        button={<EditButton />}
        element={<EditBrandForm id={id} />}
      />
    </div>
  );
}
