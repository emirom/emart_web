"use client";

import { useTranslations } from "next-intl";
import * as React from "react";
import { cn } from "./lib/utils";

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label?: string;
}

function FormLabelComponent({ label, className, ...props }: FormLabelProps) {
  const t = useTranslations();
  if (!label) return null;

  return (
    <label className={cn("block text-sm font-medium", className)} {...props}>
      {t(label)}
    </label>
  );
}

export const FormLabel = React.memo(FormLabelComponent);
