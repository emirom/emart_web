"use client";

import CustomImage from "@components/CustomImage";
import { cn } from "@components/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";
import Link from "next/link";

export default function RelatedCarousel() {
  const items = Array.from({ length: 10 }, (_, i) => i);

  return (
    <section
      className="w-full max-w-[97%] md:max-w-[95%] lg:max-w-[85%] mx-auto py-5 overflow-hidden"
      aria-label="Related products carousel"
    >
      <h1 className="text-sm lg:text-lg font-bold mb-2 text-gray-900">
        محصولات مشابه
      </h1>

      <div className="relative -mx-[4%] md:-mx-[3%] lg:-mx-[2%]">
        <Carousel className="px-[5%] sm:px-[4%] md:px-[3%] lg:px-[2%]">
          <CarouselContent className="-ml-3">
            {items.map((_, indx) => {
              const isLCP = indx >= 0;
              return (
                <CarouselItem
                  key={indx}
                  className="pl-3 select-none basis-[60%] sm:basis-[40%] md:basis-[30%] lg:basis-[22%] xl:basis-[18%]"
                >
                  <article className="bg-sky-blue p-5 rounded-md   aspect-[21/20]  sm:aspect-[19/18] md-[14/12] lg:aspect-[10/9] 2xl:aspect-[10/9] ">
                    <figure className="relative w-full h-full overflow-hidden">
                      <Link
                        href="/"
                        className="w-full h-full block focus:outline-none"
                      >
                        <CustomImage
                          src="/images/related-porduct.png"
                          alt={`تصویر محصول ${indx + 1}`}
                          fill
                          priority={isLCP}
                          fetchPriority={isLCP ? "high" : "auto"}
                          sizes="100vw"
                          loading={isLCP ? "eager" : "lazy"}
                          placeholder={isLCP ? "empty" : undefined}
                          className={cn(
                            "h-full w-full object-cover",
                            isLCP && "!opacity-100 !duration-0"
                          )}
                          style={
                            isLCP
                              ? { opacity: 1, transition: "none" }
                              : undefined
                          }
                        />
                      </Link>
                      <figcaption className="sr-only">
                        تصویر محصول {indx + 1}
                      </figcaption>
                    </figure>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="hidden" aria-label="محصول قبلی" />
          <CarouselNext className="hidden" aria-label="محصول بعدی" />
        </Carousel>
      </div>
    </section>
  );
}
