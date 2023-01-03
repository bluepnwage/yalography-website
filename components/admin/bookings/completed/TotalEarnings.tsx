"use client";
import { formatNum } from "@util/formatNum";
import { useBookings } from "../BookingsProvider";

export function TotalEarnings() {
  const bookings = useBookings("completed");
  const earnings = bookings.reduce((a, c) => {
    const amount = c.orders?.quote ? c.orders.quote : 0;
    return a + amount;
  }, 0);
  return (
    <>
      <h2 className="text-gray-900 mb-2 dark:text-gray-100 font-bold ">Total earning</h2>
      <p>${formatNum(earnings)}</p>
    </>
  );
}
