"use client";

import { CopyIcon, EditIcon, EyeIcon, PlusIcon, Trash } from "lucide-react";
import { memo } from "react";
import { Button } from "./ui/button";

interface IconButtonProps {
  onClick?: () => void;
}

const EditButtonComponent = ({ onClick }: IconButtonProps) => (
  <Button
    onClick={onClick}
    aria-label="ویرایش"
    className="bg-sky-500 cursor-pointer px-1 mx-1 text-white hover:bg-sky-600 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 transition-colors"
  >
    <EditIcon className="stroke-white stroke-2" />
  </Button>
);

const DeleteButtonComponent = ({ onClick }: IconButtonProps) => (
  <Button
    onClick={onClick}
    aria-label="حذف"
    className="bg-red-600 cursor-pointer px-1 mx-1 text-white hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500 transition-colors"
  >
    <Trash className="stroke-white stroke-2" />
  </Button>
);

const PlusButtonComponent = ({ onClick }: IconButtonProps) => (
  <Button
    onClick={onClick}
    aria-label="افزودن"
    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 transition-colors"
  >
    <PlusIcon className="stroke-gray-500 stroke-2" />
  </Button>
);

const CopyButtonComponent = ({ onClick }: IconButtonProps) => (
  <Button
    onClick={onClick}
    aria-label="کپی"
    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 transition-colors"
  >
    <CopyIcon className="stroke-gray-500 stroke-2" />
  </Button>
);

const EyeButtonComponent = ({ onClick }: IconButtonProps) => (
  <Button
    onClick={onClick}
    aria-label="مشاهده"
    className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 transition-colors"
  >
    <EyeIcon className="stroke-gray-500 stroke-2" />
  </Button>
);

export const EditButton = memo(EditButtonComponent);
export const DeleteButton = memo(DeleteButtonComponent);
export const PlusButton = memo(PlusButtonComponent);
export const CopyButton = memo(CopyButtonComponent);
export const EyeButton = memo(EyeButtonComponent);

EditButton.displayName = "EditButton";
DeleteButton.displayName = "DeleteButton";
PlusButton.displayName = "PlusButton";
CopyButton.displayName = "CopyButton";
EyeButton.displayName = "EyeButton";
