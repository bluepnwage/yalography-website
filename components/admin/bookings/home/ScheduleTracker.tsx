"use client";
import { MantineProvider } from "@mantine/core";
import { Calendar as MantineCalendar } from "@mantine/dates";
import { useState, useMemo } from "react";
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
      <div className="basis-1/2">
        <MantineProvider theme={{ primaryColor: "red", fontFamily: "Inter", colorScheme: "dark" }}>
          <MantineCalendar
            dayClassName={(date) => {
              const t = date.toDateString();
              console.log(t);
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
      </div>
      <div className="basis-1/2">
        <p>AYOOOOOOOO</p>
        <p>You have {todaysBookings.length} appointments Scheduled on this date</p>
      </div>
    </>
  );
}
