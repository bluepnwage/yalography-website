import { Card, ThemeIcon } from "@aomdev/ui";
import { getBookings } from "@/lib/admin-data";

type PropTypes = {
  title: string;
  icon: React.ReactNode;
};

export async function BookingCard({ icon, title }: PropTypes) {
  const bookings = await getBookings();
  const today = new Date();
  const filteredBookings =
    title === "pending"
      ? bookings.filter(booking => booking.status === "pending")
      : bookings.filter(booking => booking.status === "approved");
  const thisMonth = {
    year: today.getFullYear(),
    month: today.getMonth()
  };
  const sameMonth = filteredBookings.filter(booking => {
    const bookingDate = new Date(booking.date);
    return bookingDate.getMonth() === thisMonth.month && bookingDate.getFullYear() === thisMonth.year;
  });
  return (
    <Card className="grow relative flex justify-between flex-col">
      <div className="flex items-center justify-between">
        <p className="font-medium text-xl capitalize">{title} bookings</p>
        <ThemeIcon variant={"light"}>{icon}</ThemeIcon>
      </div>
      <div className="space-y-4">
        <p className="text-5xl font-medium font-heading mt-auto mb-auto">{filteredBookings.length}</p>
        <p className="dark:text-gray-200 text-gray-600">
          <span className="font-medium ">{sameMonth.length}</span> upcoming this month
        </p>
      </div>
    </Card>
  );
}
