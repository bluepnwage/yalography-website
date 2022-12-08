import { Title, Card, Section } from "@components/shared";
import { Bookings } from "@components/admin/reservations/home/bookings/Bookings";
import { Calendar } from "@components/admin/reservations/home/ScheduleTracker/ScheduleTracker";

export default function ReservationPage() {
  return (
    <>
      <Title className="mb-10">Reservations</Title>
      <Section className="mb-20">
        <Card className="w-full flex flex-col justify-between">
          <Calendar />
        </Card>
      </Section>
      <Bookings />
    </>
  );
}
