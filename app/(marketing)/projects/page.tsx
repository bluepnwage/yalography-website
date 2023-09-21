import { Project } from "@/components/projects";
import { Section } from "@/components/shared";
import { Title } from "@aomdev/ui";

import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { transformImage } from "@/lib/transform-image";
import { formatDate } from "@/util/formate-date";

async function getProjects() {
  const projects = await prisma.projects.findMany({ where: { published: true } });

  return projects.map(project => ({
    ...project,
    thumbnail:
      project.thumbnailPublicId && project.thumbnailType
        ? transformImage("w_1500", project.thumbnailPublicId, project.thumbnailType)
        : project.thumbnail,
    createdAt: formatDate(project.createdAt)
  }));
}

export const metadata: Metadata = {
  title: "Projects"
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <>
      <Section className="mt-20">
        <header className="text-center mb-20 w-11/12 mx-auto">
          <Title order={1} className="font-heading font-medium mb-4 text-5xl text-gray-50">
            Projects
          </Title>
          <p className=" text-lg ">See how we deliver the best photoshoots sxm has to offer</p>
        </header>
        <div className="gap-16 grid grid-cols-6 lg:grid-cols-12 w-11/12">
          {projects.map(project => {
            return <Project project={project} key={project.id} />;
          })}
        </div>
      </Section>
    </>
  );
}
