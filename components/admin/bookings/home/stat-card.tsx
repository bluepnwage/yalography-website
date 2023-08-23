"use client";
import { Select, Card, Title } from "@aomdev/ui";
import { useState } from "react";
import { useBookings } from "../BookingsProvider";
export function StatCard() {
  const [period, setPeriod] = useState("all time");
  const { completed } = useBookings();
  const bookings = periodBookings(period, completed);
  const revenue = bookings.reduce((a, c) => a + (c.orders.quote || 0), 0) / 100;
  const outside = [];
  const inside = [];
  for (const booking of bookings) {
    if (booking.environment) {
      inside.push(booking);
    } else {
      outside.push(booking);
    }
  }
  return (
    <div className="col-span-full mt-16">
      <div className="w-3/4 mx-auto">
        <Title order={2} className="mb-4 font-heading capitalize font-medium text-gray-900 dark:text-gray-50">
          {" "}
          {period} Stats
        </Title>
        <Select
          value={period}
          onValueChange={setPeriod}
          items={[
            { label: "Monthly", value: "monthly" },
            { label: "Yearly", value: "yearly" },
            { label: "All time", value: "all time" }
          ]}
        />
      </div>
      <Card className="flex mt-6 w-3/4 mx-auto justify-evenly text-center">
        <div className=" pr-4 text-center">
          <p className="font-medium font-heading text-4xl dark:text-gray-50 text-gray-900 mb-4">
            {bookings.length}
          </p>
          <p className="text-xl">Total bookings</p>
        </div>
        <div role="separator" className="h-2/2 w-[1px] dark:bg-neutral-700 bg-gray-100" />
        <div className=" ">
          <p className="font-medium font-heading text-4xl dark:text-gray-50 text-gray-900 mb-4">
            {currencyFormat(revenue)}
          </p>
          <p className="text-xl">Total Revenue</p>
        </div>
        <div role="separator" className="h-2/2 w-[1px] dark:bg-neutral-700 bg-gray-100" />
        <div className=" ">
          <p className="font-medium font-heading text-4xl dark:text-gray-50 text-gray-900 mb-4">
            {inside.length}
          </p>
          <p className="text-xl">Total inside bookings</p>
        </div>
        <div role="separator" className="h-2/2 w-[1px] dark:bg-neutral-700 bg-gray-100" />
        <div className="">
          <p className="font-medium font-heading text-4xl dark:text-gray-50 text-gray-900 mb-4">
            {outside.length}
          </p>
          <p className="text-xl">Total Outside bookings</p>
        </div>
      </Card>
    </div>
  );
}

function currencyFormat(number: number) {
  const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  return formatter.format(number);
}

function periodBookings(filter: string, bookings: ReturnType<typeof useBookings>["completed"]) {
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();
  return filter === "monthly"
    ? bookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate.getMonth() === thisMonth && bookingDate.getFullYear() === thisYear;
      })
    : filter === "yearly"
    ? bookings.filter(booking => {
        const boookingDate = new Date();
        return boookingDate.getFullYear() === thisYear;
      })
    : bookings;
}
