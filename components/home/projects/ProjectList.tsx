import { Button, Grid, Section } from "@components/shared";
import { Project } from "./Project";

import airport from "@public/airport-md.jpg";
import wedding from "@public/wedding-md.jpg";
import pixel from "@public/pixel.jpg";
import model from "@public/model2-sm.jpg";

import type { PropTypes as ProjectProps } from "./Project";

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
            <h2 className="text-red-500 font-bold">Projects</h2>
            <h3 className="font-bold text-gray-100 text-2xl">Check out some of our works</h3>
          </header>
          <Button>View all projects</Button>
        </div>
        {projects.map((proj, key) => {
          return <Project {...proj} key={key} />;
        })}
      </Grid>
    </Section>
  );
}
