"use client";
import { cx } from "cva";

type PropTypes = {
  totalPages: number;
  currentPage: number;
  onPageChange: (n: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PropTypes) {
  const pages = Array(totalPages).fill(null);
  return (
    <div className="flex gap-2">
      {pages.map((_, key) => {
        return (
          <button
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
