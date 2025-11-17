"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DeleteButton, EditButton } from "@components/BtnWithIcon";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { deleteVariantAction } from "@lib/actions/variants-action";
import { queryClient } from "@lib/apis/queryClient";
import { toast } from "react-toastify";

export default function UnitsActions({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      await deleteVariantAction(id);
      queryClient.invalidateQueries({ queryKey: ["/variants"] });
      toast.success("تنوع محصول حذف شد");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داده است");
      }
    }
  };

  return (
    <div className="flex items-center justify-end w-full">
      <AlertDialogModal
        alertTitle="آیا از حذف این تنوع محصول اطمینان دارید؟"
        button={<DeleteButton />}
        onConfirm={handleDelete}
      />
      <DashboardCustomModal
        title="ویرایش تنوع محصول"
        button={<EditButton />}
        element={<></>}
      />
    </div>
  );
}
