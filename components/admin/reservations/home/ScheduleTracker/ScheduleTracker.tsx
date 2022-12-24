"use client";
import { useState } from "react";
import { Button } from "@components/shared/client";

export function Calendar() {
  const [date, setDate] = useState(new Date());
  console.log(1 + 1);
  const nextDate = () => {};

  return (
    <>
      <div className="flex justify-end">
        <p>Icon</p>
      </div>
      <div>
        <p className="text-center font-bold text-2xl">{formatDate(date)}</p>

        <p className="text-center">You have 0 reservations sheduled for today</p>
      </div>
      <div className="flex justify-between">
        <Button intent={"secondary"}>Previous</Button>
        <Button>Next</Button>
      </div>
    </>
  );
}

function formatDate(date: Date) {
  const formatter = Intl.DateTimeFormat("en", { dateStyle: "long" });
  return formatter.format(date);
}
