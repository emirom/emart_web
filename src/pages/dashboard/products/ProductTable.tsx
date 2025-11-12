"use client";
import { CustomDataTable } from "@components/CustomDataTable";
import { Product } from "@lib/schemas";
import { useGetProducts } from "@lib/services/products/products";
import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ProductAction from "./ProductAction";

type InitialQuery = {
  page?: number;
};

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "نام محصول",
    cell: ({ row }) => (
      <div className="font-medium text-gray-800">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "enName",
    header: "نام انگلیسی",
    cell: ({ row }) => (
      <div className="text-gray-700 text-sm">{row.original.enName}</div>
    ),
  },
  {
    accessorKey: "brandId",
    header: "شناسه برند",
    cell: ({ row }) => (
      <div className="text-gray-700">{row.original.brandId ?? "-"}</div>
    ),
  },
  {
    accessorKey: "averageRating",
    header: "امتیاز میانگین",
    cell: ({ row }) => {
      const rating = row.original.averageRating ?? 0;
      return (
        <div className="flex items-end gap-1 text-yellow-500">
          <Star size={16} />
          <span className="text-gray-800 text-[0.625rem]">
            {rating.toFixed(1)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalReviews",
    header: "تعداد نظرات",
    cell: ({ row }) => (
      <div className="text-gray-700 text-center">
        {row.original.totalReviews ?? 0}
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: "وضعیت",
    cell: ({ row }) => <>{row.original.isActive ? "✅" : "❌"}</>,
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return (
        <div className="text-gray-500 text-sm">
          {date.toLocaleDateString("fa-IR")}{" "}
          <span className="text-xs text-gray-400">
            {date.toLocaleTimeString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "عملیات",
    cell: ({ row }) => <ProductAction key={row.id} id={row.original.id} />,
  },
];

export default function ProductTable({
  initialQuery,
}: {
  initialQuery: InitialQuery;
}) {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page") ?? initialQuery?.page ?? 0);

  const { data: products } = useGetProducts({
    skip: page * 10,
    limit: 10,
  });

  return (
    <CustomDataTable
      data={products?.data ?? []}
      columns={columns}
      title="محصولات"
      filterColumnKey="name"
      emptyMessage="محصولی یافت نشد"
      filterPlaceholder="جستجوی محصول..."
      customButton={
        <Link
          href="/dashboard/products/add"
          className="bg-green-200 p-2 text-white rounded-lg"
          aria-label="افزودن محصول جدید"
        >
          افزودن محصول جدید
        </Link>
      }
    />
  );
}
