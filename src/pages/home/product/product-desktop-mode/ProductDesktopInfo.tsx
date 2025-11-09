import ProductPricingSection from "../ProductPricingSection";
import ProductDetails from "./ProductDetails";
import ProductImages from "./ProductImages";
import ProductMainView from "./ProductMainView";

export default function ProductDesktopInfo() {
  return (
    <div className="hidden lg:grid grid-cols-12 justify-between gap-4 items-stretch">
      <ProductImages />
      <ProductMainView />
      <div className="col-span-6">
        <div className="shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold text-[#083047]">
            گوشی موبايل آیفون 13 پرو مکس
          </h2>
          <ProductDetails />
        </div>
        <ProductPricingSection />
      </div>
    </div>
  );
}
