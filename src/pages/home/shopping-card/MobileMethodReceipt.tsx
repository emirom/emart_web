import MobileShippingMethods from "./MobileShippingMethods";
import ShoppingCardList from "./ShoppingCardList";

export default function MobileMethodReceipt() {
  return (
    <>
      <header className="text-sm font-medium text-tint-blue-500 py-1 border-b border-b-gray-100">
        <h1>انتخاب آدرس و روش دریافت کالا</h1>
      </header>
      <MobileShippingMethods />
      <ShoppingCardList />
    </>
  );
}
