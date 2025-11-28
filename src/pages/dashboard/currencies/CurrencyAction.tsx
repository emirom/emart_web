"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DeleteButton, EditButton } from "@components/BtnWithIcon";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { deleteCurrencyAction } from "@lib/actions/currency-action";
import { toast } from "react-toastify";
import EditCurrencyForm from "./EditCurrencyForm";

export default function CurrencyAction({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      await deleteCurrencyAction(id);
      toast.success("کشور حذف شد");
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
        alertTitle="آیا از حذف این ارز اطمینان دارید؟"
        button={<DeleteButton />}
        onConfirm={handleDelete}
      />
      <DashboardCustomModal
        title="ویرایش کمیت"
        button={<EditButton />}
        element={<EditCurrencyForm id={id} />}
      />
    </div>
  );
}
