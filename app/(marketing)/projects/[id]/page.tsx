//Components
import { Gallery } from "@/components/dynamic-project";
import { Section, Breadcrumbs, Anchor, Grid } from "@/components/shared";
import { Title, Card, Badge } from "@aomdev/ui";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { cx } from "cva";
import { cache } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
import { formatDate } from "@/util/formate-date";
import { transformImage } from "@/lib/transform-image";

const findProject = cache(async (id: number) => {
  await prisma.$connect();
  const project = await prisma.projects.findUnique({ where: { id }, include: { images: true } });
  await prisma.$disconnect();

  return {
    ...project,
    thumbnail:
      project?.thumbnailPublicId && project.thumbnailType
        ? transformImage("w_2000", project.thumbnailPublicId, project.thumbnailType)
        : project?.thumbnail
  };
});

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = parseInt(params.id);
  if (!id) notFound();
  const project = await findProject(id);
  if (!project) notFound();
  return { title: project.title, description: project.description };
}

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
      <section className="mt-10 w-3/5 mx-auto ">
        <Link href={"/projects"} className="text-gray-300">
          ← Back to projects
        </Link>
        <div className="mx-auto">
          <Title order={1} className="font-heading font-medium text-gray-50 text-center">
            {project.title}
          </Title>
        </div>
        <figure className="overflow-hidden rounded-md">
          <img
            src={project.thumbnail || undefined}
            alt=""
            width={"100%"}
            height={"auto"}
            className="mx-auto"
          />
        </figure>
        <div className="w-4/5 mx-auto mt-16">
          <p className="text-lg text-gray-200 leading-relaxed">{project.description}</p>
          <Title order={2}>Testimonial</Title>
        </div>
        {/* <div className=" mt-10">
          <div className="flex gap-2 items-center">
            <Badge className="capitalize" size={"lg"}>
              {project.type}
            </Badge>
            <p className="text-gray-300">{formatDate(project.createdAt)}</p>
          </div>
          <Title order={1} className=" font-bold mb-10 font-heading  text-gray-50">
            {project.title}
          </Title>
          <Grid lg={project.testimonial ? 2 : 1} fullWidth className="mb-10 lg:mb-36">
            <div className={cx("col-span-full lg:col-span-1")}>
              <header className="mb-5">
                <Title order={2} className="font-heading font-medium">
                  Overview
                </Title>
              </header>
              <p className="text-lg text-gray-200 [width:clamp(36ch,90%,65ch)]">{project.description}</p>
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
        </div> */}
      </section>
    </>
  );
}
