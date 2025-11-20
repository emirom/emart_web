import {
  GetAttributesParams,
  GetColorsParams,
  GetLabelsParams,
  GetProductsParams,
  GetUnitsParams,
  GetVariantsParams,
} from "@lib/schemas";
type PageFilter = {
  page: number;
};
export type VariantFilter = Partial<GetVariantsParams> & PageFilter;

export type ProductFilter = Partial<GetProductsParams> & PageFilter;

export type ColorFilter = Partial<GetColorsParams> & PageFilter;

export type FilterAttribute = Partial<GetAttributesParams> & PageFilter;

export type LabelFilter = Partial<GetLabelsParams> & PageFilter;

export type UnitFilter = Partial<GetUnitsParams> & PageFilter;
