"use client";

import CustomImage from "@components/CustomImage";
import { cn } from "@components/lib/utils";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const SLIDES = 5;

export default function ProductSlider() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((i: number) => {
    setCarouselIndex((i + SLIDES) % SLIDES);
  }, []);

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(carouselIndex + 1);
      if (e.key === "ArrowLeft") goTo(carouselIndex - 1);
    },
    [carouselIndex, goTo],
  );

  useEffect(() => {
    const el = containerRef.current;
    el?.addEventListener("keydown", onKey);
    return () => el?.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="relative overflow-hidden outline-none"
      aria-roledescription="carousel"
      aria-label="اسلایدر محصولات"
    >
      <ul
        className="flex transition-transform duration-500 ease-in-out will-change-transform"
        style={{ transform: `translateX(${-carouselIndex * 100}%)` }}
      >
        <li
          className={cn(
            "w-full flex-shrink-0 relative",
            carouselIndex !== 0 && "pointer-events-none",
          )}
          aria-hidden={carouselIndex !== 0}
        >
          <Link
            href="/"
            tabIndex={carouselIndex === 0 ? 0 : -1}
            className="w-full h-full block relative rounded-lg focus:outline-none"
          >
            <CustomImage
              src="/images/slider-image.png"
              alt="اسلاید شماره ۱"
              fill
              priority
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 80vw, 70vw"
              className="aspect-[16/4] lg:aspect-[19/4] rounded-lg object-cover"
            />
          </Link>
        </li>

        {Array.from({ length: SLIDES - 1 }, (_, ind) => {
          const index = ind + 1;
          const isActive = index === carouselIndex;

          return (
            <li
              key={index}
              className={cn(
                "w-full flex-shrink-0 relative",
                !isActive && "pointer-events-none",
              )}
              aria-hidden={!isActive}
            >
              <Link
                href="/"
                tabIndex={isActive ? 0 : -1}
                className="w-full h-full block relative rounded-lg focus:outline-none"
              >
                <CustomImage
                  src="/images/slider-image.png"
                  alt={`اسلاید شماره ${index + 1}`}
                  fill
                  loading="lazy"
                  fetchPriority="auto"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 80vw, 70vw"
                  className="aspect-[16/4] lg:aspect-[19/4] rounded-lg object-cover"
                />
              </Link>
            </li>
          );
        })}
      </ul>

      <div
        className="flex items-center justify-center absolute right-0 left-0 bottom-1 z-40 mx-auto w-[60%] gap-2"
        role="tablist"
        aria-label="ناوبری اسلایدها"
      >
        {Array.from({ length: SLIDES }, (_, ind) => {
          const active = carouselIndex === ind;
          return (
            <button
              key={ind}
              title={`آیتم ${ind + 1}`}
              aria-label={`آیتم ${ind + 1}`}
              aria-selected={active}
              role="tab"
              onClick={() => setCarouselIndex(ind)}
              className={cn(
                "rounded-full outline-none flex items-center justify-center transition-all duration-200 ease-in-out cursor-pointer",
                "w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 xl:w-12 xl:h-12",
                "hover:scale-110",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "block rounded-full transition-all duration-200",
                  active
                    ? "bg-gray-100 w-5 h-2.5 sm:w-6 sm:h-3 md:w-7 md:h-3.5 lg:w-8 lg:h-4"
                    : "bg-white w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
