"use client";

import { Button } from "@components/ui/button";
import { DialogClose } from "@components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@components/ui/drawer";
import { XIcon } from "lucide-react";

export default function PostMethodDetailsModal({
  title,
  price,
  description,
}: {
  title: string;
  price: number;
  description: string;
}) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="absolute -bottom-9 left-3 bg-transparent text-tint-blue-500 border border-tint-blue-500 rounded-md border-t-0 rounded-t-none">
          جزئیات
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-5">
        <DrawerHeader className=" text-left px-0 border-b border-gray-100 pb-3 mb-4">
          <DrawerTitle className="flex items-center justify-between text-start text-sm font-medium text-tint-blue-500">
            {title}
            <DialogClose className="border border-gray-100 bg-whit cursor-pointer p-1 rounded-md w-fit h-fit">
              <XIcon size={16} stroke="#aaa" />
            </DialogClose>
          </DrawerTitle>
        </DrawerHeader>
        {/* {element} */}
        <DrawerDescription className="text-sm font-medium text-justify">
          {description}
        </DrawerDescription>
        <DrawerFooter className="flex flex-row items-center justify-between">
          <Button className="bg-green-400 text-white">افزودن بیمه</Button>
          <span className="font-bold text-sm text-tint-blue-500 ">
            {price} تومان
          </span>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
