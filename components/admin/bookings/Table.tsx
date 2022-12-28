"use client";
import Link from "next/link";
import { usePagination } from "@lib/hooks/usePagination";
import { Pagination } from "@components/shared/Pagination";
import { useBookings } from "./BookingsProvider";
import { photoshootTypes } from "@lib/photoshoot";

type PropTypes = {
  status: "pending" | "approved";
};

export default function Table({ status }: PropTypes) {
  const bookings = useBookings(status);
  const { paginatedList, ...props } = usePagination(10, bookings);
  return (
    <>
      <table className="w-full mb-5">
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Email</th>
        </tr>
        {paginatedList.map((booking) => {
          return (
            <tr key={booking.id} className="text-center py-2 even:bg-gray-200 dark:even:bg-zinc-800">
              <td className="flex justify-between p-2">
                {booking.firstName} {booking.lastName}
              </td>
              <td>{photoshootTypes.get(booking.type as any)?.label}</td>
              <td>{booking.email}</td>
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
      </table>
      <div className="flex w-full justify-between">
        <Pagination {...props} />
        <p className="text-gray-100">Total items: {bookings.length}</p>
      </div>
    </>
  );
}
