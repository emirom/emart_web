"use client";

import { CustomDataTable } from "@components/CustomDataTable";
import CustomImage from "@components/CustomImage";
import { cn } from "@components/lib/utils";
import { Brand } from "@lib/schemas";
import { useGetBrands } from "@lib/services/brands/brands";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";

import { BrandFilter } from "@lib/types/filter-generator";
import BrandsAction from "./BrandsAction";
import CreateBrand from "./CreateBrand";

const columns: ColumnDef<Brand>[] = [
  {
    accessorKey: "name",
    header: "نام برند",
  },
  {
    accessorKey: "enName",
    header: "نام انگلیسی",
  },
  {
    accessorKey: "logoUrl",
    header: "لوگو",
    cell: ({ row }) =>
      row.original.logoUrl ? (
        <CustomImage
          src={row.original.logoUrl}
          alt={`آیفون 13 پرو مکس - محصول شماره `}
          fill
          sizes="(max-width: 640px) 32vw,
           (max-width: 768px) 18vw,
           (max-width: 1024px) 14vw,
          (max-width: 1280px) 10vw,8vw"
          className={cn(
            " w-[40%] h-[48%] mx-auto  aspect-[16/15] transition-opacity duration-300",
            "!opacity-100 !duration-0"
          )}
          style={{ opacity: 1, transition: "none" }}
          itemProp="image"
        />
      ) : (
        "-"
      ),
  },
  {
    accessorKey: "website",
    header: "وبسایت",
    cell: ({ row }) =>
      row.original.website ? (
        <a
          href={row.original.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {row.original.website}
        </a>
      ) : (
        "-"
      ),
  },
  {
    accessorKey: "description",
    header: "توضیحات",
  },
  {
    accessorKey: "sortOrder",
    header: "ترتیب نمایش",
  },
  {
    accessorKey: "isActive",
    header: "فعال",
    cell: ({ row }) => (row.original.isActive ? "✅" : "❌"),
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
    cell: ({ getValue }) =>
      new Date(String(getValue())).toLocaleString("fa-IR"),
  },
  {
    accessorKey: "updatedAt",
    header: "آخرین بروزرسانی",
    cell: ({ getValue }) =>
      new Date(String(getValue())).toLocaleString("fa-IR"),
  },
  {
    accessorKey: "deletedAt",
    header: "تاریخ حذف",
    cell: ({ row }) =>
      row.original.deletedAt
        ? new Date(row.original.deletedAt).toLocaleDateString()
        : "-",
  },
  {
    accessorKey: "action",
    header: "",
    cell: ({ row }) => (
      <BrandsAction key={row.original.id} id={row.original.id} />
    ),
  },
];

export default function BrandTable({
  initialQuery,
}: {
  initialQuery?: BrandFilter;
}) {
  const searchParams = useSearchParams();

  const { data: brands } = useGetBrands({
    skip: initialQuery?.page ?? 0,
    limit: 10,
    name: searchParams?.get("name") ?? initialQuery?.name,
    enName: searchParams?.get("enName") ?? initialQuery?.enName,
    website: searchParams?.get("website") ?? initialQuery?.website,
  });

  return (
    <CustomDataTable
      columns={columns}
      data={brands?.data ?? []}
      customButton={<CreateBrand />}
      emptyMessage="برند‌مورد‌نظریافت نشد"
      filterColumnKey="name"
      filterPlaceholder="جستجو برند"
      title="برند ها"
      filterConfigs={brands?.filters}
    />
  );
}
