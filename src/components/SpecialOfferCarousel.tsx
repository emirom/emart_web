"use client";

import SpecialOfferItem from "./SpecialOfferItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function SpecialOfferCarousel({
  labelAria,
}: {
  labelAria: string;
}) {
  const items = Array.from({ length: 10 }, (_, i) => i);

  return (
    <section
      className="mx-auto py-6 bg-orange-700  relative  mt-5 rounded-lg"
      aria-label={labelAria}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <div className="">
        <Carousel
          className="px-[4%] sm:px-[3%] md:px-[2%] lg:px-[1.5%]"
          aria-label={`${labelAria} - لیست محصولات`}
        >
          <CarouselContent className="-ml-3">
            {items.map((_, indx) => {
              return (
                <CarouselItem
                  key={indx}
                  className="pl-0 select-none basis-[80%] sm:basis-[45%] md:basis-[40%] lg:basis-[30%] xl:basis-[20%]"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <SpecialOfferItem key={indx} indx={indx} isLCP />
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious
            aria-label="محصول قبلی"
            className="hidden lg:flex items-center justify-center absolute left-0 -translate-x-5  top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-50 rounded-full w-9 h-9 border border-gray-200"
          />
          <CarouselNext
            aria-label="محصول بعدی"
            className="hidden lg:flex items-center justify-center absolute right-0 translate-x-5  top-1/2 -translate-y-1/2 z-30 bg-white shadow-md hover:bg-gray-50 rounded-full w-9 h-9 border border-gray-200"
          />
        </Carousel>
      </div>
    </section>
  );
}
