"use client";

import { Button } from "@components/ui/button";
import {
  ArrowRightLeft,
  HeartIcon,
  MessagesSquare,
  Play,
  Share2,
} from "lucide-react";
import { useState } from "react";

export default function ProductButtonAction() {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite((prev) => !prev);
  };

  const actions = [
    {
      icon: HeartIcon,
      label: "افزودن به علاقه‌مندی‌ها",
      color: isFavorite ? "fill-red-600" : "text-red-600",
      onClick: handleFavoriteClick,
    },
    {
      icon: ArrowRightLeft,
      label: "مقایسه محصول",
      color: "text-tint-blue-500",
      onClick: () => {},
    },
    {
      icon: MessagesSquare,
      label: "ارسال پیام",
      color: "text-tint-blue-500",
      onClick: () => {},
    },
    {
      icon: Share2,
      label: "اشتراک‌گذاری",
      color: "text-tint-blue-500",
      onClick: () => {},
    },
    {
      icon: Play,
      label: "نمایش ویدیو محصول",
      color: "text-tint-blue-500 fill-tint-blue-500",
      onClick: () => {},
    },
  ];

  return (
    <nav
      aria-label="دکمه‌های کنش محصول"
      className="flex flex-col justify-between gap-1 lg:flex-row lg:justify-end lg:gap-2 "
    >
      {actions.map(({ icon: Icon, label, color, onClick }) => (
        <Button
          key={label}
          type="button"
          aria-label={label}
          title={label}
          onClick={onClick}
          aria-pressed={
            label === "افزودن به علاقه‌مندی‌ها" ? isFavorite : undefined
          }
          className="rounded-lg bg-sky-blue focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-500 transition-all cursor-pointer"
        >
          <Icon className={color} aria-hidden="true" focusable="false" />
          <span className="sr-only">{label}</span>
        </Button>
      ))}
    </nav>
  );
}
