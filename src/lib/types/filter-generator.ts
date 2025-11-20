import { GetVariantsParams } from "@lib/schemas";
type PageFilter = {
  page: number;
};
export type VariantFilter = Partial<GetVariantsParams> & PageFilter;
