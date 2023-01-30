"use client";
import React, { createContext, useContext } from "react";
import type { SerializedBooking, SerializedOrder } from "@lib/prisma";

type CompletedOrders = SerializedBooking & { orders: Partial<SerializedOrder> };

type ContextProps = {
  pending: SerializedBooking[];
  approved: SerializedBooking[];
  completed: CompletedOrders[];
};

const BookingsContext = createContext<ContextProps | null>(null);

type PropTypes = ContextProps & { children: React.ReactNode };

export function BookingsProvider({ children, ...props }: PropTypes) {
  return <BookingsContext.Provider value={props}>{children}</BookingsContext.Provider>;
}

export function useBookings() {
  const data = useContext(BookingsContext);
  if (!data) throw new Error("Hook was not rendered under provider");
  return data;
}
