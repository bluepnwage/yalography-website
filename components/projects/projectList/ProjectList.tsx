import { Grid, Section, Title } from "@components/shared";
import { Project } from "./Project";

const projs = Array(8).fill(null);

export function ProjectList() {
  return (
    <Section>
      <Title order="h2" className="text-3xl mb-10">
        Projects
      </Title>
      <Grid className="gap-5 w-11/12">
        {projs.map((_, key) => {
          return <Project key={key} />;
        })}
      </Grid>
    </Section>
  );
}
