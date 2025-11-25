"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DeleteButton, EditButton } from "@components/BtnWithIcon";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { deleteLocationAction } from "@lib/actions/location-action";
import { toast } from "react-toastify";
import EditLocationForm from "./EditLocationForm";

export default function LocationAction({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      await deleteLocationAction(id);

      toast.success("آدرس حذف شد");
    } catch (error) {
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
        alertTitle="آیا از حذف این آدرس اطمینان دارید؟"
        button={<DeleteButton />}
        onConfirm={handleDelete}
      />
      <DashboardCustomModal
        title="ویرایش آدرس"
        button={<EditButton />}
        element={<EditLocationForm id={id} />}
      />
    </div>
  );
}
