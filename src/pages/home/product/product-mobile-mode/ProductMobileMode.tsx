import ProductGuarantees from "../ProductGuarantees";
import ProductReview from "../ProductReview";
import MobileProductSpecifications from "./MobileProductSpecifications";
import ProductMobileInfo from "./ProductMobileInfo";

export default function ProductMobileMode() {
  return (
    <>
      <ProductMobileInfo />
      <ProductGuarantees />
      <MobileProductSpecifications />
      <ProductReview />
    </>
  );
}
