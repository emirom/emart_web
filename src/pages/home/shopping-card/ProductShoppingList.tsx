import ProductShoppingCardItem from "./ProductShoppingCardItem";

export default function ProductShoppingList() {
  return (
    <article
      className="flex flex-col border border-[#0F4275]/40 rounded-2xl p-4 shadow-md bg-white h-[600px]"
      aria-label="سبد خرید محصول"
    >
      <h1 className="text-orange-500 text-sm font-semibold mb-6 text-center">
        سبد خرید محصول
      </h1>

      <div className="flex-1 overflow-y-scroll px-2 py-10">
        <ul className="space-y-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductShoppingCardItem key={index} />
          ))}
        </ul>
      </div>

      <div className="border-t border-[#0F4275]/40 pt-6 mt-4 flex flex-col gap-3 text-right">
        <div className="flex items-center justify-between text-[#0F4275] font-semibold">
          <span>مجموع قیمت</span>
          <span className="font-medium text-[18px]">۳,۱۵۰,۰۰۰,۰۰۰ تومان</span>
        </div>

        <div className="flex items-center justify-between text-orange-500 font-semibold">
          <span>مبلغ قابل پرداخت</span>
          <span className="text-[18px] font-bold">۳,۱۵۰,۰۰۰,۰۰۰ تومان</span>
        </div>
      </div>
      <div id="shopping-submit-button"></div>
    </article>
  );
}
