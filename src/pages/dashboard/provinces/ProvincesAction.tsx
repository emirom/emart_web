"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DeleteButton, EditButton } from "@components/BtnWithIcon";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { deleteProvinceAction } from "@lib/actions/province-action";
import { queryClient } from "@lib/apis/queryClient";
import { toast } from "react-toastify";
import EditProvinceForm from "./EditProvinceForm";

export default function ProvincesAction({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      await deleteProvinceAction(id);
      queryClient.invalidateQueries({ queryKey: ["/provinces"] });
      toast.success("استان  حذف شد");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داده است");
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <AlertDialogModal
        alertTitle="آیا از حذف این استان اطمینان دارید؟"
        button={<DeleteButton />}
        onConfirm={handleDelete}
      />
      <DashboardCustomModal
        title="ویرایش استان"
        button={<EditButton />}
        element={<EditProvinceForm id={id} />}
      />
    </div>
  );
}
