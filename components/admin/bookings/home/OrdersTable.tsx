"use client";
import dynamic from "next/dynamic";
import { usePagination } from "@lib/hooks/usePagination";
import { Pagination } from "@components/shared/Pagination";
import { useBookings } from "../BookingsProvider";
import { formatNum } from "@util/formatNum";
import Link from "next/link";

const Table = dynamic(() => import("@components/shared/Table").then((mod) => mod.Table), { ssr: false });

export function OrdersTable() {
  const { completed } = useBookings();
  const { paginatedList, ...props } = usePagination(10, completed);
  return (
    <>
      <Table radius={"none"} ring={false} striped className="grow ">
        <thead className="border-b border-zinc-200 dark:border-zinc-700 ">
          <tr>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Name</th>
            <th className="py-2 border-r border-zinc-200 dark:border-zinc-700">Date</th>
            <th className="py-2">Quote</th>
          </tr>
        </thead>
        <tbody>
          {paginatedList.map((booking) => {
            const amount = booking.orders.quote ? formatNum(booking.orders.quote / 100) : 0;
            return (
              <tr key={booking.id}>
                <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">
                  {booking.firstName} {booking.lastName}
                </td>
                <td className="py-2 border-r border-zinc-200 dark:border-zinc-700">{booking.orders.createdAt}</td>
                <td>${amount}</td>
                <td>
                  <Link
                    href={`/admin/bookings/completed/${booking.orders.id}`}
                    className="text-yellow-600 dark:text-yellow-500"
                  >
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="border-t p-2 border-zinc-200 dark:border-zinc-700">
        <Pagination {...props} />
      </div>
    </>
  );
}
