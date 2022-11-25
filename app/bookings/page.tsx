import { ContactForm, Questions } from "@components/bookings";
import { PriceCalculator } from "@components/bookings/client";
import { BookingsFormContainer } from "@components/bookings/form/Form";
import { Section, Title } from "@components/shared";

export default function BookingsPage() {
  return (
    <>
      <Section className="mt-10">
        <Title order={"h2"}>Price calculator</Title>
        <PriceCalculator />
      </Section>
      <Section>
        <Title className="mb-5" order={"h2"}>
          Reserve a session
        </Title>
        <BookingsFormContainer />
      </Section>
      <Questions />
      <ContactForm />
    </>
  );
}
