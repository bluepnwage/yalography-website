"use client";
import { MantineProvider } from "@mantine/core";
import { Calendar as MantineCalendar } from "@mantine/dates";
import { useState } from "react";
import { useBookings } from "../BookingsProvider";

import styles from "./Calendar.module.css";

type AllDates = {
  pending: { [date: string]: boolean };
  approved: { [date: string]: boolean };
};

export function Calendar() {
  const [date, setDate] = useState<Date | null>(new Date());
  const bookings = useBookings("approved");
  const pendingBookings = useBookings("pending");

  const allDates: AllDates = { pending: {}, approved: {} };

  const todaysBookings = bookings
    .filter((booking) => {
      return date?.toDateString() === booking.date;
    })
    .concat(
      pendingBookings.filter((booking) => {
        return date?.toDateString() === booking.date;
      })
    );

  for (let i = 0; i < bookings.length; i++) {
    allDates.approved[bookings[i].date] = true;
  }
  for (let i = 0; i < pendingBookings.length; i++) {
    allDates.pending[pendingBookings[i].date] = true;
  }

  return (
    <>
      <div className="basis-1/2 bg-gray-50 border-zinc-300 dark:bg-zinc-900 rounded-md -ml-4 -my-4 px-4 py-4 border dark:border-zinc-700">
        <MantineProvider theme={{ primaryColor: "red", fontFamily: "Inter", colorScheme: "dark" }}>
          <MantineCalendar
            classNames={{
              day: `text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-zinc-600
              data-[outside=true]:text-gray-400 data-[outside=true]:hover:text-gray-700
              data-[outside=true]:dark:hover:text-gray-300 data-[outside=true]:dark:text-gray-500
              data-[weekend=true]:dark:text-red-500 data-[weekend=true]:text-red-600
              data-[selected=true]:text-white data-[selected=true]:dark:text-white  
              `,
              weekday: "text-gray-500 dark:text-gray-400",
              month: "text-red-500 dark:text-gray-400",
              yearPickerControl: "hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-900 dark:text-gray-100",
              monthPickerControl: "hover:bg-gray-300 dark:hover:bg-zinc-600 text-gray-900 dark:text-gray-100",
              yearPickerControls: "text-rose-600 stroke-rose-600",
              calendarHeaderControl: "text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600",
              calendarHeaderLevel: "text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-zinc-600"
            }}
            dayClassName={(date) => {
              const t = date.toDateString();
              return allDates.approved[t] && allDates.pending[t]
                ? styles.sharedDay
                : allDates.approved[t]
                ? styles.day
                : allDates.pending[t]
                ? styles.dayPending
                : "";
            }}
            value={date}
            onChange={setDate}
            fullWidth
          />
        </MantineProvider>
        <div className="flex gap-2 justify-evenly flex-wrap mt-5">
          <div className="flex items-center grow gap-2 flex-col text-center">
            <span className="w-4 h-4 rounded-full inline-block bg-orange-600"></span>
            <p>Pending bookings</p>
          </div>
          <div className="flex items-center grow gap-2 flex-col text-center">
            <span className="w-4 h-4 inline-block rounded-full bg-emerald-600"></span>
            <p>Approved bookings</p>
          </div>
          <div className="flex items-center flex-col gap-2 grow text-center">
            <span className="w-4 h-4 rounded-full inline-block bg-red-600"></span>
            <p>Pending and approved bookings</p>
          </div>
        </div>
      </div>
      <div className="basis-1/2 flex items-center justify-center">
        <p className="text-lg">
          You have {todaysBookings.length} {todaysBookings.length === 1 ? "appointment" : "appointments"} Scheduled on{" "}
          {date?.toDateString()}.
        </p>
      </div>
    </>
  );
}
