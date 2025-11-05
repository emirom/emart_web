"use client";

import { ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

type Props = {
  button: ReactNode;
  alertTitle: string;
  alertDescription?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

let dialogIdCounter = 0;

export function AlertDialogModal({
  button,
  alertTitle,
  alertDescription,
  confirmText = "تأیید",
  cancelText = "انصراف",
  onConfirm,
}: Props) {
  const descriptionId = `alert-dialog-description-${dialogIdCounter++}`;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{button}</AlertDialogTrigger>

      <AlertDialogContent
        aria-describedby={descriptionId}
        className="
          bg-card text-card-foreground 
          border border-border 
          rounded-lg shadow-lg shadow-muted/30
          animate-in fade-in-0 slide-in-from-bottom-2
          p-5 sm:p-6
          w-[90%] sm:max-w-sm
          transition-all duration-300
        "
      >
        <AlertDialogHeader className="space-y-1.5">
          <AlertDialogTitle
            className="
              text-start 
              text-sm font-semibold
              text-[var(--color-tint-blue-600)]
              tracking-tight
            "
          >
            {alertTitle}
          </AlertDialogTitle>

          {alertDescription ? (
            <AlertDialogDescription
              id={descriptionId}
              className="text-sm sm:text-sm text-muted-foreground leading-relaxed"
            >
              {alertDescription}
            </AlertDialogDescription>
          ) : (
            <span id={descriptionId} className="sr-only">
              {alertTitle}
            </span>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-5 flex justify-center gap-2.5 flex-wrap">
          <AlertDialogCancel
            className="
              bg-[var(--color-destructive-light)] text-white
              hover:bg-[var(--color-destructive)]
              transition-all duration-200
              px-4 sm:px-5 py-2 rounded-md
              font-medium text-xs sm:text-sm
              shadow-sm hover:shadow-md
              focus:ring-2 focus:ring-[var(--color-destructive-light)] focus:outline-none
            "
          >
            {cancelText}
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className="
              bg-[var(--color-success-light)] text-white
              hover:bg-[var(--color-success)]
              transition-all duration-200
              px-4 sm:px-5 py-2 rounded-md
              font-semibold text-xs sm:text-sm
              shadow-sm hover:shadow-md
              focus:ring-2 focus:ring-[var(--color-success-light)] focus:outline-none
            "
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
