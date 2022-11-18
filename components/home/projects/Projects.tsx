import { Button, Grid, Section } from "@components/shared";

export function Projects() {
  return (
    <Section>
      <Grid rows="grid-rows-3" gap="gap-4" width="w-11/12">
        <div className="bg-zinc-800 col-span-4 p-4 h-64 flex flex-col justify-center items-center gap-10">
          <header className="text-center space-y-2">
            <h2 className="text-red-500 font-bold">Projects</h2>
            <h3 className="font-bold text-gray-100 text-2xl">Check out some of our works</h3>
          </header>
          <Button>View all projects</Button>
        </div>
        <div className="col-span-4 bg-red-500 row-span-2 h-full w-full"></div>
        <div className="col-span-4 bg-red-500 row-span-2 h-full w-full"></div>
        <div className="col-span-4 bg-red-500 row-span-2 h-full w-full"></div>
        <div className="col-span-8 bg-red-500  h-full w-full"></div>
      </Grid>
    </Section>
  );
}
