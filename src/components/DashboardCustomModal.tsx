"use client";

import { useMediaQuery } from "@lib/hooks/useMediaQuery";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

export function DashboardCustomModal({
  element,
  title,
  button,
}: {
  element: React.ReactNode;
  title: string;
  button: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // جلوگیری از mismatch بین SSR و CSR
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Desktop size
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className="bg-white text-tint-blue-500 text-sm"
            aria-label={title}
            title={title}
          >
            {button}
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-sm text-tint-blue-500">
                {title}
              </DialogTitle>
              <Button
                onClick={() => setOpen((open) => !open)}
                className="bg-transparent cursor-pointer block m-0 p-0"
              >
                <XIcon stroke="#aaa" />
              </Button>
            </div>
          </DialogHeader>
          {element}
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile size
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div
          className="bg-white text-tint-blue-500 text-sm"
          aria-label={title}
          title={title}
        >
          {button}
        </div>
      </DrawerTrigger>
      <DrawerContent className="px-5">
        <DrawerHeader className="text-left px-0">
          <DrawerTitle className="text-start">{title}</DrawerTitle>
        </DrawerHeader>
        {element}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">انصراف</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
