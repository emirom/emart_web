"use client";

import PaginationPortalWrapper from "@/pages/dashboard/PaginationPortalWrapper";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

export function TablePagination() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams?.toString() || "");
  const currentPage = Number(currentParams.get("page")) || 0;

  const handlePageChange = (newPage: number) => {
    if (newPage < 0) return;
    const params = new URLSearchParams(currentParams.toString());
    params.set("page", newPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <PaginationPortalWrapper>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
          </PaginationItem>

          <PaginationItem className="p-0 m-0 inline">
            <PaginationLink>{currentPage + 1}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </PaginationPortalWrapper>
  );
}
