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
      aria-label="محصولات مشابه"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      <header>
        <h2
          className="text-sm lg:text-lg font-bold mb-2 text-gray-900"
          itemProp="name"
        >
          محصولات مشابه
        </h2>
      </header>

      <div className="relative -mx-[4%] md:-mx-[3%] lg:-mx-[2%]">
        <Carousel
          className="px-[5%] sm:px-[4%] md:px-[3%] lg:px-[2%]"
          aria-label="لیست محصولات مشابه"
        >
          <CarouselContent className="-ml-3">
            {items.map((_, indx) => {
              const isLCP = indx <= 5;

              return (
                <CarouselItem
                  key={indx}
                  className="pl-3 select-none basis-[60%] sm:basis-[40%] md:basis-[30%] lg:basis-[22%] xl:basis-[18%]"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/Product"
                >
                  <article
                    className="bg-sky-blue p-5 rounded-md aspect-[21/20] sm:aspect-[19/18] md:aspect-[14/12] lg:aspect-[10/9] 2xl:aspect-[10/9]"
                    itemProp="item"
                  >
                    <figure
                      className="relative w-full h-full overflow-hidden"
                      itemProp="image"
                    >
                      <Link
                        href={`/product/${indx + 1}`}
                        className="w-full h-full block focus:outline-none"
                        itemProp="url"
                      >
                        <CustomImage
                          src="/images/related-porduct.png"
                          alt={`خرید آیفون 13 پرو مکس حافظه 128 گیگ و رم 16 گیگ - محصول شماره ${indx + 1}`}
                          fill
                          priority={isLCP}
                          fetchPriority={isLCP ? "high" : "auto"}
                          sizes="(max-width: 640px) 60vw,
                                 (max-width: 768px) 40vw,
                                 (max-width: 1024px) 30vw,
                                 (max-width: 1280px) 22vw,
                                 18vw"
                          loading={isLCP ? "eager" : "lazy"}
                          placeholder={isLCP ? "empty" : undefined}
                          className={cn(
                            "w-[80%] h-[80%] m-auto object-cover",
                            isLCP && "!opacity-100 !duration-0",
                          )}
                          style={
                            isLCP
                              ? { opacity: 1, transition: "none" }
                              : undefined
                          }
                        />
                      </Link>

                      <figcaption className="sr-only">
                        آیفون 13 پرو مکس 128 گیگابایت - 5G
                      </figcaption>
                    </figure>

                    <meta itemProp="brand" content="Apple" />
                    <meta itemProp="sku" content={`iphone13-${indx}`} />
                    <meta itemProp="name" content="iPhone 13 Pro Max 128GB" />
                    <meta itemProp="priceCurrency" content="IRR" />
                    <meta itemProp="price" content="90000000" />
                    <link
                      itemProp="availability"
                      href="https://schema.org/InStock"
                    />
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
