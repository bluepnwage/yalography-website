//Components
import { Gallery } from "@components/dynamic-project";
import { Section, Title, Anchor } from "@components/shared";
import prisma from "@lib/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";
import type { Metadata } from "next";

const findProject = cache(async (id: number) => {
  await prisma.$connect();
  const project = await prisma.projects.findUnique({ where: { id }, include: { images: true } });
  await prisma.$disconnect();

  return project;
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
      <Section className="mt-16">
        <div className="flex flex-col lg:flex-row gap-10 w-11/12 lg:w-3/5">
          <Anchor href={"/projects"} className="w-fit ">
            ←Back
          </Anchor>
          <div className="">
            <header className="mb-7">
              <Title size={"sm"} color={"red"} order={"h1"} className="text-sm">
                Overview
              </Title>
              <Title order={"h2"}>{project.title}</Title>
            </header>

            {project.testimonial && (
              <div className="space-y-4 mb-7 ">
                <p className="text-xl text-zinc-900 dark:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-quote"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"></path>
                    <path d="M19 11h-4a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h3a1 1 0 0 1 1 1v6c0 2.667 -1.333 4.333 -4 5"></path>
                  </svg>{" "}
                  {project.testimonial}
                </p>
                <div>
                  <span className="font-medium block mb-1">{project.customerName}</span>
                  <span className="text-red-600 dark:text-red-500">{project.companyName}</span>
                </div>
              </div>
            )}
            <p>{project.description}</p>
          </div>
        </div>
        <Gallery images={project.images} />
      </Section>
    </>
  );
}
