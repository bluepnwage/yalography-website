"use client";
import { Pagination } from "@components/shared/Pagination";
import Link from "next/link";

import { useBookings } from "../BookingsProvider";
import { usePagination } from "@lib/hooks/usePagination";

import dynamic from "next/dynamic";
import { formatNum } from "@util/formatNum";

const Table = dynamic(() => import("@components/shared/Table").then((mod) => mod.Table), { ssr: false });

export function CompletedBookingTable() {
  const bookings = useBookings("completed");
  const { paginatedList, ...props } = usePagination(10, bookings);
  return (
    <>
      <Table striped>
        <thead className="border-b border-zinc-200 dark:border-zinc-700">
          <tr>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Name</th>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Email</th>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Type</th>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Date</th>
            <th>Quote</th>
          </tr>
        </thead>
        <tbody>
          {paginatedList.map((booking) => {
            const amount = booking.orders.quote ? booking.orders.quote / 100 : 0;
            return (
              <tr>
                <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">
                  {booking.firstName} {booking.lastName}
                </td>
                <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">{booking.email}</td>
                <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">{booking.type}</td>
                <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">{booking.orders.createdAt}</td>
                <td>${formatNum(amount)}</td>
                <td>
                  <Link
                    className="text-yellow-600 dark:text-yellow-500"
                    href={`/admin/bookings/completed/${booking.orders.id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination {...props} />
    </>
  );
}
