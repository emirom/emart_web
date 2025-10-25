"use client";

import { useQueryClient } from "@tanstack/react-query";
import { memo } from "react";
import { toast } from "react-toastify";

import { AlertDialogModal } from "@components/AlertDialogModal";
import {
  CopyButton,
  DeleteButton,
  EyeButton,
  PlusButton,
} from "@components/BtnWithIcon";

import { deleteCategoryAction } from "@lib/actions/category-action";
import { EditIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  id: string;
};

const TreeRenderActionComponent = ({ id }: Props) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await deleteCategoryAction(id);
      queryClient.invalidateQueries({ queryKey: ["/categories"] });
      toast.success("دسته بندی حذف شد");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("خطایی رخ داده است");
      }
    }
  };

  return (
    <div className="flex items-center justify-end gap-3 flex-wrap">
      <div className="flex items-center gap-1">
        <PlusButton aria-label="Add child category" />
        <CopyButton aria-label="Copy category" />
        <EyeButton aria-label="View category" />
      </div>

      <div className="flex items-stretch gap-1">
        <AlertDialogModal
          button={<DeleteButton aria-label="Delete category" />}
          alertTitle="آیا از حذف این دسته بندی مطمئن هستید؟"
          onConfirm={handleDelete}
        />

        <Link
          href={`/dashboard/category/${id}`}
          className="flex items-center justify-center bg-sky-500 cursor-pointer rounded-lg px-3 mx-1 text-white hover:bg-sky-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 transition-colors "
        >
          <EditIcon className="stroke-white  " width={17} height={17} />
        </Link>
      </div>
    </div>
  );
};

const TreeRenderAction = memo(TreeRenderActionComponent);
TreeRenderAction.displayName = "TreeRenderAction";

export default TreeRenderAction;
