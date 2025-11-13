"use client";

import { AlertDialogModal } from "@components/AlertDialogModal";
import { DeleteButton } from "@components/BtnWithIcon";
import { deleteProductAction } from "@lib/actions/product-action";
import { queryClient } from "@lib/apis/queryClient";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

export default function ProductAction({ id }: { id: string }) {
  const handleDelete = async () => {
    try {
      await deleteProductAction(id);
      queryClient.invalidateQueries({ queryKey: ["/products"] });
      toast.success("محصول حذف شد");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داده است");
      }
    }
  };

  return (
    <div className="flex  items-stretch justify-center w-full">
      <AlertDialogModal
        alertTitle="آیا از حذف این بیمه اطمینان دارید؟"
        button={<DeleteButton />}
        onConfirm={handleDelete}
      />
      <Link
        href={`/dashboard/products/edit/${id}`}
        aria-label="ویرایش"
        className="flex items-center justify-center rounded-lg  bg-sky-500 cursor-pointer px-3 mx-1 text-white hover:bg-sky-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 transition-colors"
      >
        <EditIcon width={16} height={16} className="stroke-white stroke-2" />
      </Link>
    </div>
  );
}
