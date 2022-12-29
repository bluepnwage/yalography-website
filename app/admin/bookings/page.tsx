import { Title, Card, Section } from "@components/shared";
import { Bookings } from "@components/admin/bookings/home/Bookings";
import { Calendar } from "@components/admin/bookings/home/ScheduleTracker";

export default function ReservationPage() {
  return (
    <>
      <Title className="mb-10">Reservations</Title>
      <Section className="mb-20">
        <Card className="w-full flex">
          <Calendar />
        </Card>
      </Section>
      <Bookings />
    </>
  );
}
