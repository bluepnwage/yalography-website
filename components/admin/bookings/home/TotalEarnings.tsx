"use client";
import { formatNum } from "@util/formatNum";
import { useBookings } from "../BookingsProvider";

export function TotalEarnings() {
  const { completed } = useBookings();
  const earnings = completed.reduce((a, c) => {
    const amount = c.orders?.quote ? c.orders.quote / 100 : 0;
    return a + amount;
  }, 0);
  return (
    <>
      <h2 className="text-gray-900 mb-2 dark:text-gray-100 font-bold ">Total earnings</h2>
      <p>${formatNum(earnings)}</p>
    </>
  );
}
