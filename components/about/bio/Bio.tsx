import { Section, Title, Grid } from "@components/shared";
import { Skill } from "./Skill";
import Image from "next/image";
import gigaChad from "@public/giga-chad.jpg";

export function Bio() {
  return (
    <Section className="mt-16">
      <Grid lg={2}>
        <article className="lg:pr-10 col-span-full lg:col-span-1">
          <header className="space-y-2 mb-5">
            <Title order="h2" size={"md"} color="red">
              About us
            </Title>
            <Title order="h3">Capturing the Beauty of the World</Title>
          </header>
          <p className="text-lg">
            I am a self-taught photographer who has been taking photos since I was a teenager. Growing up, I was always
            drawn to the beauty of nature and the way that a camera could capture it. I quickly became obsessed with
            taking photos and learning as much as I could about photography. I have been honing my craft ever since,
            learning through both trial and error and taking courses to further my knowledge. I have a passion for
            portrait photography, as well as capturing candid moments and telling stories through my images. I am
            constantly striving to create unique and captivating photos that will inspire and move others.
          </p>
          <strong className="block my-4">Some of my skills include:</strong>
          <Grid lg={2} className="w-full">
            <Skill />
            <Skill />
            <Skill />
          </Grid>
        </article>
        <figure className="bg-red-600 w-full h-full col-span-full lg:col-span-1">
          <Image width={20} height={20} src={gigaChad} alt={""} className="w-full h-full" />
        </figure>
      </Grid>
    </Section>
  );
}
