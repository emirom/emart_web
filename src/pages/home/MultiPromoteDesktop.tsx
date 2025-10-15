import CustomImage from "@components/CustomImage";
import { Button } from "@components/ui/button";
import MultiPromoteAttribute from "./MultiPromoteAttribute";
import MultiPromoteIcon from "./MultiPromoteIcon";
import MultiPromoteProductList from "./MultiPromoteProductList";
import SquareBadge from "./SquareBadge";

export default function MultiPromoteDesktop() {
  return (
    <section
      aria-label="پیشنهاد ویژه محصولات"
      itemScope
      itemType="https://schema.org/Offer"
      className="hidden lg:grid grid-cols-12 border border-gray-100 rounded-lg overflow-hidden"
    >
      <div className="col-span-5 flex flex-col justify-center border-l border-gray-100 p-10 bg-white">
        <div className="flex flex-col items-center text-center gap-5">
          <div className="flex items-center gap-2">
            <MultiPromoteIcon />
            <h2 className="text-red-800 text-lg font-bold">
              یه تیر و چند نشون..!
            </h2>
          </div>
          <p className="text-tint-blue-500 font-bold text-sm">
            می‌تونی این محصولات رو یه جا با یه تخفیف تکرارنشدنی دریافت کنی!
          </p>
          <div className="flex gap-2 justify-center">
            <SquareBadge value="۱۵" label="دقیقه" />
            <SquareBadge value="۱۵" label="ساعت" />
            <SquareBadge value="۱" label="روز" />
          </div>
          <Button
            aria-label="افزودن همه محصولات به سبد خرید"
            className="w-full bg-tint-blue-500 mt-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-tint-blue-400"
          >
            افزودن به سبد خرید
          </Button>
        </div>
      </div>
      <div className="col-span-7 bg-white">
        <div className="p-10 flex flex-col lg:flex-row items-stretch gap-6">
          <article className="flex-1 flex flex-col gap-3">
            <h3 className="text-tint-blue-500 font-bold text-base">
              آیفون 13 پرو مکس
            </h3>
            <div className="flex items-center gap-4">
              <div>
                <span className="text-red-500 line-through text-xs font-bold">
                  ۱۱,۰۰۰,۰۰۰
                </span>
                <span className="text-red-500 block font-bold text-base">
                  ۱۲,۰۰۰,۰۰۰ تومان
                </span>
              </div>
            </div>
            <p className="text-tint-blue-500 font-bold text-[0.625rem] text-justify">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            </p>
          </article>
          <div className="flex flex-col gap-3 self-center ml-auto">
            <MultiPromoteAttribute />
          </div>
          <figure className="relative w-[130px] flex-shrink-0 overflow-hidden rounded-lg my-auto">
            <CustomImage
              src="/images/related-porduct.png"
              alt="آیفون 13 پرو مکس"
              fill
              priority
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 130px"
              className="object-cover aspect-[13/12]"
              itemProp="image"
            />
          </figure>
        </div>
        <div className="p-1 border-t border-gray-100 text-center text-gray-500 text-sm">
          <MultiPromoteProductList />
        </div>
      </div>
    </section>
  );
}
