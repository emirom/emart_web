"use client";

import { ArrowLeftRight, HeartIcon } from "lucide-react";
import Link from "next/link";
import Container from "./Container";
import CustomImage from "./CustomImage";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type Props = {
  title?: string;
  labelAria: string;
};

export default function ShareCarousel({ title, labelAria }: Props) {
  const items = Array.from({ length: 10 }, (_, i) => i);

  return (
    <section
      className="mx-auto py-6 overflow-hidden w-[97%] md:w-[95%]"
      aria-label={labelAria}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {title && (
        <header className="mb-3">
          <Container>
            <h2
              className="text-sm lg:text-lg font-bold text-gray-900"
              itemProp="name"
            >
              {title}
            </h2>
          </Container>
        </header>
      )}

      <div className="relative">
        <Carousel
          className="px-[4%] sm:px-[3%] md:px-[2%] lg:px-[1.5%]"
          aria-label={`${labelAria} - لیست محصولات`}
        >
          <CarouselContent className="-ml-3">
            {items.map((_, indx) => {
              const isLCP = indx === 0;

              return (
                <CarouselItem
                  key={indx}
                  className="pl-3 select-none basis-[80%] sm:basis-[45%] md:basis-[40%] lg:basis-[30%] xl:basis-[20%]"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <article
                    className="border border-gray-100 rounded-lg overflow-hidden p-2 relative shadow-sm hover:shadow-md transition-shadow"
                    itemProp="item"
                  >
                    <Link
                      href={`/product/${indx + 1}`}
                      className="block w-full h-full focus-visible:outline-none"
                      itemProp="url"
                    >
                      <figure className="relative w-full  overflow-hidden rounded-md bg-gray-50">
                        <CustomImage
                          src="/images/related-porduct.png"
                          alt={`آیفون 13 پرو مکس - محصول شماره ${indx + 1}`}
                          fill
                          priority={isLCP}
                          fetchPriority={isLCP ? "high" : "auto"}
                          loading={isLCP ? "eager" : "lazy"}
                          placeholder={isLCP ? "empty" : undefined}
                          sizes="(max-width: 640px) 80vw,
                                 (max-width: 768px) 45vw,
                                 (max-width: 1024px) 35vw,
                                 (max-width: 1280px) 25vw,
                                 20vw"
                          className={cn(
                            " w-[40%] h-[48%] mx-auto  aspect-[16/15] transition-opacity duration-300",
                            isLCP && "!opacity-100 !duration-0",
                          )}
                          style={
                            isLCP
                              ? { opacity: 1, transition: "none" }
                              : undefined
                          }
                          itemProp="image"
                        />
                        <figcaption className="sr-only">
                          آیفون 13 پرو مکس - حافظه 128GB - رم 16GB
                        </figcaption>
                      </figure>

                      <meta itemProp="brand" content="Apple" />
                      <meta itemProp="sku" content={`iphone13-${indx}`} />

                      <span
                        aria-label="تخفیف"
                        className="absolute right-2 top-2 bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded-lg"
                      >
                        ۵٪ تخفیف
                      </span>

                      <div className="mt-4 space-y-1">
                        <p
                          className="text-xs font-bold line-through text-gray-400"
                          itemProp="price"
                          content="90000000"
                        >
                          90,000,000 تومان
                        </p>

                        <p
                          className="text-base font-bold text-sky-600"
                          itemProp="price"
                          content="85500000"
                        >
                          85,500,000 تومان
                        </p>

                        <p
                          className="text-xs font-bold text-gray-800 line-clamp-2"
                          itemProp="name"
                        >
                          آیفون 13 پرو مکس | 5G | رم 16 | حافظه 128
                        </p>
                      </div>

                      <div
                        className="flex items-center gap-2 mt-3"
                        itemProp="offers"
                        itemScope
                        itemType="https://schema.org/Offer"
                      >
                        <link
                          itemProp="availability"
                          href="https://schema.org/InStock"
                        />
                        <span
                          aria-hidden="true"
                          className="inline-block w-2 h-2 bg-green-400 rounded-full"
                        />
                        <p className="text-xs font-medium text-green-700">
                          موجود در انبار
                        </p>
                      </div>
                    </Link>

                    <div className="flex items-stretch gap-1 mt-3">
                      <Button
                        aria-label="افزودن به سبد خرید"
                        className="bg-blue-50 grow text-sky-600 rounded-lg hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                      >
                        افزودن به سبد
                      </Button>
                      <Button
                        aria-label="افزودن به علاقه‌مندی‌ها"
                        className="bg-blue-50 text-sky-600 rounded-lg hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                      >
                        <HeartIcon aria-hidden="true" />
                      </Button>
                      <Button
                        aria-label="مقایسه محصول"
                        className="bg-blue-50 text-sky-600 rounded-lg hover:bg-blue-100 focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                      >
                        <ArrowLeftRight aria-hidden="true" />
                      </Button>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious
            aria-label="محصول قبلی"
            className="hidden lg:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-50 rounded-full w-9 h-9 border border-gray-200"
          />
          <CarouselNext
            aria-label="محصول بعدی"
            className="hidden lg:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md hover:bg-gray-50 rounded-full w-9 h-9 border border-gray-200"
          />
        </Carousel>
      </div>
    </section>
  );
}
