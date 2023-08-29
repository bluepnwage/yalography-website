"use client";
import { usePagination } from "@/lib/hooks/usePagination";
import { useBookings } from "../BookingsProvider";
import { formatNum } from "@/util/formatNum";
import Link from "next/link";
import { Button, Table } from "@aomdev/ui";

export function OrdersTable() {
  const { completed } = useBookings();
  const { paginatedList } = usePagination(10, completed);
  return (
    <>
      <Table style={{ flexGrow: 1 }} className="grow w-full">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Type</Table.Head>
            <Table.Head>Date</Table.Head>
            <Table.Head>Quote</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedList.map(booking => {
            const amount = booking.orders.quote ? formatNum(booking.orders.quote / 100) : 0;
            return (
              <Table.Row key={booking.id}>
                <Table.Cell>
                  {booking.firstName} {booking.lastName}
                </Table.Cell>
                <Table.Cell className="capitalize">{booking.type}</Table.Cell>
                <Table.Cell>{booking.orders.createdAt}</Table.Cell>
                <Table.Cell>${amount}</Table.Cell>
                <Table.Cell>
                  <Link
                    href={`/admin/bookings/${booking.orders.id}?completed=true`}
                    className="text-yellow-600 dark:text-yellow-500"
                  >
                    View
                  </Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
