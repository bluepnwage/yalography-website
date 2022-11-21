import { Section, Title, Grid } from "@components/shared";
import { Skill } from "./Skill";
import Image from "next/image";
import gigaChad from "@public/giga-chad.jpg";

export function Bio() {
  return (
    <Section>
      <Grid width="w-11/12" cols="lg:grid-cols-2">
        <article className="pr-10">
          <header className="space-y-2 mb-5">
            <Title order="h2" color="text-red-500">
              About us
            </Title>
            <Title order="h3" className="text-3xl">
              Random title
            </Title>
          </header>
          <p className="text-lg">
            Occaecat commodo amet amet laboris pariatur fugiat. Et occaecat dolore elit consectetur officia aliquip elit
            veniam occaecat aliquip dolore id et elit. Duis commodo eiusmod minim nostrud adipisicing officia anim
            ipsum. Culpa do aute consectetur irure voluptate non excepteur anim non anim. Ad mollit mollit eiusmod est.
            Qui magna esse nisi proident consequat exercitation. Velit nostrud proident exercitation proident qui dolore
            veniam nisi excepteur consectetur.
          </p>
          <strong className="block my-4">Some of my skills include:</strong>
          <Grid cols="lg:grid-cols-2" gap="gap-2">
            <Skill />
            <Skill />
            <Skill />
          </Grid>
        </article>
        <figure className="bg-red-600 w-full h-full">
          <Image src={gigaChad} alt={""} />
        </figure>
      </Grid>
    </Section>
  );
}
