"use client";
import { cx } from "cva";
import { useMemo } from "react";

type PropTypes = {
  totalPages: number;
  currentPage: number;
  onPageChange: (n: number) => void;
};

//number of pages shown to the left and right of current page
const siblings = 2;
//amount of elements that appear at start and end
const boundaries = 1;

function range(start: number, end: number) {
  const length = end - start + 1;

  return Array.from({ length }, (_, index) => index + start);
}

export const ellipsis = "ellipsis";

export function Pagination({ currentPage, totalPages, onPageChange }: PropTypes) {
  const _total = Math.max(Math.trunc(totalPages), 0);
  const paginationRange = useMemo((): (number | "ellipsis")[] => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
    if (totalPageNumbers >= _total) {
      return range(1, _total);
    }

    const leftSiblingIndex = Math.max(currentPage - siblings, boundaries);
    const rightSiblingIndex = Math.min(currentPage + siblings, _total - boundaries);

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots = rightSiblingIndex < _total - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      return [...range(1, leftItemCount), ellipsis, ...range(_total - (boundaries - 1), _total)];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      return [...range(1, boundaries), ellipsis, ...range(_total - rightItemCount, _total)];
    }

    return [
      ...range(1, boundaries),
      ellipsis,
      ...range(leftSiblingIndex, rightSiblingIndex),
      ellipsis,
      ...range(_total - boundaries + 1, _total)
    ];
  }, [_total, siblings, currentPage]);
  return (
    <div className="flex gap-2">
      {paginationRange.map((page, key) => {
        if (page === "ellipsis") return "...";
        return (
          <button
            type="button"
            onClick={() => onPageChange(key + 1)}
            className={cx(
              "h-10 w-10 rounded-full flex justify-center items-center",
              currentPage === key + 1
                ? "bg-red-600 text-white"
                : "bg-zinc-200 text-red-600 dark:bg-zinc-800 dark:text-red-500"
            )}
            key={key}
          >
            {key + 1}
          </button>
        );
      })}
    </div>
  );
}
