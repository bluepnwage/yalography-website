import { Grid, Section, Title } from "@components/shared";
import { Button } from "@components/shared/Button";
import { Input } from "@components/shared/Input";
import { Textarea } from "@components/shared/Textarea";
import { Email, Facebook, Instagram, Location, Phone } from "@lib/icons";

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
          <form className="flex flex-col items-center justify-evenly gap-4">
            <div className="flex flex-col lg:flex-row w-full gap-4 grow basis-full">
              <Input wrapperClassName="basis-2/4 grow" label="First name" name="first_name" id="first_name" />
              <Input
                wrapperClassName="basis-2/4 grow"
                label="Last name"
                id={"last_name"}
                autoComplete={"family-name"}
              />
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4 grow basis-full">
              <Input wrapperClassName="basis-2/4 grow" type={"email"} label={"Email"} name={"email"} id={"email"} />
              <Input wrapperClassName="basis-2/4 grow" type={"number"} label={"Phone"} name={"number"} id={"number"} />
            </div>
            <div className="flex w-full gap-4 grow basis-full">
              <Input wrapperClassName="basis-2/4 grow" label="Subject" name={"subject"} id={"subject"} />
            </div>
            <Textarea rows={5} label="Message" />
            <Button className="self-end">Submit message</Button>
          </form>
        </div>
      </Grid>
    </Section>
  );
}
