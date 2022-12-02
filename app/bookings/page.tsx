import { ContactForm } from "@components/bookings";
import { PriceCalculator } from "@components/bookings/client";
import { BookingsFormContainer } from "@components/bookings/form/Form";
import { Section, Title } from "@components/shared";
import { PageIntro } from "@components/PageIntro";

export default function BookingsPage() {
  return (
    <>
      <PageIntro>
        Reserve your{" "}
        <span className="bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text text-transparent">
          photoshoot today
        </span>
      </PageIntro>
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
      <ContactForm />
    </>
  );
}
