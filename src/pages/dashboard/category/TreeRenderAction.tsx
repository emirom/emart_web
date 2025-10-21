"use client";

import {
  CopyButton,
  DeleteButton,
  EditButton,
  EyeButton,
  PlusButton,
} from "@components/BtnWithIcon";
import { memo } from "react";

type Props = {
  id: string;
};

const TreeRenderActionComponent = ({ id }: Props) => {
  console.log(id);
  return (
    <div className="flex items-center justify-end gap-3 flex-wrap">
      <div className="flex items-center gap-1  ">
        <PlusButton aria-label="Add child category" />
        <CopyButton aria-label="Copy category" />
        <EyeButton aria-label="View category" />
      </div>
      <div className="flex items-center ">
        <DeleteButton aria-label="Delete category" />
        <EditButton aria-label="Edit category" />
      </div>
    </div>
  );
};

const TreeRenderAction = memo(TreeRenderActionComponent);
TreeRenderAction.displayName = "TreeRenderAction";

export default TreeRenderAction;
