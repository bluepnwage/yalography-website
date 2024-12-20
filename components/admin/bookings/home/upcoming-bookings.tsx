"use client";
import { Table, Badge, Title, Select, Tabs } from "@aomdev/ui";
import { Anchor } from "@/components/shared";
import { formatDate } from "@/util/formate-date";
import { useState } from "react";
import { SerializedBooking } from "@/lib/prisma";

type PropTypes = {
  approved: SerializedBooking[];
  pending: SerializedBooking[];
};

export function UpcomingBookings({ approved, pending }: PropTypes) {
  const [filters, setFilter] = useState("all");
  const [dateSort, setDateSort] = useState("booking_desc");
  const bookings = sortBookingDate(
    filters === "pending" ? pending : filters === "approved" ? approved : [...pending, ...approved],
    dateSort
  ).slice(0, 10);
  console.log(dateSort);
  return (
    <div className="col-span-full mt-16">
      <Title
        order={2}
        className="font-heading text-gray-900 dark:text-gray-50 font-medium mb-6"
      >
        Upcoming Bookings
      </Title>
      <Tabs
        defaultValue="all"
        onValueChange={setFilter}
      >
        <Tabs.List>
          <Tabs.Trigger value="all">All bookings</Tabs.Trigger>
          <Tabs.Trigger value="pending">Pending Bookings</Tabs.Trigger>
          <Tabs.Trigger value="approved">Approved Bookings</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="all">
          <BookingsTable bookings={bookings}>
            <Select
              value={dateSort}
              onValueChange={setDateSort}
              items={[
                { label: "Created Date (DESC)", value: "created_desc" },
                { label: "Created Date (ASC)", value: "created_asc" },
                { label: "Booking Date (DESC)", value: "booking_desc" },
                { label: "Booking Date (ASC)", value: "booking_asc" }
              ]}
            />
          </BookingsTable>
        </Tabs.Content>
        <Tabs.Content value="pending">
          <BookingsTable bookings={bookings}>
            <Select
              value={dateSort}
              onValueChange={setDateSort}
              items={[
                { label: "Created Date (DESC)", value: "created_desc" },
                { label: "Created Date (ASC)", value: "created_asc" },
                { label: "Booking Date (DESC)", value: "booking_desc" },
                { label: "Booking Date (ASC)", value: "booking_asc" }
              ]}
            />
          </BookingsTable>
        </Tabs.Content>
        <Tabs.Content value="approved">
          <BookingsTable bookings={bookings}>
            <Select
              value={dateSort}
              onValueChange={setDateSort}
              items={[
                { label: "Created Date (DESC)", value: "created_desc" },
                { label: "Created Date (ASC)", value: "created_asc" },
                { label: "Booking Date (DESC)", value: "booking_desc" },
                { label: "Booking Date (ASC)", value: "booking_asc" }
              ]}
            />
          </BookingsTable>
        </Tabs.Content>
      </Tabs>
    </div>
  );
}
type Props = {
  children: React.ReactNode;
  bookings: SerializedBooking[];
};

function BookingsTable({ children, bookings }: Props) {
  return (
    <div>
      <div className="flex gap-4">{children}</div>
      <Table
        style={{ marginTop: "2rem" }}
        className="w-full"
      >
        <Table.Header>
          <Table.Row>
            <Table.Head>Client</Table.Head>
            <Table.Head>Type</Table.Head>
            <Table.Head>Environment</Table.Head>
            <Table.Head>Created</Table.Head>
            <Table.Head>Date</Table.Head>
            <Table.Head>Time</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bookings.map((booking) => {
            return (
              <Table.Row key={booking.id}>
                <Table.Cell>
                  {booking.firstName} {booking.lastName}
                </Table.Cell>
                <Table.Cell className="capitalize">{booking.type} </Table.Cell>
                <Table.Cell>{booking.environment ? "Inside" : "Outside"} </Table.Cell>
                <Table.Cell>
                  {booking.createdAt ? formatDate(new Date(booking.createdAt), { dateStyle: "full" }) : "N/A"}
                </Table.Cell>
                <Table.Cell>{formatDate(new Date(booking.date), { dateStyle: "full" })}</Table.Cell>
                <Table.Cell>{booking.time}</Table.Cell>
                <Table.Cell>
                  <Badge
                    variant={"status"}
                    className="capitalize"
                    color={booking.status === "approved" ? "success" : "warn"}
                  >
                    {booking.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Anchor href={`/admin/bookings/${booking.id}`}>View</Anchor>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

function sortBookingDate(bookings: SerializedBooking[], sort: string) {
  switch (sort) {
    case "created_desc": {
      return bookings.sort((a, b) => {
        console.log(a.createdAt, b.createdAt);
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    }
    case "created_asc": {
      return bookings.sort((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return a.createdAt.getTime() - b.createdAt.getTime();
      });
    }
    case "booking_asc": {
      return bookings.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }
    case "booking_desc": {
      return bookings.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    }

    default: {
      return bookings;
    }
  }
}
