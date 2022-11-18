import { Button, Grid, Section } from "@components/shared";
import Image from "next/image";
import airport from "@public/airport-md.jpg";
import wedding from "@public/wedding-md.jpg";
import pixel from "@public/pixel.jpg";
import model from "@public/model2-sm.jpg";

export function Projects() {
  return (
    <Section>
      <Grid gap="gap-4" width="w-11/12">
        <div className="bg-zinc-800 col-span-4 p-4 h-64 flex flex-col justify-center items-center gap-10">
          <header className="text-center space-y-2">
            <h2 className="text-red-500 font-bold">Projects</h2>
            <h3 className="font-bold text-gray-100 text-2xl">Check out some of our works</h3>
          </header>
          <Button>View all projects</Button>
        </div>
        <figure className="col-span-4 bg-red-500 row-span-2 h-full w-full overflow-hidden">
          <Image src={model} alt={""} className="h-full" />
        </figure>
        <figure className="col-span-4 bg-red-500 row-span-2 h-full w-full overflow-hidden">
          <Image src={wedding} alt={""} className="h-full" />
        </figure>
        <figure className="col-span-4 bg-red-500 row-span-2 h-full w-full overflow-hidden">
          <Image src={airport} alt={""} className="h-full" />
        </figure>
        <figure className="col-span-8 bg-red-500  h-full w-full overflow-hidden">
          <Image src={pixel} alt={""} className="h-full" />
        </figure>
      </Grid>
    </Section>
  );
}
