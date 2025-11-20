import {
  GetColorsParams,
  GetProductsParams,
  GetVariantsParams,
} from "@lib/schemas";
type PageFilter = {
  page: number;
};
export type VariantFilter = Partial<GetVariantsParams> & PageFilter;

export type ProductFilter = Partial<GetProductsParams> & PageFilter;

export type ColorFilter = Partial<GetColorsParams> & PageFilter;
