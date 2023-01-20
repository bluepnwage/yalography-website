import { Grid, Section, Title } from "@components/shared";
import { Email, Facebook, Instagram, Location, Phone } from "@lib/icons";
import { Form } from "./Form";
import { Suspense } from "react";

export function ContactForm() {
  return (
    <Section id="contact">
      <Title className="mb-4" order={"h2"}>
        Contact
      </Title>
      <Grid gap={"none"} className="bg-white shadow-xl rounded-md overflow-hidden dark:shadow-none dark:bg-zinc-800">
        <div className="bg-gradient-to-tr from-rose-500 to-red-600 text-gray-100 space-y-7 col-span-full lg:col-span-4 p-6 ">
          <Title order={"h3"} size={"lg"} className="text-gray-100">
            Contact information
          </Title>
          <div className="flex gap-2">
            <Phone className="fill-gray-100" />
            <address>0690 555 5555</address>
          </div>
          <div className="flex gap-2">
            <Email className="fill-gray-100" />
            <address>email@gmail.com</address>
          </div>
          <div className="flex gap-2">
            <Location className="fill-gray-100" />
            <address>Marigot, Saint Martin</address>
          </div>
          <div className="flex gap-4">
            <Instagram size={36} className="stroke-gray-100" />
            <Facebook size={36} className="stroke-gray-100" />
          </div>
        </div>
        <div className="col-span-full lg:col-span-8 rounded-md p-6">
          <Title order={"h3"} className="mb-2">
            Send us a message
          </Title>
          <Suspense fallback={null}>
            <Form />
          </Suspense>
        </div>
      </Grid>
    </Section>
  );
}
