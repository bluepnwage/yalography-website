//Components
import { Gallery } from "@components/dynamic-project";
import { Section, Title, Breadcrumbs, Anchor, Grid, Card } from "@components/shared";
import Image from "next/image";

import prisma from "@lib/prisma";
import { notFound } from "next/navigation";
//Assets
import pixel from "@public/pixel.jpg";

export async function generateStaticParams() {
  await prisma.$connect();
  const ids = await prisma.projects.findMany({ where: { published: true }, select: { id: true } });
  await prisma.$disconnect();
  return ids.map((id) => ({ id: `${id.id}` }));
}

async function findProject(id: number) {
  await prisma.$connect();
  const project = await prisma.projects.findUnique({ where: { id }, include: { images: true } });
  await prisma.$disconnect();
  if (!project) notFound();
  return project;
}

export default async function DynamicProjectPage({ params }: { params: { id: string } }) {
  const id = parseInt(params?.id);
  if (!id) notFound();
  const project = await findProject(id);
  return (
    <>
      <div className="mb-10">
        <Image src={pixel} alt={""} style={{ objectFit: "cover", height: "50vh" }} />
      </div>{" "}
      <Section>
        <div className="w-11/12">
          <Breadcrumbs>
            <Anchor href={"/"}>Home</Anchor>
            <Anchor href={"/projects"}>Projects</Anchor>
            <Anchor href={`/projects/${project.id}`}>{project.title}</Anchor>
          </Breadcrumbs>
          <Title className="mt-20 text-center mb-20">{project.title}</Title>
          <Grid lg={2} fullWidth className="mb-10 lg:mb-36">
            <div className="col-span-full lg:col-span-1">
              <header className="mb-5">
                <Title order={"h2"} size={"md"} color={"red"}>
                  Overview
                </Title>
                <Title order={"h3"}>Random title to introduce project</Title>
              </header>
              <p className="text-lg">{project.description}</p>
            </div>
            <Card className="col-span-full lg:col-span-1">
              <p className="text-center text-red-600 dark:text-red-500 mb-5">Testimonial</p>
              <p className="text-lg mb-5">{project.testimonial}</p>
              <strong>{project.customerName}</strong>
              <p className="text-red-600 dark:text-red-500 text-sm mt-5">{project.companyName}</p>
            </Card>
          </Grid>
          <Gallery images={project.images} />
        </div>
      </Section>
    </>
  );
}
