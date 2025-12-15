"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DeleteButton, EditButton } from "@components/BtnWithIcon";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { deleteAttributeAction } from "@lib/actions/attribute-action";
import { queryClient } from "@lib/apis/queryClient";
import { invalidateEntityQueries } from "@lib/utils/react-query-utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditAttributeForm from "./EditAttributeForm";

export default function AttributeActions({ id }: { id: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDelete = async () => {
    try {
      await deleteAttributeAction(id);
      // Invalidate all queries that start with "/attributes" and refetch
      await invalidateEntityQueries(queryClient, "/attributes");
      toast.success("ویژگی حذف شد");
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
          alertTitle="آیا از حذف این ویژگی اطمینان دارید؟"
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
        alertTitle="آیا از حذف این ویژگی اطمینان دارید؟"
        button={<DeleteButton />}
        onConfirm={handleDelete}
      />
      <DashboardCustomModal
        title="ویرایش ویژگی"
        button={<EditButton />}
        element={<EditAttributeForm id={id} />}
      />
    </div>
  );
}
