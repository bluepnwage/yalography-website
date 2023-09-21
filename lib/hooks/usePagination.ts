import { useState, useTransition } from "react";

export function usePagination<T>(rowsPerPage: number, list: T[]) {
  const [currentPage, setCurrentPage] = useState(1);
  const [, startTransition] = useTransition();

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const paginatedList = list.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(list.length / rowsPerPage);

  const onPageChange = (page: number) => {
    startTransition(() => {
      setCurrentPage(page);
    });
  };

  const nextPage = () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(prev => prev + 1);
  };
  const prevPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage(prev => prev - 1);
  };

  return { paginatedList, totalPages, onPageChange, currentPage, prevPage, nextPage };
}
