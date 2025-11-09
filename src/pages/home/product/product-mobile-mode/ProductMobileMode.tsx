"use client";

import Comments from "../Comments";
import ProductGuarantees from "../ProductGuarantees";
import ProductReview from "../ProductReview";
import MobileProductSpecifications from "./MobileProductSpecifications";
import ProductMobileInfo from "./ProductMobileInfo";
import ProductMobileTab from "./ProductMobileTab";

export default function ProductMobileMode() {
  return (
    <div className="lg:hidden">
      <ProductMobileTab />
      <ProductMobileInfo />
      <ProductGuarantees />
      <MobileProductSpecifications />
      <ProductReview />
      <Comments />
    </div>
  );
}
