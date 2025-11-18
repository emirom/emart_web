"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DeleteButton, EditButton } from "@components/BtnWithIcon";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { deleteLabelAction } from "@lib/actions/label-action";
import { queryClient } from "@lib/apis/queryClient";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import EditLabelForm from "./EditLabelForm";

export default function LabelAction({ id }: { id: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDelete = async () => {
    try {
      await deleteLabelAction(id);
      queryClient.invalidateQueries({ queryKey: ["/labels"] });
      toast.success("برچسب حذف شد");
    } catch (error) {
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
          alertTitle="آیا از حذف این برچسب اطمینان دارید؟"
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
        alertTitle="آیا از حذف این برچسب اطمینان دارید؟"
        button={<DeleteButton />}
        onConfirm={handleDelete}
      />
      <DashboardCustomModal
        title="ویرایش برچسب"
        button={<EditButton />}
        element={<EditLabelForm id={id} />}
      />
    </div>
  );
}
