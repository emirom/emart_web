import ProductGuarantees from "../ProductGuarantees";
import ProductDesktopInfo from "./ProductDesktopInfo";
import ProductSupport from "./ProductSupport";
import ProductTab from "./ProductTab";

export default function ProductDesktopMode() {
  return (
    <div className="hidden lg:block">
      <ProductDesktopInfo />
      <ProductSupport />
      <ProductGuarantees />
      <ProductTab />
    </div>
  );
}
