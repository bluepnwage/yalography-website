"use client";
import { useBookingsPaginiation } from "./PaginationProvider";

type PropTypes = {
  id: number;
  status: "pending" | "approved";
};

export function Buttons() {
  const ids = useBookingsPaginiation();
  console.log(ids);
  return <></>;
}
