"use client";
import { usePagination } from "@/lib/hooks/usePagination";
import { Pagination } from "@/components/shared/Pagination";
import Link from "next/link";
import { useEffect } from "react";
import { ActionIcon, Badge } from "@aomdev/ui";
import { Table } from "@aomdev/ui";
import type { SerializedBooking } from "@/lib/prisma";
import { formatDate } from "@/util/formate-date";
import { IconChevronLeft } from "@tabler/icons-react";

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
    <div className="space-y-4 grow w-full">
      <Table style={{ flexGrow: 1, height: "75%" }} className="w-full">
        <Table.Header>
          <Table.Row>
            <Table.Head>Name</Table.Head>
            <Table.Head>Type</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedList.map((booking, key) => {
            return (
              <Table.Row key={key} className="max-h-20">
                <Table.Cell>
                  {booking.firstName} {booking.lastName}
                </Table.Cell>
                <Table.Cell className=" capitalize">{booking.type}</Table.Cell>
                <Table.Cell className="capitalize">
                  {" "}
                  <Badge variant={"status"} color={booking.status === "approved" ? "success" : "warn"}>
                    {booking.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    href={`/admin/bookings/${booking.id}`}
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
      <div className="flex items-center justify-between mt-4">
        <p className="text-gray-200">
          <span className="font-semibold">{todaysBookings.length}</span> total bookings on {formatDate(date!)}
        </p>
        {props.totalPages > 1 && (
          <>
            <div className="flex gap-2">
              <ActionIcon
                onClick={props.prevPage}
                disabled={props.currentPage === 1}
                color="gray"
                variant={"subtle"}
              >
                <IconChevronLeft />
              </ActionIcon>
              <ActionIcon
                onClick={props.nextPage}
                disabled={props.currentPage === props.totalPages}
                color="gray"
                variant={"subtle"}
              >
                <IconChevronLeft className="rotate-180" />
              </ActionIcon>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
