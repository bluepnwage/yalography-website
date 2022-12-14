"use client";
import { cx } from "cva";

type PropTypes = {
  pages: number[];
  currentPage: number;
};

export function Pagination({ currentPage, pages }: PropTypes) {
  return (
    <div className="flex gap-2">
      {pages.map((_, key) => {
        return (
          <button
            className={cx(
              "h-10 w-10 rounded-full flex justify-center items-center",
              currentPage === key + 1 ? "bg-red-600 text-gray-100" : "bg-zinc-800 text-red-500"
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
