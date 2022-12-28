"use client";
import React, { createContext, useContext } from "react";
import type { SerializedBooking } from "@lib/prisma";

type ContextProps = {
  pending: SerializedBooking[];
  approved: SerializedBooking[];
  completed: SerializedBooking[];
};

const BookingsContext = createContext<ContextProps | null>(null);

type PropTypes = ContextProps & { children: React.ReactNode };

export function BookingsProvider({ children, ...props }: PropTypes) {
  return <BookingsContext.Provider value={props}>{children}</BookingsContext.Provider>;
}

export function useBookings(status: keyof ContextProps) {
  return useContext(BookingsContext)![status];
}
