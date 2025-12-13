import CartCounter from "@components/CartCounter";
import CustomImage from "@components/CustomImage";

export default function ShoppingCardList() {
  return (
    <div className="border-b border-b-gray-100 py-2">
      <h2 className="text-sm font-medium text-tint-blue-500 my-2">
        سبد خرید شما | 4 عدد کالا
      </h2>
      <ul className="grid grid-cols-2 sm:grid-cols-3">
        {Array.from({ length: 4 }, (_, i) => (
          <li key={i} className="border border-gray-100 p-2">
            <figure
              className="aspect-[2/2] flex items-center justify-center"
              role="figure"
            >
              <CustomImage
                src="/images/mobile-ex.png"
                alt="image"
                fill
                className="w-[80%] h-[80%] "
              />
            </figure>
            <CartCounter />
          </li>
        ))}
        <li className="border border-gray-100 p-2 py-4 flex flex-col justify-between gap-4 items-center text-tint-blue-500 text-center">
          <span className="text-sm font-medium">خریدت تموم نشده..؟</span>
          <span className=" w-10 h-10 rounded-full bg-tint-blue-500 flex items-center justify-center text-whit-smoke font-bold text-lg leading-10">
            +
          </span>
          <p className="text-xs font-medium">
            محصولت رو اضافه کن و از همینجا ادامه بده
          </p>
        </li>
      </ul>
    </div>
  );
}
