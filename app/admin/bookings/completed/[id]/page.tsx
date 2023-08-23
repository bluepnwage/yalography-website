import prisma from "@/lib/prisma";
import { cache } from "react";
import { formatNum } from "@/util/formatNum";
import { notFound } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { Anchor, Breadcrumbs } from "@/components/shared";

const getOrder = cache(async (id: number) => {
  const order = await prisma.orders.findUnique({ where: { id }, include: { booking: true } });
  if (!order || !order.booking) notFound();
  return order;
});

//params is based on order id NOT booking id
export default async function Booking({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (!id) notFound();
  const order = await getOrder(id);
  const amount = order.quote * 100;
  const { booking } = order;
  return (
    <>
      <Breadcrumbs>
        <Anchor href={"/admin/bookings"}>Bookings</Anchor>
        <Anchor href={`/admin/bookings/completed`} className="capitalize">
          Completed
        </Anchor>
        <Anchor href={`/admin/bookings/completed/${params.id}`}>{params.id}</Anchor>
      </Breadcrumbs>
      <section className="flex gap-4 mt-5">
        <div className="w-2/4 basis-3/5 ring-1 bg-white p-4 ring-zinc-200 dark:ring-zinc-700 dark:bg-zinc-800 rounded-md">
          <div className="border-b border-zinc-200 dark:border-zinc-700 -mx-4 -mt-4 px-4 py-1 mb-4">
            <h1 className="font-bold text-4xl">Order details</h1>
          </div>
          <p className="text-gray-400 mb-4">Booking #{order.bookingId}</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p className="font-semibold text-gray-400">Quote:</p>
              <p>${formatNum(amount)}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-400">Environment:</p>
              <p>{booking.environment ? "Inside" : "Outside"}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-400">Photoshoot type:</p>
              <p className="capitalize">{booking.type}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold text-gray-400">Date:</p>
              <p className="capitalize">
                {booking.date.toDateString()}, {booking.time}
              </p>
            </div>
            <div className="">
              <p className="font-semibold text-gray-400">Add-ons:</p>
              <ul className="capitalize list-disc pl-4">
                {booking.features?.split(",").map(feature => {
                  return <li key={feature}>{feature}</li>;
                })}
              </ul>
            </div>
            <div className="flex flex-col items-center gap-2">
              <p className="font-semibold text-gray-400">Description:</p>
              <p className="capitalize">{booking.description}</p>
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
                {booking.firstName} {booking.lastName}
              </p>
            </div>
            <div className="flex justify-between  ">
              <p className="font-semibold text-gray-400">Email:</p>
              <p>{booking.email}</p>
            </div>
            <div className="flex justify-between ">
              <p className="font-semibold text-gray-400">Phone:</p>
              <p>{booking.phone}</p>
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
