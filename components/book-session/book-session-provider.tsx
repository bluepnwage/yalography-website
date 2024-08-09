"use client";
import { useContext, createContext } from "react";
import { useForm } from "./use-booking-form";

type ContextProps = ReturnType<typeof useForm>;

const BookSessionContext = createContext<ContextProps | null>(null);

export function BookingSessionProvider({ children }: { children: React.ReactNode }) {
  const props = useForm();
  return <BookSessionContext.Provider value={props}>{children}</BookSessionContext.Provider>;
}

export function useBookingSession() {
  const data = useContext(BookSessionContext);
  if (!data) throw new Error("Must use context within provider");
  return data;
}
