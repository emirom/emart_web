"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { ClearFilterButton } from "./ClearFilterButton";
import FilterGenerator from "./FilterGenerator";
import { TablePagination } from "./TablePagination";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export type ApiListDetails = {
  skip: number;
  limit: number;
  total: number;
  pages: number;
};

export type ApiListResponse<TData, TFilter = unknown> = {
  success: boolean;
  data: TData[];
  filters: TFilter[];
  details: ApiListDetails;
};

export interface CustomDataTableProps<
  TResponse extends ApiListResponse<any, any>, // eslint-disable-line @typescript-eslint/no-explicit-any
> {
  title?: string;
  response?: Partial<{
    success: boolean | null;
    data: TResponse["data"];
    filters: TResponse["filters"];
    details: Partial<ApiListDetails>;
  }>;
  columns: ColumnDef<TResponse["data"][number]>[];
  filterColumnKey?: string;
  filterPlaceholder?: string;
  emptyMessage?: string;
  customButton?: React.ReactNode;
}

export function CustomDataTable<TResponse extends ApiListResponse<any, any>>({
  // eslint-disable-line @typescript-eslint/no-explicit-any
  title,
  response,
  columns,
  filterColumnKey,
  filterPlaceholder = "Filter...",
  emptyMessage = "No results found.",
  customButton,
}: CustomDataTableProps<TResponse>) {
  type TData = TResponse["data"][number];
  type TFilter = TResponse["filters"][number];

  const data: TData[] = response?.data ?? [];
  const filters: TFilter[] = response?.filters ?? [];
  const details: ApiListDetails = {
    skip: response?.details?.skip ?? 0,
    limit: response?.details?.limit ?? data.length,
    total: response?.details?.total ?? data.length,
    pages: response?.details?.pages ?? 1,
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: details.pages,
  });

  const filterColumn = filterColumnKey
    ? table.getColumn(filterColumnKey)
    : null;

  return (
    <div className="w-full border border-gray-300 rounded-lg p-2">
      {title && (
        <h2 className="text-xs text-tint-blue-500 font-semibold my-1">
          {title}
        </h2>
      )}

      <div className="flex items-center justify-between gap-2 mb-2 ">
        <div className="flex items-stretch gap-2">
          {filterColumn && (
            <Input
              placeholder={filterPlaceholder}
              value={(filterColumn.getFilterValue() as string) ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                filterColumn.setFilterValue(value);

                const params = new URLSearchParams(
                  searchParams ? Array.from(searchParams.entries()) : []
                );

                if (value) params.set("search", value);
                else params.delete("search");

                router.replace(`${pathname}?${params.toString()}`);
              }}
              className="max-w-xs text-[0.75rem] font-medium border border-gray-300 rounded-lg"
            />
          )}

          {filters.length > 0 && (
            <div className="flex gap-2">
              <FilterGenerator configs={filters} />
              <ClearFilterButton />
            </div>
          )}
        </div>

        {customButton}
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-start">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {data.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-xs">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-12 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {details.total > 10 && <TablePagination total={details.total} />}
    </div>
  );
}
