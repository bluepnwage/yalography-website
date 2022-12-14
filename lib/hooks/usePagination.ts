import { useState, useCallback } from "react";

export function usePagination<T>(rowsPerPage: number, list: T[]) {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const paginatedList = list.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(list.length / rowsPerPage);

  const pageChange = (page: number) => {
    setCurrentPage(page);
  };

  return { paginatedList, totalPages, pageChange, currentPage };
}
