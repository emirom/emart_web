import { GetProductsParams, GetVariantsParams } from "@lib/schemas";
type PageFilter = {
  page: number;
};
export type VariantFilter = Partial<GetVariantsParams> & PageFilter;

export type ProductFilter = Partial<GetProductsParams> & PageFilter;
