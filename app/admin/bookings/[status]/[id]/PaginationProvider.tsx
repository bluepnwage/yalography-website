"use client";
import { createContext, useContext } from "react";
import { useBookings } from "@components/admin/bookings/BookingsProvider";
const PaginationContext = createContext<number[]>([]);

export function BookingsPaginationProvider({ children }: { children: React.ReactNode }) {
  const { approved, pending } = useBookings();
  const ids = approved.concat(pending).map(({ id }) => id);
  return <PaginationContext.Provider value={ids}>{children}</PaginationContext.Provider>;
}

export function useBookingsPaginiation() {
  return useContext(PaginationContext);
}
