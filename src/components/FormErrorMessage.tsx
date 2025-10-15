"use client";

import React from "react";
import { cn } from "./lib/utils";

type Props = React.HTMLAttributes<HTMLParagraphElement> & {
  message?: string;
  className?: string;
};

export function FormErrorMessage({ message, className, ...props }: Props) {
  if (!message) return null;

  return (
    <p {...props} className={cn("text-destructive text-sm mt-1", className)}>
      {message}
    </p>
  );
}
