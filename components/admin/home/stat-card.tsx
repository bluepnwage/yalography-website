"use client";
import { Select, Title } from "@aomdev/ui";
import { useState } from "react";
import { SerializedBooking, SerializedOrder } from "@/lib/prisma";
import { Badge } from "@aomdev/ui";

type CompletedOrders = SerializedBooking & { orders: Partial<SerializedOrder> };

type PropTypes = {
  orders: CompletedOrders[];
};

export function StatCard({ orders }: PropTypes) {
  const [period, setPeriod] = useState("all time");

  const bookings = periodBookings(period, orders);
  const lastPeriod = getLastPeriod(period, bookings);
  const revenue = bookings.reduce((a, c) => a + (c.orders.quote || 0), 0) / 100;
  const lastRevenue = lastPeriod.reduce((a, c) => a + (c.orders.quote || 0), 0) / 100;
  const outside = [];
  const inside = [];
  const lastInside = [];
  const lastOutside = [];

  console.log(lastPeriod);
  for (const booking of bookings) {
    if (booking.environment) {
      inside.push(booking);
    } else {
      outside.push(booking);
    }
  }

  for (const booking of lastPeriod) {
    if (booking.environment) {
      lastInside.push(booking);
    } else {
      lastOutside.push(booking);
    }
  }

  const bookingsPercentage = getDifferencePercentage(lastPeriod.length, bookings.length, period);
  const revenuePercentage = getDifferencePercentage(lastRevenue, revenue, period);
  const outsidePercentage = getDifferencePercentage(lastOutside.length, outside.length, period);
  const insidePercentage = getDifferencePercentage(lastInside.length, inside.length, period);

  return (
    <div className=" mt-16">
      <div className="flex justify-between items-center mb-8">
        <Title order={2} className="font-heading font-medium">
          Overview
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
      <div className="mt-6 grid grid-cols-4 gap-10">
        <div className="  border-t border-gray-200 dark:border-neutral-700 pt-6">
          <p className="font-medium font-heading text-4xl dark:text-gray-50 text-gray-900 mb-4">
            {bookings.length}
          </p>
          <p className="text-xl mb-4">Total bookings</p>

          <div className={`flex items-center gap-1 ${period === "all time" ? "opacity-0" : "opacity-100"}`}>
            <Badge color={bookingsPercentage.type}>
              {" "}
              {bookingsPercentage.type === "success"
                ? `+${bookingsPercentage.value}`
                : `-${bookingsPercentage.value}`}
              %
            </Badge>{" "}
            <span className="text-gray-600 dark:text-gray-300">
              From last {period === "monthly" ? "month" : "year"}
            </span>
          </div>
        </div>
        <div className=" border-t border-gray-200 dark:border-neutral-700 pt-6">
          <p className="font-medium font-heading text-4xl dark:text-gray-50 text-gray-900 mb-4">
            {currencyFormat(revenue)}
          </p>
          <p className="text-xl mb-4">Total Revenue</p>
          <div className={`flex items-center gap-1 ${period === "all time" ? "opacity-0" : "opacity-100"}`}>
            <Badge color={revenuePercentage.type}>
              {" "}
              {revenuePercentage.type === "success"
                ? `+${revenuePercentage.value}`
                : `-${revenuePercentage.value}`}
              %
            </Badge>{" "}
            <span className="text-gray-600 dark:text-gray-300">
              From last {period === "monthly" ? "month" : "year"}
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-neutral-700 pt-6 ">
          <p className="font-medium font-heading text-4xl dark:text-gray-50 text-gray-900 mb-4">
            {inside.length}
          </p>
          <p className="text-xl mb-4">Total inside bookings</p>
          <div className={`flex items-center gap-1 ${period === "all time" ? "opacity-0" : "opacity-100"}`}>
            <Badge color={insidePercentage.type}>
              {" "}
              {insidePercentage.type === "success"
                ? `+${insidePercentage.value}`
                : `-${insidePercentage.value}`}
              %
            </Badge>{" "}
            <span className="text-gray-600 dark:text-gray-300">
              From last {period === "monthly" ? "month" : "year"}
            </span>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-neutral-700 pt-6">
          <p className="font-medium font-heading text-4xl dark:text-gray-50 text-gray-900 mb-4">
            {outside.length}
          </p>
          <p className="text-xl mb-4">Total Outside bookings</p>
          <div className={`flex items-center gap-1 ${period === "all time" ? "opacity-0" : "opacity-100"}`}>
            <Badge color={outsidePercentage.type}>
              {" "}
              {outsidePercentage.type === "success"
                ? `+${outsidePercentage.value}`
                : `-${outsidePercentage.value}`}
              %
            </Badge>{" "}
            <span className="text-gray-600 dark:text-gray-300">
              From last {period === "monthly" ? "month" : "year"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function currencyFormat(number: number) {
  const formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  return formatter.format(number);
}

function periodBookings(filter: string, bookings: PropTypes["orders"]) {
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

function getLastPeriod(filter: string, bookings: PropTypes["orders"]) {
  const period = new Date();
  if (filter === "monthly") {
    period.setMonth(period.getMonth() - 1);
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return (
        bookingDate.getMonth() === period.getMonth() && bookingDate.getFullYear() === period.getFullYear()
      );
    });
  }
  if (filter === "yearly") {
    period.setFullYear(period.getFullYear() - 1);
    return bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate.getFullYear() === period.getFullYear();
    });
  }
  return bookings;
}

function getDifferencePercentage(oldValue: number, newValue: number, filter: string) {
  if (oldValue === 0) return { value: 100, type: "success" } as const;
  const difference = newValue - oldValue;
  const value = (difference / oldValue) * 100;
  console.log(value);
  if (value > 0) {
    return {
      type: "success",
      value
    } as const;
  } else {
    return {
      type: "error",
      value
    } as const;
  }
}
