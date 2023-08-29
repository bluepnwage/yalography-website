"use client";
import { Button } from "@aomdev/ui";
import { useCommand } from "../../command-provider";
import { IconPlus } from "@tabler/icons-react";
import { Card } from "@aomdev/ui";

export function CreateBooking() {
  const { dispatch } = useCommand();
  return (
    <>
      <Button size={"sm"} onClick={() => dispatch({ type: "bookings", payload: true })}>
        <IconPlus size={16} className="inline-block mr-1" />
        Create booking
      </Button>
    </>
  );
}
