"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { Province } from "@lib/schemas";
import { useGetProvinces } from "@lib/services/provinces/provinces";
import { ProvinceFilter } from "@lib/types/filter-generator";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import CreateProvince from "./CreateProvince";
import ProvincesAction from "./ProvincesAction";

const columns: ColumnDef<Province>[] = [
  { accessorKey: "name", header: "نام" },
  { accessorKey: "abb", header: " نام مخفف (abb)" },
  {
    accessorKey: "country.name",
    header: "کشور",
    cell: (row) => <>{row.getValue()}</>,
  },
  { accessorKey: "createdAt", header: "تاریخ ایجاد" },
  { accessorKey: "updatedAt", header: "تاریخ به روزرسانی" },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => <ProvincesAction id={row.original.id} />,
  },
];

export default function ProvincesTable({
  initialQuery = { page: 0 },
}: {
  initialQuery?: ProvinceFilter;
}) {
  const searchParams = useSearchParams();
  const page = initialQuery?.page ?? 0;
  const skip = page * 10;

  const name = searchParams?.get("name") ?? initialQuery?.name;
  const abb = searchParams?.get("abb") ?? initialQuery?.abb;
  const countryId = searchParams?.get("countryId") ?? initialQuery?.countryId;

  const { data: provinces } = useGetProvinces({
    skip,
    limit: 10,
    name,
    abb,
    countryId,
    order: initialQuery.order,
  });

  return (
    <CustomDataTable
      columns={columns}
      data={provinces?.data}
      filterConfigs={provinces?.filters}
      filterColumnKey="name"
      filterPlaceholder="جستجو استان"
      emptyMessage="موردی یافت نشد"
      title="لیست استان ها"
      customButton={<CreateProvince />}
    />
  );
}
