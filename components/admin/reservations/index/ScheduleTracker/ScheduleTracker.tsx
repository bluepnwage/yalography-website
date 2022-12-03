"use client";
import { useState } from "react";
import { Button } from "@components/shared";
export function ScheduleTracker() {
  const [date, setDate] = useState(new Date());

  const nextDate = () => {};

  return (
    <>
      <div className="flex justify-end">
        <p>Icon</p>
      </div>
      <p className="text-center">You have 0 reservations sheduled for today</p>
      <div className="flex justify-between">
        <Button intent={"secondary"}>Previous</Button>
        <Button>Next</Button>
      </div>
    </>
  );
}
