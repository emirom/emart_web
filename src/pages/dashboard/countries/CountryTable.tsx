"use client";
import { CustomDataTable } from "@components/CustomDataTable";
import { Country } from "@lib/schemas";
import { useGetCountries } from "@lib/services/countries/countries";
import { CountryFilter } from "@lib/types/filter-generator";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import CountryAction from "./CountryAction";
import CreateCountry from "./CreateCountry";

export default function CountryTable({
  initialQuery,
}: {
  initialQuery: CountryFilter;
}) {
  const columns: ColumnDef<Country>[] = [
    { accessorKey: "name", header: "نام" },
    { accessorKey: "isoCode", header: "کد ISO" },
    { accessorKey: "phoneCode", header: "کد تلفن" },
    {
      accessorKey: "createdAt",
      header: "تاریخ ایجاد",
      cell: ({ getValue }) =>
        new Date(String(getValue())).toLocaleString("fa-IR"),
    },
    {
      accessorKey: "updatedAt",
      header: "تاریخ به روزرسانی",
      cell: ({ getValue }) =>
        new Date(String(getValue())).toLocaleString("fa-IR"),
    },
    {
      id: "action",
      accessorKey: "id",
      header: "",
      cell: ({ row }) => <CountryAction id={row.original.id} />,
    },
  ];

  const searchParams = useSearchParams();
  const { data: countries } = useGetCountries({
    skip: initialQuery?.page ?? 0,
    limit: 10,
    name: searchParams?.get("name") ?? initialQuery?.name ?? "",
    isoCode: searchParams?.get("isoCode") ?? initialQuery?.isoCode ?? "",
    phoneCode: searchParams?.get("phoneCode") ?? initialQuery?.phoneCode ?? "",
  });

  return (
    <CustomDataTable
      columns={columns}
      data={countries?.data}
      filterConfigs={countries?.filters}
      filterColumnKey="name"
      filterPlaceholder="جستجو کشور"
      emptyMessage="کشور مورد نظریافت نشد"
      customButton={<CreateCountry />}
    />
  );
}
