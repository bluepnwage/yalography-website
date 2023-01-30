import { Anchor, Breadcrumbs } from "@components/shared";
import { BookingMenu } from "@components/admin/bookings/dynamic/Menu";
import { Buttons } from "./Buttons";

import prisma from "@lib/prisma";
import { cache } from "react";
import { notFound } from "next/navigation";

const getBooking = cache(async (id: number) => {
  await prisma.$connect();
  const booking = await prisma.bookings.findUnique({ where: { id } });
  await prisma.$disconnect();
  if (!booking) notFound();
  return { ...booking, date: booking.date.toDateString() };
});

export default async function Booking({ params }: { params: { status: "pending" | "approved"; id: string } }) {
  const id = parseInt(params.id);
  if (!id) notFound();
  const booking = await getBooking(id);

  return (
    <>
      <Breadcrumbs>
        <Anchor href={"/admin/bookings"}>Bookings</Anchor>
        <Anchor href={`/admin/bookings/${params.status}`} className="capitalize">
          {params.status}
        </Anchor>
        <Anchor href={`/admin/bookings/${params.status}/${params.id}`}>{booking.id}</Anchor>
      </Breadcrumbs>
      <section className="grid grid-cols-12 gap-4 mt-5">
        <div className="col-span-4 row-span-1 row-start-1 p-4 flex flex-col  bg-white dark:bg-zinc-800 rounded-md ring-1 ring-zinc-200 dark:ring-zinc-700">
          <div className="py-2 mb-4 -mx-4 px-4 -mt-4 border-b dark:border-zinc-700 border-zinc-200">
            <h2 className="font-bold text-2xl">Customer details</h2>
          </div>
          <div className="flex flex-col grow space-y-4 justify-evenly">
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
          </div>
        </div>
        <div className="col-span-4 row-span-1 row-start-2 p-4 flex flex-col  bg-white dark:bg-zinc-800 rounded-md ring-1 ring-zinc-200 dark:ring-zinc-700">
          <div className="py-2 mb-4 -mx-4 px-4 -mt-4 border-b dark:border-zinc-700 border-zinc-200">
            <h2 className="font-bold text-2xl">Add-ons</h2>
          </div>
          <div className="flex flex-col grow space-y-4 justify-evenly">
            <ul className="list-disc pl-4">
              {booking.features?.split(",").map((feature) => {
                return <li key={feature}>{feature}</li>;
              })}
            </ul>
          </div>
        </div>

        <div className="col-span-8 row-start-1 row-span-2 ring-1 bg-white p-4 ring-zinc-200 dark:ring-zinc-700 dark:bg-zinc-800 rounded-md">
          <div className="border-b flex justify-between border-zinc-200 dark:border-zinc-700 -mx-4 -mt-4 px-4 py-1 mb-4">
            <h1 className="font-bold text-4xl">Order details</h1>
            <BookingMenu id={booking.id} status={params.status} />
          </div>
          <p className="text-gray-400 mb-4">Booking #{booking.id}</p>
          <div className="space-y-2">
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
                {booking.date}, {booking.time}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-gray-400">Description:</p>
              <p className="capitalize">{booking.description}</p>
            </div>
          </div>
        </div>
        <Buttons id={booking.id} status={params.status} />
      </section>
    </>
  );
}
