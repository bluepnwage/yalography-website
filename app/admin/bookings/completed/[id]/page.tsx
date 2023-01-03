"use client";
import { useBookings } from "@components/admin/bookings/BookingsProvider";
import { formatNum } from "@util/formatNum";
import { Button } from "@components/shared/Button";

export default function Booking({ params }: { params: { id: string } }) {
  const bookings = useBookings("completed");
  const order = bookings.find(({ orders }) => orders.id === parseInt(params.id))!;
  const amount = order.orders.quote ? order.orders.quote / 100 : 0;
  return (
    <>
      <section className="flex gap-4">
        <div className="w-2/4 basis-3/5 ring-1 bg-white p-4 ring-zinc-200 dark:ring-zinc-700 dark:bg-zinc-800 rounded-md">
          <div className="border-b border-zinc-200 dark:border-zinc-700 -mx-4 -mt-4 px-4 py-1 mb-4">
            <h1 className="font-bold text-4xl">Order details</h1>
          </div>
          <p className="text-gray-400 mb-4">Booking #{order.orders.id}</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-400">Quote:</p>
              <p>${formatNum(amount)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-400">Environment:</p>
              <p>{order.environment ? "Inside" : "Outside"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-400">Photoshoot type:</p>
              <p className="capitalize">{order.type}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-400">Date:</p>
              <p className="capitalize">
                {order.date}, {order.time}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold text-gray-400">Description:</p>
              <p className="capitalize">{order.description}</p>
            </div>
          </div>
        </div>
        <div className="basis-2/5 p-4 flex flex-col bg-white dark:bg-zinc-800 rounded-md ring-1 ring-zinc-200 dark:ring-zinc-700">
          <div className="py-2 mb-4 -mx-4 px-4 -mt-4 border-b dark:border-zinc-700 border-zinc-200">
            <h2 className="font-bold text-2xl">Customer details</h2>
          </div>
          <div className="flex flex-col grow justify-between">
            <div className="flex justify-between  ">
              <p className="font-semibold text-gray-400">Name:</p>
              <p>
                {order.firstName} {order.lastName}
              </p>
            </div>
            <div className="flex justify-between  ">
              <p className="font-semibold text-gray-400">Email:</p>
              <p>{order.email}</p>
            </div>
            <div className="flex justify-between ">
              <p className="font-semibold text-gray-400">Phone:</p>
              <p>{order.phone}</p>
            </div>
            <Button fullWidth intent="accept" className="block">
              Request review
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
