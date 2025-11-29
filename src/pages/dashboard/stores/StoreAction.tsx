"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DeleteButton, EditButton } from "@components/BtnWithIcon";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { deleteStoreAction } from "@lib/actions/store.action";
import { toast } from "react-toastify";
import EditStoreForm from "./EditStoreForm";

export default function StoreAction({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      await deleteStoreAction(id);

      toast.success("فروشگاه  حذف شد");
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
        alertTitle="آیا از حذف این فروشگاه اطمینان دارید؟"
        button={<DeleteButton />}
        onConfirm={handleDelete}
      />
      <DashboardCustomModal
        title="ویرایش فروشگاه"
        button={<EditButton />}
        element={<EditStoreForm id={id} />}
      />
    </div>
  );
}
