"use client";

import { ArrowLeftRight, HeartIcon } from "lucide-react";
import Link from "next/link";
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
      className="w-full max-w-[97%] md:max-w-[95%] lg:max-w-[85%] mx-auto py-5 overflow-hidden"
      aria-label={labelAria}
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {title && (
        <header>
          <h2
            className="text-sm lg:text-lg font-bold mb-2 text-gray-900"
            itemProp="name"
          >
            {title}
          </h2>
        </header>
      )}

      <div className="relative -mx-[4%] md:-mx-[3%] lg:-mx-[2%]">
        <Carousel
          className="px-[5%] sm:px-[4%] md:px-[3%] lg:px-[2%]"
          aria-label={`${labelAria} - لیست محصولات`}
        >
          <CarouselContent className="-ml-3">
            {items.map((_, indx) => {
              const isLCP = indx === 0;
              return (
                <CarouselItem
                  key={indx}
                  className="pl-3 select-none basis-[80%] sm:basis-[45%] md:basis-[40%] lg:basis-[35%] xl:basis-[20%]"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <article
                    className="border overflow-hidden border-gray-100 rounded-lg p-2 relative"
                    itemProp="item"
                  >
                    <Link
                      href={`/product/${indx + 1}`}
                      className="w-full h-full block focus:outline-none"
                      itemProp="url"
                    >
                      <figure>
                        <CustomImage
                          src="/images/related-porduct.png"
                          alt={`آیفون 13 پرو مکس - محصول شماره ${indx + 1}`}
                          fill
                          priority={isLCP}
                          fetchPriority={isLCP ? "high" : "auto"}
                          sizes="(max-width: 640px) 80vw,
                                 (max-width: 768px) 45vw,
                                 (max-width: 1024px) 40vw,
                                 (max-width: 1280px) 35vw,
                                 20vw"
                          loading={isLCP ? "eager" : "lazy"}
                          placeholder={isLCP ? "empty" : undefined}
                          className={cn(
                            "w-1/2 h-1/2 mx-auto object-cover aspect-[8/7]",
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
                        className="bg-sky-blue leading-5 justify-center text-sm text-sky-500 absolute rounded-lg right-2 top-2 p-2 font-bold"
                      >
                        ۵٪
                      </span>

                      <p
                        className="text-xs mt-5 font-bold line-through text-sky-500"
                        itemProp="price"
                        content="90000000"
                      >
                        90,000,000 تومان
                      </p>
                      <p
                        className="text-md mt-2 font-bold text-sky-500"
                        itemProp="price"
                        content="85500000"
                      >
                        85,500,000 تومان
                      </p>

                      <p
                        className="text-xs mt-2 font-bold text-sky-500"
                        itemProp="name"
                      >
                        آیفون 13 پرو مکس | 5G | رم 16 | حافظه 128
                      </p>

                      <div
                        className="flex items-center gap-2 my-2 mt-4"
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
                          className="inline-block w-2 h-2 bg-green-200 rounded-full"
                        />
                        <p className="text-md font-bold text-sky-500">
                          موجود در انبار
                        </p>
                      </div>
                    </Link>

                    <div className="flex items-stretch gap-1 mt-2">
                      <Button
                        aria-label="افزودن به سبد خرید"
                        className="bg-sky-blue grow text-sky-600 rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                      >
                        افزودن به سبد خرید
                      </Button>
                      <Button
                        aria-label="افزودن به علاقه‌مندی‌ها"
                        className="bg-sky-blue text-sky-600 rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                      >
                        <HeartIcon aria-hidden="true" />
                      </Button>
                      <Button
                        aria-label="مقایسه محصول"
                        className="bg-sky-blue text-sky-600 rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                      >
                        <ArrowLeftRight aria-hidden="true" />
                      </Button>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious aria-label="محصول قبلی" />
          <CarouselNext aria-label="محصول بعدی" />
        </Carousel>
      </div>
    </section>
  );
}
