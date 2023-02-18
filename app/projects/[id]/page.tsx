//Components
import { Gallery } from "@components/dynamic-project";
import { Section, Title, Breadcrumbs, Anchor, Grid, Card } from "@components/shared";

import prisma from "@lib/prisma";
import { notFound } from "next/navigation";
import { findProject } from "@util/findProject";
import { cx } from "cva";

export async function generateStaticParams() {
  await prisma.$connect();
  const ids = await prisma.projects.findMany({ where: { published: true }, select: { id: true } });
  await prisma.$disconnect();
  return ids.map(id => ({ id: `${id.id}` }));
}

export default async function DynamicProjectPage({ params }: { params: { id: string } }) {
  const id = parseInt(params?.id);
  if (!id) notFound();
  const project = await findProject(id);
  if (!project) notFound();

  return (
    <>
      <Section className="mt-16">
        <div className="w-11/12">
          <Breadcrumbs>
            <Anchor href={"/"}>Home</Anchor>
            <Anchor href={"/projects"}>Projects</Anchor>
            <Anchor href={`/projects/${project.id}`}>{project.title}</Anchor>
          </Breadcrumbs>
          <h1 className="mt-20 font-bold text-4xl lg:text-6xl text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-600">
            {project.title}
          </h1>
          <Grid lg={project.testimonial ? 2 : 1} fullWidth className="mb-10 lg:mb-36">
            <div
              className={cx(
                "col-span-full lg:col-span-1",
                !project.testimonial ? "flex flex-col items-center lg:w-3/5 mx-auto" : ""
              )}
            >
              <header className="mb-5">
                <Title order={"h2"}>Overview</Title>
              </header>
              <p className="text-lg">{project.description}</p>
            </div>
            {project.testimonial && (
              <Card className="col-span-full lg:col-span-1">
                <p className="text-center text-red-600 dark:text-red-500 mb-5">Testimonial</p>
                <p className="text-lg mb-5">{project.testimonial}</p>
                <strong>{project.customerName}</strong>
                <p className="text-red-600 dark:text-red-500 text-sm mt-5">{project.companyName}</p>
              </Card>
            )}
          </Grid>
          <Gallery images={project.images} />
        </div>
      </Section>
    </>
  );
}
