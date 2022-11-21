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
            <Title order="h3">Random title</Title>
          </header>
          <p className="text-lg">
            Occaecat commodo amet amet laboris pariatur fugiat. Et occaecat dolore elit consectetur officia aliquip elit
            veniam occaecat aliquip dolore id et elit. Duis commodo eiusmod minim nostrud adipisicing officia anim
            ipsum. Culpa do aute consectetur irure voluptate non excepteur anim non anim. Ad mollit mollit eiusmod est.
            Qui magna esse nisi proident consequat exercitation. Velit nostrud proident exercitation proident qui dolore
            veniam nisi excepteur consectetur.
          </p>
          <strong className="block my-4">Some of my skills include:</strong>
          <Grid lg={2} className="w-full">
            <Skill />
            <Skill />
            <Skill />
          </Grid>
        </article>
        <figure className="bg-red-600 w-full h-full col-span-full lg:col-span-1">
          <Image src={gigaChad} alt={""} />
        </figure>
      </Grid>
    </Section>
  );
}
