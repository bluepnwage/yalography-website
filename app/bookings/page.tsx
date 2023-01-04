import { ContactForm } from "@components/bookings";
import { BookingsFormContainer } from "@components/bookings/form/Form";
import { Section, Title } from "@components/shared";
import { PageIntro } from "@components/PageIntro";
import { Suspense } from "react";

export default function BookingsPage() {
  return (
    <>
      <PageIntro>
        Book your{" "}
        <span className="bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text text-transparent">
          photoshoot today
        </span>
      </PageIntro>
      <Section className="mt-10">
        <Title className="mb-5" order={"h2"}>
          Book a session
        </Title>
        <Suspense fallback={null}>
          <BookingsFormContainer />
        </Suspense>
      </Section>
      <ContactForm />
    </>
  );
}
