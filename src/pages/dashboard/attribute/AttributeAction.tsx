"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DeleteButton, EditButton } from "@components/BtnWithIcon";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { deleteAttributeAction } from "@lib/actions/attribute-action";
import { queryClient } from "@lib/apis/queryClient";
import { toast } from "react-toastify";
import EditAttributeForm from "./EditAttributeForm";

export default function AttributeActions({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      await deleteAttributeAction(id);
      queryClient.invalidateQueries({ queryKey: ["/attributes"] });
      toast.success("ویژگی حذف شد");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داده است");
      }
    }
  };

  return (
    <div className="flex gap-1 items-center justify-center w-full">
      <AlertDialogModal
        alertTitle="آیا از حذف این ویژگی اطمینان دارید؟"
        button={<DeleteButton />}
        onConfirm={handleDelete}
      />
      <DashboardCustomModal
        title="ویرایش کمیت"
        button={<EditButton />}
        element={<EditAttributeForm id={id} />}
      />
    </div>
  );
}
