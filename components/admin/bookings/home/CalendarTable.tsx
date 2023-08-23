"use client";
import { usePagination } from "@/lib/hooks/usePagination";
import { Pagination } from "@/components/shared/Pagination";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";
import { Badge } from "@aomdev/ui";
import { Table } from "@aomdev/ui";
import type { SerializedBooking } from "@/lib/prisma";

type PropTypes = {
  todaysBookings: SerializedBooking[];
  date: Date | null;
};

export function CalendarTable({ todaysBookings, date }: PropTypes) {
  const { paginatedList, ...props } = usePagination(5, todaysBookings);

  useEffect(() => {
    props.onPageChange(1);
  }, [date]);

  return (
    <div className="space-y-2 basis-3/4 w-full">
      <Table style={{ flexGrow: 1 }}>
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Type</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedList.map((booking, key) => {
            return (
              <Table.Row key={key}>
                <Table.Cell className="border-r border-zinc-200 dark:border-zinc-700">
                  {booking.firstName} {booking.lastName}
                </Table.Cell>
                <Table.Cell className="border-r capitalize border-zinc-200 dark:border-zinc-700">
                  {booking.type}
                </Table.Cell>
                <Table.Cell className="capitalize">
                  {" "}
                  <Badge variant={"status"} color={booking.status === "approved" ? "success" : "warn"}>
                    {booking.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    href={`/admin/bookings/${booking.status}/${booking.id}`}
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
      <Pagination {...props} />
    </div>
  );
}
