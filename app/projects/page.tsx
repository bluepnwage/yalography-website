import { PageIntro } from "@components/PageIntro";
import { Filter, Project } from "@components/projects";
import { Grid, Section, Title } from "@components/shared";

export default function ProjectsPage() {
  const projs = Array(9).fill(null);
  return (
    <>
      <PageIntro>
        See how we deliver the <br />
        <span className="bg-gradient-to-tr from-rose-500 to-red-600 bg-clip-text text-transparent">
          best photoshoots
        </span>
        <br />
        SXM has to offer
      </PageIntro>
      <Filter />
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
    </>
  );
}
