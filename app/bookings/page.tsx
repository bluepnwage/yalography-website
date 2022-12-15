import { ContactForm } from "@components/bookings";
import { BookingsFormContainer } from "@components/bookings/form/Form";
import { Section, Title } from "@components/shared";
import { PageIntro } from "@components/PageIntro";
import { Card } from "@components/shared";
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
        <Title className="mb-5" order={"h2"}>
          Reserve a session
        </Title>
        <Card>
          <BookingsFormContainer />
        </Card>
      </Section>
      <ContactForm />
    </>
  );
}
