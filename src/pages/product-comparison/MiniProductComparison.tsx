import CustomImage from "@components/CustomImage";
import Link from "next/link";

export default function MiniProductComparison() {
  return (
    <div
      className="rounded-lg border border-red-600 p-4 flex flex-col gap-2"
      role="region"
      aria-labelledby="mini-product-comparison-title"
    >
      <h3
        id="mini-product-comparison-title"
        className="text-red-600 font-medium text-sm"
      >
        مقایسه محصول
      </h3>

      <div className="flex items-stretch gap-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <figure
            key={index}
            className="flex flex-col items-center justify-center gap-2 first:border-l border-l-red-500"
          >
            <CustomImage
              src="/images/mobile-ex.png"
              alt={`iPhone 13 Pro Max ${index + 1}`}
              width={90}
              height={90}
              className="w-full h-full flex items-center justify-center"
              priority={index === 0}
            />
            <figcaption className="text-xs text-wrap font-medium text-tint-blue-500 text-center">
              Iphone 13 Pro Max
            </figcaption>
          </figure>
        ))}
      </div>

      <Link
        href="#"
        role="button"
        className="w-full bg-sky-blue text-center rounded-lg p-3 text-tint-blue-500 cursor-pointer text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        بررسی جزئیات
      </Link>
    </div>
  );
}
