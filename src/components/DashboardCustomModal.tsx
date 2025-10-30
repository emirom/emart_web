"use client";

import { useMediaQuery } from "@lib/hooks/useMediaQuery";
import { XIcon } from "lucide-react";
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
  open,
  onOpenChange,
}: {
  element: React.ReactNode;
  title: string;
  button?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <s
            className="bg-white text-tint-blue-500 text-sm"
            aria-label={title}
            title={title}
          >
            {button}
          </s>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-sm text-tint-blue-500">
                {title}
              </DialogTitle>
              {onOpenChange && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </DialogHeader>
          {element}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
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
          {onOpenChange && (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              انصراف
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
