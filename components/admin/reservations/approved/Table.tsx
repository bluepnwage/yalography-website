"use client";
import Link from "next/link";
import { usePagination } from "@lib/hooks/usePagination";
import { Pagination } from "@components/shared/Pagination";

type PropTypes = {
  reservations: any[];
};

export function Table({ reservations }: PropTypes) {
  const { paginatedList, ...props } = usePagination(10, reservations);

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
        <Pagination {...props} />
        <p className="text-gray-100">Total items: {reservations.length}</p>
      </div>
    </>
  );
}
