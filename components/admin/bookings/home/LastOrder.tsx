"use client";
import { useBookings } from "../BookingsProvider";

export function LastOrder() {
  const bookings = useBookings("completed");
  const last = bookings.sort((a, b) => {
    const firstDate = a.orders.createdAt ? Date.parse(a.orders?.createdAt) : 0;
    const secondDate = b.orders.createdAt ? Date.parse(b.orders?.createdAt) : 0;
    return secondDate - firstDate;
  })[0];
  return (
    <>
      <h2 className="font-bold mb-2 text-gray-900 dark:text-gray-100">Last order</h2>
      <p>{last?.orders.createdAt}</p>
    </>
  );
}
