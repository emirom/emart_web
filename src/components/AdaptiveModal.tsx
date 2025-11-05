"use client";

import { useMediaQuery } from "@lib/hooks/useMediaQuery";
import { XIcon } from "lucide-react";
import { isValidElement, ReactNode, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

type TriggerProp = ReactNode | string;

export type AdaptiveModalProps = {
  trigger?: TriggerProp;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentClassName?: string;
};

export function AdaptiveModal({
  trigger = "Open",
  title,
  description,
  footer,
  children,
  open: controlledOpen,
  onOpenChange,
  contentClassName,
}: AdaptiveModalProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;

  const renderTrigger = (asChild?: boolean) => {
    if (isValidElement(trigger)) {
      return <>{trigger}</>;
    }
    return (
      <Button variant="outline" asChild={asChild}>
        <span>{String(trigger)}</span>
      </Button>
    );
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{renderTrigger(true)}</DialogTrigger>
        <DialogContent className={contentClassName}>
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{title}</DialogTitle>
              <XIcon onClick={() => setUncontrolledOpen(false)} />
            </div>
            {description ? (
              <DialogDescription>{description}</DialogDescription>
            ) : null}
          </DialogHeader>
          {children}
          {footer ? <div className="px-4">{footer}</div> : null}
        </DialogContent>
      </Dialog>
    );
  }
  // Mobile size
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{renderTrigger(true)}</DrawerTrigger>
      <DrawerContent className={contentClassName}>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description ? (
            <DrawerDescription>{description}</DrawerDescription>
          ) : null}
        </DrawerHeader>
        {children}
        {footer ? <DrawerFooter>{footer}</DrawerFooter> : null}
      </DrawerContent>
    </Drawer>
  );
}
