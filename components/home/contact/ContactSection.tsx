import { Button, Grid, Section, ThemeIcon, Title } from "@components/shared";
import Image from "next/image";
import bgImage from "@public/bg.jpg";
import * as Icon from "./icons";

export function Contact() {
  return (
    <Section
      margin={false}
      className={`svg-background bg-gray-50 dark:bg-transparent items-center py-16 border-t border-zinc-200 dark:border-zinc-700`}
    >
      <header className="space-y-2 text-center mb-16">
        <Title color="red" order={"h2"} size={"md"}>
          Contact
        </Title>
        <Title order="h3">Ready to get in touch?</Title>
      </header>
      <Grid>
        <div className="bg-white ring-1 duration-200 ease-out ring-black ring-opacity-5 dark:ring-0 dark:bg-zinc-800 flex flex-col items-center justify-center gap-4 col-span-full lg:col-span-3 h-64 w-full">
          <ThemeIcon aria-hidden>
            <Icon.Email />
          </ThemeIcon>
          <p className="font-semibold text-xl">Email</p>
          <address>
            <a href="mailto:yalography@gmail.com">yalography@gmail.com</a>
          </address>
        </div>
        <div className="bg-white ring-1 duration-200 ease-out ring-black ring-opacity-5 dark:ring-0 dark:bg-zinc-800 flex flex-col items-center gap-4 justify-center col-span-full lg:col-span-3 h-64 w-full">
          <ThemeIcon aria-hidden>
            <Icon.Location />
          </ThemeIcon>
          <p className="font-semibold text-xl">Address</p>
          <address>Marigot, Saint-Martin</address>
        </div>
        <figure className="bg-white ring-1  ring-black  ring-opacity-5 dark:ring-0 dark:bg-zinc-800 col-span-full row-start-1 lg:col-span-6  w-full h-full lg:row-span-2">
          <Image src={bgImage} alt={""} className="h-full w-full object-cover" />
        </figure>
        <div className="bg-white ring-1 duration-200 ease-out ring-black ring-opacity-5 dark:ring-0 dark:bg-zinc-800 col-span-6 h-64 w-full gap-4 flex flex-col justify-center items-center">
          <p className="font-bold text-xl">Book a reservation</p>
          <Button>Request a session</Button>
        </div>
      </Grid>
    </Section>
  );
}
