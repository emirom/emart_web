import Link from "next/link";
import CustomImage from "./CustomImage";
import { cn } from "./lib/utils";
import TimerLine from "./TimeLiner";

export default function SpecialOfferItem({
  indx,
  isLCP,
}: {
  indx: number;
  isLCP?: boolean;
}) {
  return (
    <article
      className="border border-gray-100 bg-white overflow-hidden p-2 relative shadow-sm hover:shadow-md transition-shadow"
      itemProp="item"
    >
      <Link
        href={`/product/${indx + 1}`}
        className="block w-full h-full focus-visible:outline-none"
        itemProp="url"
        role="link"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-red-800 font-bold w-full" itemProp="name">
            پیشنهاد ویژه
          </h2>
          <span
            aria-label="تخفیف"
            className="bg-red-800 text-nowrap text-white text-xs font-bold px-2 py-1 rounded-lg"
          >
            ۵٪ تخفیف
          </span>
        </div>

        <TimerLine initialTime={3600} />

        <figure className="relative w-full flex items-center justify-center aspect-[23/15] overflow-hidden rounded-md bg-gray-50">
          <CustomImage
            src="/images/related-porduct.png"
            alt={`آیفون 13 پرو مکس - محصول شماره ${indx + 1}`}
            fill
            priority={isLCP}
            fetchPriority={isLCP ? "high" : "auto"}
            loading={isLCP ? "eager" : "lazy"}
            placeholder={isLCP ? "empty" : undefined}
            sizes="(max-width: 640px) 40vw,
                   (max-width: 768px) 22.5vw,
                   (max-width: 1024px) 17.5vw,
                   (max-width: 1280px) 12.5vw,
                   10vw"
            className={cn(
              "w-1/2 h-[75%] transition-opacity duration-300",
              isLCP && "!opacity-100 !duration-0",
            )}
            style={isLCP ? { opacity: 1, transition: "none" } : undefined}
            itemProp="image"
            aria-label="تصویر محصول آیفون 13 پرو مکس"
          />
          <figcaption className="sr-only">
            آیفون 13 پرو مکس - حافظه 128GB - رم 16GB
          </figcaption>
        </figure>

        <meta itemProp="brand" content="Apple" />
        <meta itemProp="sku" content={`iphone13-${indx}`} />

        <div className="mt-4 text-center space-y-1">
          <p className="text-base font-bold text-tint-blue-500">
            سامسونگ اس 25 الترا
          </p>

          <p
            className="text-md font-bold text-tint-blue-500 line-clamp-2"
            itemProp="price"
            content="88500000"
          >
            88,500,000 تومان
          </p>
          <p
            className="text-xs font-bold line-through text-gray-400"
            itemProp="price"
            content="90000000"
          >
            <small>90,000,000 تومان</small>
          </p>
        </div>
      </Link>
    </article>
  );
}
