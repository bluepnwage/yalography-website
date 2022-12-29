"use client";
import { ScrollAreaDemo } from "@components/shared/ScrollArea";
import { Button } from "@components/shared/Button";
import { useBookings } from "../BookingsProvider";

type PropTypes = {
  status: "pending" | "approved";
};

export function BookingsCard({ status }: PropTypes) {
  const bookings = useBookings(status).slice(0, 10);
  return (
    <ScrollAreaDemo orientation="vertical" height={500} className="flex flex-col gap-5">
      {bookings.map((booking) => {
        return (
          <div
            key={booking.id}
            className="border-b border-gray-300 dark:border-gray-600 -mx-4 mb-5 px-4 pb-4 last-of-type:mb-0 last-of-type:border-none flex flex-col justify-between gap-5"
          >
            <div className="flex justify-between w-full">
              <div>
                <p>
                  {booking.firstName} {booking.lastName}
                </p>
                <time className="font-semibold text-gray-500 dark:text-gray-200">
                  {booking.date}, {booking.time}
                </time>
              </div>
              <div className="inline-block">Marriage</div>
            </div>
            <div className="flex justify-between grow">
              <Button component="a" href={`/admin/bookings/${status}/${booking.id}`} intent={"primary"}>
                View details
              </Button>
            </div>
          </div>
        );
      })}
    </ScrollAreaDemo>
  );
}
