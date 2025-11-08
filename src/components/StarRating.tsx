"use client";

import { Star } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "./lib/utils";

interface StarRatingProps {
  maxStars?: number;
  value?: number;
  onChange?: (value: number) => void;
  size?: number;
  className?: string;
  label?: string;
}

export default function StarRating({
  maxStars = 5,
  value = 0,
  onChange,
  size = 28,
  className,
  label = "امتیاز ستاره‌ای",
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(value);

  useEffect(() => {
    setRating(value);
  }, [value]);

  const handleClick = useCallback(
    (index: number) => {
      setRating(index);
      onChange?.(index);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick(index);
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = Math.min(maxStars, index + 1);
        handleClick(next);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        const prev = Math.max(1, index - 1);
        handleClick(prev);
      }
    },
    [handleClick, maxStars]
  );

  const handleTouch = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left;
      const starWidth = rect.width / maxStars;
      const touchedIndex = Math.ceil(touchX / starWidth);
      if (touchedIndex >= 1 && touchedIndex <= maxStars) {
        setHovered(touchedIndex);
      }
    },
    [maxStars]
  );

  const handleTouchEnd = useCallback(() => {
    if (hovered) {
      setRating(hovered);
      onChange?.(hovered);
    }
    setHovered(null);
  }, [hovered, onChange]);

  const stars = useMemo(() => {
    return Array.from({ length: maxStars }, (_, i) => {
      const index = i + 1;
      const isFilled = hovered ? index <= hovered : index <= rating;

      return (
        <button
          key={index}
          type="button"
          role="radio"
          aria-checked={rating === index}
          aria-label={`${index} از ${maxStars} ستاره`}
          tabIndex={rating === index ? 0 : -1}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onClick={() => handleClick(index)}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className="focus:outline-none"
        >
          <Star
            size={size}
            className={cn(
              "cursor-pointer transition-all duration-200 active:scale-95",
              isFilled
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300 hover:text-yellow-300"
            )}
            aria-hidden="true"
          />
        </button>
      );
    });
  }, [maxStars, rating, hovered, handleClick, handleKeyDown, size]);

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "flex items-center justify-center gap-1 select-none",
        className
      )}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={handleTouchEnd}
    >
      {stars}
    </div>
  );
}
