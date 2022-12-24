import { Grid, Section, Title } from "@components/shared";
import Image from "next/image";
import pixel from "@public/pixel2.jpg";

export function SkillDetails() {
  return (
    <Section margin={false} className={`svg-background py-16 border-t border-zinc-200 dark:border-zinc-700`}>
      <Grid lg={1} className={"gap-16 lg:gap-36"}>
        <Skill />
        <Skill />
        <Skill />
      </Grid>
    </Section>
  );
}

function Skill() {
  return (
    <article className="flex gap-10 flex-col-reverse col-span-full lg:col-span-1 lg:flex-row lg:even:flex-row-reverse">
      <div className="basis-1/2 grow">
        <header className="mb-5 space-y-2">
          <Title order="h2" size={"md"} color="red">
            Editing
          </Title>
          <Title order="h3">Something about editing</Title>
        </header>
        <p className="text-lg">
          Commodo nulla laboris non ullamco veniam consequat laborum esse. Nulla magna laboris pariatur qui
          reprehenderit mollit anim officia. Deserunt sunt Lorem duis culpa officia non culpa ex. Mollit veniam
          reprehenderit in minim fugiat incididunt irure magna nostrud ex labore eu duis in. Irure consectetur nisi
          aliquip incididunt amet incididunt.
        </p>
      </div>
      <figure className="bg-red-600 basis-1/2 grow">
        <Image src={pixel} className="w-full h-full" alt={""} />
      </figure>
    </article>
  );
}
