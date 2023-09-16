import { PageIntro } from "@/components/PageIntro";
import { Project } from "@/components/projects";
import { Grid, Section } from "@/components/shared";
import { Title } from "@aomdev/ui";

import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { transformImage } from "@/lib/transform-image";

async function getProjects() {
  await prisma.$connect();
  const projects = await prisma.projects.findMany({ where: { published: true } });
  await prisma.$disconnect();
  return projects.map(project => ({
    ...project,
    thumbnail:
      project.thumbnailPublicId && project.thumbnailType
        ? transformImage("w_1500", project.thumbnailPublicId, project.thumbnailType)
        : project.thumbnail
  }));
}

export const metadata: Metadata = {
  title: "Projects"
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  console.log(projects);
  return (
    <>
      <PageIntro>
        See how we deliver the <br />
        <span className="bg-gradient-to-tr from-tertiary-400 to-primary-500 bg-clip-text text-transparent">
          best photoshoots
        </span>
        <br />
        SXM has to offer
      </PageIntro>
      <Section className="mt-16">
        <Title order={2} className="font-heading font-medium mb-10">
          Projects
        </Title>
        <Grid className="gap-5 w-11/12">
          {projects.map(project => {
            return <Project project={project} key={project.id} />;
          })}
        </Grid>
      </Section>
    </>
  );
}
