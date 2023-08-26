import { ContactForm } from "@/components/bookings";
import { BookingsFormContainer } from "@/components/bookings/form/Form";
import { Section } from "@/components/shared";
import { PageIntro } from "@/components/PageIntro";
import { Suspense } from "react";
import { Metadata } from "next";
import { Title } from "@aomdev/ui";

export const metadata: Metadata = {
  title: "Bookings"
};

export default function BookingsPage() {
  return (
    <>
      <PageIntro>
        Book your{" "}
        <span className="bg-gradient-to-tr from-tertiary-400 to-primary-500 bg-clip-text text-transparent">
          photoshoot today
        </span>
      </PageIntro>
      <Section className="mt-10">
        <Title className="mb-5 font-heading font-medium text-gray-50" order={2}>
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
