import { ArrowLeftRight, HeartIcon } from "lucide-react";
import Link from "next/link";
import CustomImage from "./CustomImage";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";

export default function ProductItem({ isLCP }: { isLCP?: boolean }) {
  return (
    <article
      className="border border-gray-100 rounded-lg overflow-hidden p-2 relative shadow-sm hover:shadow-md transition-shadow"
      itemProp="item"
    >
      <Link
        href={`/product`}
        className="block w-full h-full focus-visible:outline-none"
      >
        <figure className="relative w-full  overflow-hidden rounded-md bg-gray-50">
          <CustomImage
            src="/images/related-porduct.png"
            alt={`آیفون 13 پرو مکس - محصول شماره `}
            fill
            priority={isLCP}
            fetchPriority={isLCP ? "high" : "auto"}
            loading={isLCP ? "eager" : "lazy"}
            placeholder={isLCP ? "empty" : undefined}
            sizes="(max-width: 640px) 32vw,
                                 (max-width: 768px) 18vw,
                                 (max-width: 1024px) 14vw,
                                 (max-width: 1280px) 10vw,
                                 8vw"
            className={cn(
              " w-[40%] h-[48%] mx-auto  aspect-[16/15] transition-opacity duration-300",
              isLCP && "!opacity-100 !duration-0",
            )}
            style={isLCP ? { opacity: 1, transition: "none" } : undefined}
            itemProp="image"
          />
          <figcaption className="sr-only">
            آیفون 13 پرو مکس - حافظه 128GB - رم 16GB
          </figcaption>
        </figure>

        <meta itemProp="brand" content="Apple" />
        <meta itemProp="sku" content={`iphone13`} />

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
          <link itemProp="availability" href="https://schema.org/InStock" />
          <span
            aria-hidden="true"
            className="inline-block w-2 h-2 bg-green-400 rounded-full"
          />
          <p className="text-xs font-medium text-green-700">موجود در انبار</p>
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
  );
}
