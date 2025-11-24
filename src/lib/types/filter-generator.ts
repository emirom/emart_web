import {
  GetAttributesParams,
  GetBrandsParams,
  GetCitiesParams,
  GetColorsParams,
  GetCountriesParams,
  GetLabelsParams,
  GetProductsParams,
  GetProvincesParams,
  GetUnitsParams,
  GetVariantsParams,
} from "@lib/schemas";
type PageFilter = {
  page?: number;
};
export type VariantFilter = Partial<GetVariantsParams> & PageFilter;

export type ProductFilter = Partial<GetProductsParams> & PageFilter;

export type ColorFilter = Partial<GetColorsParams> & PageFilter;

export type AttributeFilter = Partial<GetAttributesParams> & PageFilter;

export type LabelFilter = Partial<GetLabelsParams> & PageFilter;

export type UnitFilter = Partial<GetUnitsParams> & PageFilter;

export type BrandFilter = Partial<GetBrandsParams> & PageFilter;

export type CountryFilter = Partial<GetCountriesParams> & PageFilter;

export type ProvinceFilter = Partial<GetProvincesParams> & PageFilter;

export type CityFilter = Partial<GetCitiesParams> & PageFilter;
