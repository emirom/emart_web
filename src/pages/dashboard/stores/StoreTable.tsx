"use client";
import { CustomDataTable } from "@components/CustomDataTable";
import { ListStoresResponse, Store } from "@lib/schemas";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import CreateStore from "./CreateStore";
import StoreAction from "./StoreAction";

const columns: ColumnDef<Store>[] = [
  {
    accessorKey: "name",
    header: "نام فروشگاه",
  },
  {
    accessorKey: "slug",
    header: "اسلاگ",
  },
  // {
  //   accessorKey: "logo",
  //   header: "لوگو",
  //   cell: ({ row }) =>
  //     row.original.logo ? (
  //       <img
  //         src={row.original.logo}
  //         alt="لوگو"
  //         style={{ width: 40, height: 40 }}
  //       />
  //     ) : (
  //       "-"
  //     ),
  // },
  {
    accessorKey: "description",
    header: "توضیحات",
    cell: ({ row }) => row.original.description ?? "-",
  },
  {
    accessorKey: "email",
    header: "ایمیل",
    cell: ({ row }) => row.original.email ?? "-",
  },
  {
    accessorKey: "phone",
    header: "تلفن",
    cell: ({ row }) => row.original.phone ?? "-",
  },
  {
    accessorKey: "website",
    header: "وبسایت",
    cell: ({ row }) =>
      row.original.website ? (
        <Link
          href={row.original.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          🌐 {row.original.website}
        </Link>
      ) : (
        "-"
      ),
  },
  {
    accessorKey: "isActive",
    header: "فعال",
    cell: ({ row }) => (row.original.isActive ? "✅" : "❌"),
  },
  {
    accessorKey: "isApproved",
    header: "تایید شده",
    cell: ({ row }) => (row.original.isApproved ? "👍" : "⛔"),
  },
  {
    accessorKey: "ownerId",
    header: "شناسه مالک",
    cell: ({ row }) => row.original.ownerId ?? "-",
  },
  {
    accessorKey: "createdAt",
    header: "تاریخ ایجاد",
    cell: ({ row }) =>
      `📅 ${new Date(row.original.createdAt).toLocaleDateString("fa-IR")}`,
  },
  {
    accessorKey: "updatedAt",
    header: "آخرین بروزرسانی",
    cell: ({ row }) =>
      `📅 ${new Date(row.original.updatedAt).toLocaleDateString("fa-IR")}`,
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => <StoreAction id={row.original.id} />,
  },
];

export default function StoreTable({ data }: { data: ListStoresResponse }) {
  return (
    <CustomDataTable
      title="فروشگاه‌ها"
      response={data}
      columns={columns}
      emptyMessage="فروشگاهی یافت نشد"
      filterPlaceholder="نام فروشگاه را وارد نمایید"
      filterColumnKey="name"
      customButton={<CreateStore />}
    />
  );
}
