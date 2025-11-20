"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DeleteButton } from "@components/BtnWithIcon";
import { deleteVariantAction } from "@lib/actions/variants-action";
import { queryClient } from "@lib/apis/queryClient";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function VariantAction({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      await deleteVariantAction(id);
      queryClient.invalidateQueries({ queryKey: ["/variants"] });
      toast.success("تنوع محصول حذف شد");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داده است");
      }
    }
  };

  return (
    <div className="flex items-stretch justify-end w-full">
      <AlertDialogModal
        alertTitle="آیا از حذف این تنوع محصول اطمینان دارید؟"
        button={<DeleteButton />}
        onConfirm={handleDelete}
      />
      <Link
        href={`/dashboard/variants/${id}`}
        aria-label="ویرایش"
        className="bg-sky-500 cursor-pointer flex items-center justify-center px-2 mx-1 text-white rounded-md hover:bg-sky-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 transition-colors"
      >
        <EditIcon width={18} className="stroke-white stroke-2" />
      </Link>
    </div>
  );
}
