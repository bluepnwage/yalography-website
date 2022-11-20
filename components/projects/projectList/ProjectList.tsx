import { Grid, Section } from "@components/shared";
import { Project } from "./Project";

const projs = Array(8).fill(null);

export function ProjectList() {
  return (
    <Section>
      <h2 className="font-bold text-4xl mb-10">Projects</h2>
      <Grid className="gap-5 w-11/12">
        {projs.map((_, key) => {
          return <Project key={key} />;
        })}
      </Grid>
    </Section>
  );
}
