import CustomImage from "@components/CustomImage";
import { Button } from "@components/ui/button";
import MultiPromoteAttribute from "./MultiPromoteAttribute";
import MultiPromoteIcon from "./MultiPromoteIcon";
import MultiPromoteProductList from "./MultiPromoteProductList";
import SquareBadge from "./SquareBadge";

export default function MultiPromoteMobile() {
  return (
    <section
      className="rounded-lg flex flex-col gap-1 overflow-hidden p-2 lg:hidden"
      aria-label="پیشنهاد ویژه موبایل"
      itemScope
      itemType="https://schema.org/Offer"
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MultiPromoteIcon />
          <h2 className="text-tint-blue-500 text-sm font-bold">
            یه تیر و چند نشون..!
          </h2>
        </div>
        <div className="flex items-stretch gap-2 text-sm font-bold mb-2">
          <SquareBadge value="۱۵" label="دقیقه" />
          <SquareBadge value="۱۵" label="ساعت" />
          <SquareBadge value="۱" label="روز" />
        </div>
      </header>

      <article
        className="border border-gray-100 rounded-lg p-2 flex items-stretch gap-2"
        itemProp="itemOffered"
        itemScope
        itemType="https://schema.org/Product"
      >
        <figure className="relative my-auto  w-[140px] flex-shrink-0 overflow-hidden rounded-lg">
          <CustomImage
            src="/images/related-porduct.png"
            alt="آیفون 13 پرو مکس"
            fill
            priority
            fetchPriority="high"
            loading="eager"
            sizes="100vw"
            className="object-cover aspect-[13/12] my-auto"
            itemProp="image"
          />
        </figure>

        <div className="flex flex-col w-full justify-between px-2">
          <div>
            <h3
              className="text-tint-blue-500 font-bold text-sm"
              itemProp="name"
            >
              آیفون 13 پرو مکس
            </h3>
            <div
              className="inline-flex items-center justify-center mt-2 py-[0.125rem] px-3 rounded-full bg-red-500"
              aria-label="درصد تخفیف"
            >
              <span className="text-white text-sm font-bold">۸٪</span>
            </div>
          </div>

          <div className="mt-auto flex flex-col">
            <span
              className="text-red-500 text-xs line-through font-bold block"
              itemProp="price"
              content="10222222"
            >
              ۱۰۲۲۲۲۲۲
            </span>
            <span
              className="text-red-500 text-base font-bold block"
              itemProp="price"
              content="98500000"
            >
              98,500,000 تومان
            </span>
          </div>
        </div>

        <MultiPromoteAttribute />
      </article>

      <MultiPromoteProductList />

      <p className="text-tint-blue-500 font-bold text-center my-2 text-xs sm:text-sm md:text-base">
        می‌تونی این محصولات رو یه‌جا با یه تخفیف تکرار نشدنی دریافت کنی!
      </p>

      <Button
        aria-label="افزودن همه به سبد خرید"
        className="w-full bg-tint-blue-500 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-tint-blue-400"
      >
        افزودن به سبد خرید
      </Button>
    </section>
  );
}
