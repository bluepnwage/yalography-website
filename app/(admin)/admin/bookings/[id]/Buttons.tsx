"use client";
import { useBookings } from "@/components/admin/bookings/BookingsProvider";
import { Button } from "@/components/shared/Button";

type PropTypes = {
  id: number;
  status: "pending" | "approved";
};

export function Buttons({ status, id }: PropTypes) {
  const ids = useBookings()[status];
  const currentIndex = ids.findIndex(value => value.id === id);
  const next = ids[currentIndex + 1];
  const prev = ids[currentIndex - 1];
  return (
    <div
      className={`col-span-full flex ${
        next && prev ? "justify-between" : next && !prev ? "justify-end" : "justify-start"
      } `}
    >
      {prev && (
        <Button intent="secondary" component="a" href={`/admin/bookings/${status}/${prev.id}`}>
          Previous
        </Button>
      )}
      {next && (
        <Button intent="secondary" component="a" href={`/admin/bookings/${status}/${next.id}`}>
          Next
        </Button>
      )}
    </div>
  );
}
