import { PageIntro } from "@components/PageIntro";
import { Project } from "@components/projects";
import { Grid, Section, Title } from "@components/shared";

import prisma from "@lib/prisma";

async function getProjects() {
  await prisma.$connect();
  const projects = await prisma.projects.findMany({ where: { published: true } });
  await prisma.$disconnect();
  return projects;
}

export default async function ProjectsPage() {
  const projects = await getProjects();
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
      <Section className="mt-16">
        <Title order="h2" className="text-3xl mb-10">
          Projects
        </Title>
        <Grid className="gap-5 w-11/12">
          {projects.map((project) => {
            return <Project project={project} key={project.id} />;
          })}
        </Grid>
      </Section>
    </>
  );
}
