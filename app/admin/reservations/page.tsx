import { Title, Card, Section } from "@components/shared";
import { Bookings } from "@components/admin/reservations/index";
import { ScheduleTracker } from "@components/admin/reservations/index/ScheduleTracker/ScheduleTracker";

export default function ReservationPage() {
  return (
    <>
      <Title className="mb-10">Reservations</Title>
      <Section className="mb-20">
        <Card className="w-full flex flex-col justify-between">
          <ScheduleTracker />
        </Card>
      </Section>
      <Bookings />
    </>
  );
}
