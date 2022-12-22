import { Grid, Title, Section } from "@components/shared";
import { Button } from "@components/shared/Button";

import Image from "next/image";
import photographer from "@public/photographer-lg.jpg";
import { Stats } from "./Stats";

export function AboutSection() {
  return (
    <Section>
      <Grid>
        <figure className="col-span-full lg:col-span-4 bg-red-600">
          <Image src={photographer} alt={""} width={200} height={200} className="w-full h-full" />
        </figure>
        <div className="col-span-full lg:col-span-7 p-5">
          <header className="mb-7 space-y-2">
            <Title order={"h2"} color="red" size={"md"}>
              About
            </Title>
            <Title order={"h3"} className="text-3xl">
              Yalography
            </Title>
          </header>
          <p className="leading-loose text-lg mb-10">
            My journey as a photographer began when I was a young teen, and I have been exploring the world of
            photography ever since. Over the years, I have had the privilege to work with some of the most renowned
            companies in the Caribbean. I have honed my skills to capture the beauty of the world, with the goal of
            helping others to appreciate its wonders. I am now proud to offer my services as a photographer, and I look
            forward to working with you.
          </p>
          <Stats />
          <Button className="mx-auto block">View gallery</Button>
        </div>
      </Grid>
    </Section>
  );
}
