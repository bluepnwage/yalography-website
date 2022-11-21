import { Button, Grid, Section, ThemeIcon, Title } from "@components/shared";
import Image from "next/image";
import bgImage from "@public/bg.jpg";
import * as Icon from "./icons";

export function Contact() {
  return (
    <Section margin="mb-0" className={`svg-background py-16 border-t border-zinc-700`}>
      <header className="space-y-2 text-center mb-16">
        <Title color="text-red-500" order={"h2"}>Contact</Title>
        <Title order="h3" className="text-3xl">
          Ready to get in touch?
        </Title>
      </header>
      <Grid width="w-11/12" gap="gap-4">
        <div className="bg-zinc-800 flex flex-col items-center justify-center gap-4 col-span-full lg:col-span-3 h-64 w-full">
          <ThemeIcon aria-hidden>
            <Icon.Email />
          </ThemeIcon>
          <p className="font-semibold text-xl">Email</p>
          <address>
            <a href="mailto:yalography@gmail.com">yalography@gmail.com</a>
          </address>
        </div>
        <div className="bg-zinc-800 flex flex-col items-center gap-4 justify-center col-span-full lg:col-span-3 h-64 w-full">
          <ThemeIcon aria-hidden>
            <Icon.Location />
          </ThemeIcon>
          <p className="font-semibold text-xl">Address</p>
          <address>Marigot, Saint-Martin</address>
        </div>
        <figure className="bg-zinc-800 col-span-full row-start-1 lg:col-span-6  w-full h-full lg:row-span-2">
          <Image src={bgImage} alt={""} className="h-full" />
        </figure>
        <div className="bg-zinc-800 col-span-6 h-64 w-full gap-4 flex flex-col justify-center items-center">
          <p className="font-bold text-xl">Book a reservation</p>
          <Button>Request a session</Button>
        </div>
      </Grid>
    </Section>
  );
}
