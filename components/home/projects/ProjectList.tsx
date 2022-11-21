import { Grid, Section, Title } from "@components/shared";
import { Project } from "./Project";

import airport from "@public/airport-md.jpg";
import wedding from "@public/wedding-md.jpg";
import pixel from "@public/pixel.jpg";
import model from "@public/model2-sm.jpg";

import type { PropTypes as ProjectProps } from "./Project";
import Link from "next/link";

const projects: ProjectProps[] = [
  { title: "Model", image: model, href: "", colSpan: "lg:col-span-4", rowSpan: "lg:row-span-2" },
  { title: "Wedding", image: wedding, href: "", colSpan: "lg:col-span-4", rowSpan: "lg:row-span-2" },
  { title: "Airport", image: airport, href: "", colSpan: "lg:col-span-4", rowSpan: "lg:row-span-2" },
  { title: "Pixel Art", image: pixel, href: "", colSpan: "lg:col-span-8", rowSpan: "lg:row-span-1" }
];

export function ProjectList() {
  return (
    <Section>
      <Grid rows="grid-rows-5 lg:grid-rows-3" gap="gap-4" width="w-11/12">
        <div className="bg-zinc-800 col-span-full lg:col-span-4 p-4 h-64 flex flex-col justify-center items-center gap-10">
          <header className="text-center space-y-2">
            <Title color={"text-red-500"} order={"h2"}>
              Projects
            </Title>
            <Title order={"h3"} className="text-3xl">
              Check out some of our works
            </Title>
          </header>
          <Link className="bg-red-600 text-gray-100 font-semibold rounded-md px-4 py-2" href={"/projects"}>
            View all projects
          </Link>
        </div>
        {projects.map((proj, key) => {
          return <Project {...proj} key={key} />;
        })}
      </Grid>
    </Section>
  );
}
