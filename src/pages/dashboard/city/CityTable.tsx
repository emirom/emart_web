"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import { City } from "@lib/schemas";
import { useGetCities } from "@lib/services/cities/cities";
import { CityFilter } from "@lib/types/filter-generator";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import CityAction from "./CityAction";
import CreateCity from "./CreateCity";

const columns: ColumnDef<City>[] = [
  { accessorKey: "name", header: "نام" },
  { accessorKey: "provinceId", header: "استان" },
  { accessorKey: "createdAt", header: "تاریخ ایجاد" },
  { accessorKey: "updatedAt", header: "تاریخ به روزرسانی" },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => <CityAction id={row.original.id} />,
  },
];

export default function CityTable({
  initialQuery,
}: {
  initialQuery: CityFilter;
}) {
  const searchParams = useSearchParams();

  const page = Number(searchParams!.get("page") ?? initialQuery?.page ?? 0);
  const skip = page * 10;

  const { data: cities } = useGetCities({
    skip,
    limit: 10,
    provinceId: searchParams!.get("provinceId") ?? initialQuery?.provinceId,
    search: searchParams!.get("search") ?? initialQuery?.search,
  });

  return (
    <CustomDataTable
      columns={columns}
      data={cities?.data}
      title="شهرها"
      filterColumnKey="name"
      filterPlaceholder="جستجو شهر"
      emptyMessage="شهری یافت نشد"
      customButton={<CreateCity />}
      filterConfigs={cities?.filters}
    />
  );
}
