import { CustomDataTable } from "@components/CustomDataTable";
import { PricingTier } from "@lib/schemas";
import { ColumnDef } from "@tanstack/react-table";

const columns: ColumnDef<PricingTier>[] = [
  { accessorKey: "id", header: "شناسه" },
  { accessorKey: "createdAt", header: "ایجاد" },
  { accessorKey: "updatedAt", header: "ویرایش" },
  { accessorKey: "deletedAt", header: "حذف" },
  { accessorKey: "variantId", header: "ویرانت" },
  { accessorKey: "standardMinQuantity", header: "حداقل‌عادی" },
  { accessorKey: "standardMaxQuantity", header: "حداکثر‌عادی" },
  { accessorKey: "premiumMinQuantity", header: "حداقل‌ویژه" },
  { accessorKey: "premiumMaxQuantity", header: "حداکثر‌ویژه" },
  { accessorKey: "price", header: "قیمت" },
  { accessorKey: "provideDate", header: "تاریخ" },
  { accessorKey: "clientGroupId", header: "گروه" },
  { accessorKey: "currencyId", header: "ارز" },
];

export default function PricingTierTable() {
  return <CustomDataTable columns={columns} />;
}
