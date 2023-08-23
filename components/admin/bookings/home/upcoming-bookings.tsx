"use client";
import { Table, Badge, Title, Select } from "@aomdev/ui";
import { useBookings } from "../BookingsProvider";
import { Anchor } from "@/components/shared";
import { formatDate } from "@/util/formate-date";
import { useState } from "react";

export function UpcomingBookings() {
  const [filters, setFilter] = useState("all bookings");
  const { pending, approved } = useBookings();
  const bookings = (
    filters === "pending" ? pending : filters === "approved" ? approved : [...pending, ...approved]
  ).slice(0, 10);
  return (
    <div className="col-span-full mt-16">
      <Title order={2} className="font-heading text-gray-900 dark:text-gray-50 font-medium mb-6">
        Upcoming Bookings
      </Title>
      <Select
        value={filters}
        onValueChange={setFilter}
        items={[
          { label: "Pending", value: "pending" },
          { label: "Approved", value: "approved" },
          { label: "All bookings", value: "all bookings" }
        ]}
      />
      <Table style={{ marginTop: "2rem" }}>
        <Table.Header>
          <Table.Row>
            <Table.Head>Client</Table.Head>
            <Table.Head>Type</Table.Head>
            <Table.Head>Environment</Table.Head>
            <Table.Head>Date</Table.Head>
            <Table.Head>Time</Table.Head>
            <Table.Head>Status</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bookings.map(booking => {
            return (
              <Table.Row key={booking.id}>
                <Table.Cell>
                  {booking.firstName} {booking.lastName}
                </Table.Cell>
                <Table.Cell className="capitalize">{booking.type} </Table.Cell>
                <Table.Cell>{booking.environment ? "Inside" : "Outside"} </Table.Cell>
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
                  <Anchor href={`/admin/bookings/${booking.status}/${booking.id}`}>View</Anchor>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
