import CustomImage from "@components/CustomImage";
import { cn } from "@components/lib/utils";

export default function MultiPromoteProductList() {
  return (
    <ul
      className="grid grid-cols-2 sm:grid-cols-4 gap-2 lg:gap-1"
      aria-label="لیست محصولات پیشنهادی"
      itemScope
      itemType="https://schema.org/ItemList"
    >
      {Array.from({ length: 4 }, (_, indx) => (
        <li
          key={indx}
          className="relative border border-gray-100 w-full p-2 rounded-lg overflow-hidden lg:rounded-none"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/Product"
        >
          <span
            aria-label="تخفیف"
            className="bg-red-500 p-1 rounded-bl-xl text-xs text-white absolute top-0 right-0 z-10 font-bold"
          >
            ۵٪
          </span>
          <figure className="relative w-[110px] mx-auto ">
            <CustomImage
              src="/images/related-porduct.png"
              alt={`آیفون 13 پرو مکس - محصول شماره ${indx + 1}`}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 20vw"
              loading="lazy"
              fetchPriority="low"
              className={cn("object-cover aspect-[13/12]  rounded-lg")}
              itemProp="image"
            />
          </figure>

          <div className="mt-2 flex flex-col gap-1 text-tint-blue-500 font-bold text-xs sm:text-sm">
            <span itemProp="name">هندزفری بلوتوثی</span>
            <span>Generation ANC</span>

            <span
              className="text-red-500 text-center line-through text-xs  font-bold sm:text-sm block"
              itemProp="price"
              content="20000000"
            >
              ۲۰۰۰۰۰۰۰
            </span>

            <span
              className="text-red-500 font-bold text-center block"
              itemProp="price"
              content="1500000"
            >
              1,500,000 تومان
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
