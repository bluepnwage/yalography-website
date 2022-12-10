"use client";
import { useState } from "react";
import Link from "next/link";
import { cx } from "cva";

type PropTypes = {
  reservations: any[];
};

export function Table({ reservations }: PropTypes) {
  const [currentPage, setCurrentPage] = useState(1);
  const { paginatedList, total, totalItems } = pagination(reservations, currentPage, 10);
  const pages = Array(total).fill(null);

  return (
    <>
      <table className="w-full mb-5">
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Email</th>
        </tr>
        {paginatedList.map((_, key) => {
          return (
            <tr key={key} className="text-center py-2 even:bg-gray-200 dark:even:bg-zinc-800">
              <td className="flex justify-between p-2">Agis Carty</td>
              <td>Marriage</td>
              <td>a.carty2555@gmail.com</td>
              <td>
                <Link className={`text-yellow-600 dark:text-yellow-500`} href={"/admin/reservations/approved/2"}>
                  View details
                </Link>
              </td>
            </tr>
          );
        })}
      </table>
      <div className="flex w-full justify-between">
        <div className="flex gap-2">
          {pages.map((_, key) => {
            return (
              <button
                onClick={() => setCurrentPage(key + 1)}
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
        <p className="text-gray-100">Total items: {totalItems}</p>
      </div>
    </>
  );
}
function pagination<T>(list: T[], currentPage: number, rowsPerPage: number) {
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const paginatedList = list.slice(indexOfFirst, indexOfLast);
  return { paginatedList, total: Math.ceil(list.length / rowsPerPage), totalItems: list.length };
}
