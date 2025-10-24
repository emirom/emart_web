"use client";

import { useQueryClient } from "@tanstack/react-query";
import { memo } from "react";
import { toast } from "react-toastify";

import { AlertDialogModal } from "@components/AlertDialogModal";
import {
  CopyButton,
  DeleteButton,
  EditButton,
  EyeButton,
  PlusButton,
} from "@components/BtnWithIcon";

import { deleteCategoryAction } from "@lib/actions/category-action";

type Props = {
  id: string;
};

const TreeRenderActionComponent = ({ id }: Props) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await deleteCategoryAction(id);
      toast.success("دسته بندی حذف شد");

      // ✅ Invalidate all category-related caches
      queryClient.invalidateQueries({ queryKey: ["/categories"] });
      queryClient.invalidateQueries({ queryKey: ["category-child"] });
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

      <div className="flex items-center gap-1">
        <AlertDialogModal
          button={<DeleteButton aria-label="Delete category" />}
          alertTitle="آیا از حذف این دسته بندی مطمئن هستید؟"
          onConfirm={handleDelete}
        />
        <EditButton aria-label="Edit category" />
      </div>
    </div>
  );
};

const TreeRenderAction = memo(TreeRenderActionComponent);
TreeRenderAction.displayName = "TreeRenderAction";

export default TreeRenderAction;
