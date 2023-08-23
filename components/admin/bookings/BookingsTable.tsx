"use client";
import Link from "next/link";
import { usePagination } from "@/lib/hooks/usePagination";
import { Pagination } from "@/components/shared/Pagination";
import { useBookings } from "./BookingsProvider";
import { photoshootTypes } from "@/lib/photoshoot";
import { Table } from "@/components/shared/Table";

type PropTypes = {
  status: "pending" | "approved";
};

export default function BookingsTable({ status }: PropTypes) {
  const bookings = useBookings()[status];
  const { paginatedList, ...props } = usePagination(10, bookings);
  return (
    <>
      <Table striped className="w-full mb-5">
        <thead className="border-b border-zinc-200 dark:border-zinc-700">
          <tr>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Name</th>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Type</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {paginatedList.map(booking => {
            return (
              <tr key={booking.id} className="text-center py-2 ">
                <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">
                  {booking.firstName} {booking.lastName}
                </td>
                <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">
                  {photoshootTypes.get(booking.type as any)?.label}
                </td>
                <td className="py-2">{booking.email}</td>
                <td>
                  <Link
                    className={`text-yellow-600 dark:text-yellow-500`}
                    href={`/admin/bookings/${status}/${booking.id}`}
                  >
                    View details
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="flex w-full justify-between">
        <Pagination {...props} />
        <p className="text-gray-100">Total items: {bookings.length}</p>
      </div>
    </>
  );
}
