"use client";

import { cn } from "@components/lib/utils";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
type Props = {
  onClick: () => void;
  label?: string;
  className?: string;
};
export default function ShoppingCardPortalButton({
  onClick,
  label = "بررسی و ادامه",
  className,
}: Props) {
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    const el = document.getElementById("shopping-submit-button");
    if (el) setContainer(el);
  }, []);

  if (!container) return null;

  return createPortal(
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "mt-4 w-full rounded-xl py-4 text-center text-white text-sm font-semibold",
        "bg-[#CFCFCF] hover:bg-[#bdbdbd] transition-colors",
        className,
      )}
    >
      {label}
    </button>,
    container,
  );
}
