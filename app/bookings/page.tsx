import { BookingsFormContainer as BookingsForm, ContactForm, Questions } from "@components/bookings";
import { Section, Title } from "@components/shared";

export default function BookingsPage() {
  return (
    <>
      <Section>
        <Title className="mb-5" order={"h2"}>
          Reserve a session
        </Title>
        <BookingsForm />
      </Section>
      <Questions />
      <ContactForm />
    </>
  );
}
