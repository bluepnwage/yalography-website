import { BookingsPaginationProvider } from "./PaginationProvider";

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return <BookingsPaginationProvider>{children}</BookingsPaginationProvider>;
}
