import { Grid, Section, Title, Button } from "@components/shared";
import * as Icon from "./icons";

import type { ComponentPropsWithoutRef } from "react";

export function ContactForm() {
  return (
    <Section>
      <Title className="mb-4" order={"h2"}>
        Contact
      </Title>
      <Grid gap={"none"} className="bg-white shadow-xl dark:bg-zinc-800">
        <div className="bg-gradient-to-tr from-rose-500 to-red-600 text-gray-100 space-y-7 col-span-4 p-6 ">
          <Title order={"h3"} size={"lg"} className="text-gray-100">
            Contact information
          </Title>
          <div className="flex gap-2">
            <Icon.Phone />
            <address>0690 555 5555</address>
          </div>
          <div className="flex gap-2">
            <Icon.Mail />
            <address>email@gmail.com</address>
          </div>
          <div className="flex gap-2">
            <Icon.Location />
            <address>Marigot, Saint Martin</address>
          </div>
          <div className="flex gap-4">
            <Icon.Instagram />
            <Icon.Facebook />
          </div>
        </div>
        <div className="col-span-8 rounded-md p-6">
          <Title order={"h3"} className="mb-2">
            Send us a message
          </Title>
          <form className="flex flex-col items-center justify-evenly gap-4">
            <div className="flex w-full gap-4 grow basis-full">
              <Input label="First name" name="first_name" id="first_name" />
              <Input label="Last name" id={"last_name"} autoComplete={"family-name"} />
            </div>
            <div className="flex w-full gap-4 grow basis-full">
              <Input type={"email"} label={"Email"} name={"email"} id={"email"} />
              <Input type={"number"} label={"Phone"} name={"number"} id={"number"} />
            </div>
            <div className="flex w-full gap-4 grow basis-full">
              <Input label="Subject" name={"subject"} id={"subject"} />
            </div>

            <Textarea />
            <Button className="self-end">Submit message</Button>
          </form>
        </div>
      </Grid>
    </Section>
  );
}

interface PropTypes extends ComponentPropsWithoutRef<"input"> {
  label: string;
}

function Input({ label, id, ...props }: PropTypes) {
  return (
    <p className="grow basis-2/4">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        // autoComplete={""}
        {...props}
        className="appearance-none w-full outline-none border border-gray-400 dark:border-gray-700 rounded-md px-4 py-2 bg-zinc-100 dark:bg-zinc-700"
      />
    </p>
  );
}

function Textarea() {
  return (
    <p className="w-full">
      <label className="block">Message</label>
      <textarea
        rows={5}
        className="bg-zinc-100 dark:bg-zinc-700 resize-none border w-full border-gray-400 dark:border-gray-700 rounded-md px-2 py-1 outline-none appearance-none"
      />
    </p>
  );
}
