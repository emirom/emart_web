"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "./lib/utils";

interface StarRatingProps {
  maxStars?: number;
  value?: number;
  onChange?: (value: number) => void;
  size?: number;
  className?: string;
}

export default function StarRating({
  maxStars = 5,
  value = 0,
  onChange,
  size = 28,
  className,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(value);

  const handleClick = (index: number) => {
    setRating(index);
    onChange?.(index);
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    // لمس روی موبایل برای تعیین امتیاز
    const rect = e.currentTarget.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    const starWidth = rect.width / maxStars;
    const touchedIndex = Math.ceil(touchX / starWidth);
    if (touchedIndex >= 1 && touchedIndex <= maxStars) {
      setHovered(touchedIndex);
    }
  };

  const handleTouchEnd = () => {
    if (hovered) {
      setRating(hovered);
      onChange?.(hovered);
    }
    setHovered(null);
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1 select-none",
        className,
      )}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={handleTouchEnd}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const index = i + 1;
        const isFilled = hovered ? index <= hovered : index <= rating;

        return (
          <Star
            key={index}
            size={size}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "cursor-pointer transition-all duration-200 active:scale-95",
              isFilled
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 hover:text-yellow-300",
            )}
          />
        );
      })}
    </div>
  );
}
