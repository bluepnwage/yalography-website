import { Grid, Section, Title } from "@components/shared";
import pixel from "@public/pixel.jpg";
import Image from "next/image";
import { Button } from "@components/shared";

export function ContactForm() {
  return (
    <Section>
      <Title className="mb-4" order={"h2"}>
        Contact
      </Title>
      <Grid>
        <div className="bg-zinc-800 col-span-8 overflow-hidden flex flex-col rounded-md">
          <figure className="mb-5 ">
            <Image src={pixel} alt={""} className="h-96" />
          </figure>
          <div className="flex justify-between p-4">
            <div>
              <p>Call us</p>
              <address>0690 555 5555</address>
            </div>
            <div>
              <p>Email</p>
              <address>email@gmail.com</address>
            </div>
            <div>
              <p>Location</p>
              <address>Marigot, Saint Martin</address>
            </div>
          </div>
        </div>
        <div className="col-span-4 bg-zinc-800 p-4 rounded-md">
          <Title className="text-center" order={"h3"}>
            Send us a message
          </Title>
          <form className="flex flex-col h-full items-center justify-evenly">
            <Input />
            <Input />
            <Textarea />
            <Button fullWidth>Submit message</Button>
          </form>
        </div>
      </Grid>
    </Section>
  );
}

function Input() {
  return (
    <p className="w-full">
      <label className="block">Name</label>
      <input className="appearance-none w-full outline-none border border-gray-700 rounded-sm px-2 py-1 bg-zinc-700" />
    </p>
  );
}

function Textarea() {
  return (
    <p className="w-full">
      <label className="block">Message</label>
      <textarea className="bg-zinc-700 border w-full border-gray-700 rounded-sm px-2 py-1 outline-none appearance-none" />
    </p>
  );
}
