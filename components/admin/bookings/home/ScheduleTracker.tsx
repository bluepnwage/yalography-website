"use client";
import { useState } from "react";
import { CalendarTable } from "./CalendarTable";
import { cx } from "cva";
import { Calendar as AomCalendar } from "@aomdev/ui";

import { formatDate } from "@/util/formate-date";
import { SerializedBooking } from "@/lib/prisma";

type AllDates = {
  pending: { [date: string]: boolean };
  approved: { [date: string]: boolean };
};

type PropTypes = {
  pending: SerializedBooking[];
  approved: SerializedBooking[];
};

export function ScheduleTracker({ approved, pending }: PropTypes) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const allDates: AllDates = { pending: {}, approved: {} };

  const todaysBookings = approved
    .filter(booking => {
      if (!date) return false;
      return formatDate(date) === booking.date;
    })
    .concat(
      pending.filter(booking => {
        if (!date) return false;

        return formatDate(date) === booking.date;
      })
    );

  //loop over pending and approved bookings to store dates
  //where there is a booking in allDates obj
  for (let i = 0; i < approved.length; i++) {
    allDates.approved[approved[i].date] = true;
  }
  for (let i = 0; i < pending.length; i++) {
    allDates.pending[pending[i].date] = true;
  }
  return (
    <>
      <div className="basis-1/2 bg-neutral-50/60  dark:bg-neutral-900 rounded-md -ml-4 -my-4 px-4 py-4  ">
        <AomCalendar
          mode="single"
          selected={date}
          onSelect={setDate}
          formatters={{
            formatDay: d => {
              const t = formatDate(d);
              const styled =
                allDates.approved[t] && allDates.pending[t]
                  ? "bg-indigo-600"
                  : allDates.approved[t]
                  ? "bg-emerald-600"
                  : allDates.pending[t]
                  ? "bg-orange-600"
                  : "";
              return (
                <>
                  {styled ? (
                    <span className="w-full h-full relative flex items-center justify-center">
                      {d.getDate()}
                      <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${styled}`}></span>
                    </span>
                  ) : (
                    d.getDate()
                  )}
                </>
              );
            }
          }}
        />

        <div className="flex gap-2 flex-col  mt-5">
          <div className="flex grow gap-2 items-center text-sm text-center">
            <span className="w-2 h-2 rounded-full inline-block bg-orange-600"></span>
            <p>Pending bookings</p>
          </div>
          <div className="flex grow gap-2 items-center text-sm text-center">
            <span className="w-2 h-2 inline-block rounded-full bg-emerald-600"></span>
            <p>Approved bookings</p>
          </div>
          <div className="flex grow gap-2 items-center text-sm text-center">
            <span className="w-2 h-2 rounded-full inline-block bg-indigo-600"></span>
            <p>Pending and approved bookings</p>
          </div>
        </div>
      </div>
      <div
        className={cx(
          "basis-1/2 flex flex-col pl-5 items-center dark:bg-neutral-800",
          todaysBookings.length === 0 ? "justify-center" : ""
        )}
      >
        {todaysBookings.length > 0 && <CalendarTable date={date || null} todaysBookings={todaysBookings} />}
      </div>
    </>
  );
}
