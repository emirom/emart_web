"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DeleteButton, EditButton } from "@components/BtnWithIcon";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { deleteUnitAction } from "@lib/actions/units-actions";
import { queryClient } from "@lib/apis/queryClient";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import EditUnitForm from "./EditUnitForm";

export default function UnitsActions({ id }: { id: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDelete = async () => {
    try {
      await deleteUnitAction(id);
      queryClient.invalidateQueries({ queryKey: ["/units"] });
      toast.success("کمیت حذف شد");
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
      <div className="flex items-center justify-end w-full">
        <AlertDialogModal
          alertTitle="آیا از حذف این کمیت اطمینان دارید؟"
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
    <div className="flex items-center justify-end w-full">
      <AlertDialogModal
        alertTitle="آیا از حذف این کمیت اطمینان دارید؟"
        button={<DeleteButton />}
        onConfirm={handleDelete}
      />
      <DashboardCustomModal
        title="ویرایش کمیت"
        button={<EditButton />}
        element={<EditUnitForm id={id} />}
      />
    </div>
  );
}
