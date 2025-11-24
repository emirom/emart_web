"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DeleteButton, EditButton } from "@components/BtnWithIcon";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { deleteCityAction } from "@lib/actions/city-action";
import { queryClient } from "@lib/apis/queryClient";
import { invalidateEntityQueries } from "@lib/utils/react-query-utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EditCityForm from "./EditCityForm";

export default function CityAction({ id }: { id: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDelete = async () => {
    try {
      await deleteCityAction(id);
      // Invalidate all queries that start with "/cities" and refetch
      await invalidateEntityQueries(queryClient, "/cities");
      toast.success("شهر  حذف شد");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("خطایی رخ داده است");
      } else {
        toast.error("خطایی رخ داده است");
      }
    }
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center w-full">
        <AlertDialogModal
          alertTitle="آیا از حذف این شهر  اطمینان دارید؟"
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
        alertTitle="آیا از حذف این شهر اطمینان دارید؟"
        button={<DeleteButton />}
        onConfirm={handleDelete}
      />
      <DashboardCustomModal
        title="ویرایش شهر"
        button={<EditButton />}
        element={<EditCityForm id={id} />}
      />
    </div>
  );
}
