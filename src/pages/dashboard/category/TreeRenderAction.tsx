"use client";

import {
  CopyButton,
  DeleteButton,
  EditButton,
  EyeButton,
  PlusButton,
} from "@components/BtnWithIcon";

type Props = {
  id: string;
};

export default function TreeRenderAction({ id }: Props) {
  console.log(id);
  return (
    <div className="flex items-stretch justify-end w-full flex-1  gap-3 ">
      <div className="flex items-center gap-1 ml-6">
        <PlusButton />
        <CopyButton />
        <EyeButton />
      </div>
      <div className="flex items-center gap-1">
        <DeleteButton />
        <EditButton />
      </div>
    </div>
  );
}
