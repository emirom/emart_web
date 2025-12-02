import ProductShoppingList from "./ProductShoppingList";
import ShoppingStep from "./ShoppingStep";

export default function ShoppingCardDesktopMode() {
  return (
    <div className="hidden lg:flex items-stretch h-full gap-3">
      <ProductShoppingList />
      <ShoppingStep />
    </div>
  );
}
