import { Grid, Section } from "@/components/shared";
import { Email, Facebook, Instagram, Location, Phone } from "@/lib/icons";
import { Form } from "./Form";
import { Suspense } from "react";
import { Title } from "@aomdev/ui";

export function ContactForm() {
  return (
    <Section id="contact">
      <Title className="mb-4 font-heading font-medium" order={2}>
        Contact
      </Title>
      <Grid
        gap={"none"}
        className="bg-white shadow-xl rounded-md overflow-hidden dark:shadow-none dark:bg-neutral-800"
      >
        <div className="bg-gradient-to-tr from-tertiary-500 to-primary-600 text-gray-100 space-y-7 col-span-full lg:col-span-4 p-6 ">
          <Title order={2} className="text-gray-100 font-medium font-heading">
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
            <a
              title={"Instagram page"}
              aria-label={"Instagram page"}
              href={"https://instagram.com/yalography"}
              target={"_blank"}
              rel={"noreferrer"}
            >
              <Instagram size={36} className="stroke-gray-100" />
            </a>
            <a
              aria-label="Facebook page"
              title={"Facebook page"}
              href={"https://www.facebook.com/yalographysxm"}
              target={"_blank"}
              rel={"noreferrer"}
            >
              <Facebook size={36} className="stroke-gray-100" />
            </a>
          </div>
        </div>
        <div className="col-span-full lg:col-span-8 rounded-md p-6">
          <Title order={3} className="mb-2 font-heading font-medium">
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
