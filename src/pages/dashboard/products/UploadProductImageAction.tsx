"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DashboardCustomModal } from "@components/DashboardCustomModal";
import { Button } from "@components/ui/button";
import { queryClient } from "@lib/apis/queryClient";
import { useDeleteProductMediasId } from "@lib/services/product-media/product-media";
import { AxiosError } from "axios";
import { Edit, TrashIcon } from "lucide-react";
import { toast } from "react-toastify";
import EditProductImageForm from "./EditProductImageForm";

interface ErrorResponseData {
  message?: string;
}

export default function UploadProductImageAction({ id }: { id: string }) {
  const deleteMutation = useDeleteProductMediasId({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/product-medias"] });
        toast.success("تصویر با موفقیت حذف شد");
      },

      onError: (error: AxiosError<ErrorResponseData>) => {
        const errorMessage =
          error.response?.data?.message ?? error.message ?? "خطا در حذف تصویر";

        toast.error(errorMessage);
      },
    },
  });

  const onDelete = () => {
    deleteMutation.mutate({ id });
  };

  return (
    <div className="flex items-center justify-between w-full">
      <AlertDialogModal
        alertTitle="آیا از حذف  تصویر محصول اطمینان دارید؟"
        button={
          <Button
            className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center cursor-pointer"
            aria-label="حذف تصویر"
          >
            <TrashIcon size={16} />
          </Button>
        }
        onConfirm={onDelete}
      />

      <DashboardCustomModal
        title="ویرایش تصویر محصول"
        button={
          <Button
            className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer"
            aria-label="ویرایش تصویر"
            type="button"
          >
            <Edit size={16} />
          </Button>
        }
        element={<EditProductImageForm productId={id} />}
      />
    </div>
  );
}
