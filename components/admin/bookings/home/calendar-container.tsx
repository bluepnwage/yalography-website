import { getBookings } from "@/lib/admin-data";
import { ScheduleTracker } from "./ScheduleTracker";

export async function CalendarContainer() {
  const bookings = await getBookings();
  const pending = bookings.filter(booking => booking.status === "pending");
  const approved = bookings.filter(booking => booking.status === "approved");
  return <ScheduleTracker pending={pending} approved={approved} />;
}
