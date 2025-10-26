import PaginationPortalWrapper from "@/pages/dashboard/PaginationPortalWrapper";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Props = {
  previousPage: () => void;
  nextPage: () => void;
  setPage?: (page: number) => void;
  currentPage: number;
};

export function TablePagination({
  previousPage,
  nextPage,
  currentPage,
}: Props) {
  return (
    <PaginationPortalWrapper>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNext onClick={nextPage} />
          </PaginationItem>

          <PaginationItem className="p-0 m-0 inline">
            <PaginationLink>{currentPage + 1}</PaginationLink>
          </PaginationItem>

          {/* <PaginationItem><PaginationEllipsis /></PaginationItem> */}
          <PaginationItem>
            <PaginationPrevious onClick={previousPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </PaginationPortalWrapper>
  );
}
