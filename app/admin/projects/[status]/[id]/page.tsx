import { Badge, Title, Breadcrumbs, Anchor } from "@components/shared";
import { Dropdown } from "@components/shared/Dropdown";
import { DotsVertical, Trash } from "@lib/icons";
import { Editor } from "@components/admin/projects/Editor";
import { Dropzone } from "@components/admin/projects/Dropzone";

import prisma from "@lib/prisma";
import { cache } from "react";
import { notFound } from "next/navigation";

const getProject = cache(async (id: number) => {
  await prisma.$connect();
  const project = await prisma.projects.findUnique({ where: { id }, include: { images: true } });
  await prisma.$disconnect();
  if (!project) notFound();
  return { ...project, createdAt: project.createdAt.toDateString() };
});

export default async function Page({ params }: { params: { status: "drafted" | "published"; id: string } }) {
  const id = parseInt(params.id);
  if (!id) notFound();

  const project = await getProject(id);

  return (
    <>
      <div className="border-b flex justify-between p-5 -mx-5 -mt-5 mb-5 border-zinc-300 dark:border-zinc-600">
        <div>
          <Title color={"red"} size={"sm"}>
            Project
          </Title>
          <div className="flex items-end gap-4">
            <Title order={"h2"}>My first project</Title>
            <Badge color={project.published ? "emerald" : "orange"}>
              {project.published ? "Published" : "Drafted"}
            </Badge>
          </div>
        </div>
        <Dropdown.Root>
          <Dropdown.Trigger>
            <button
              aria-label="Open menu"
              className="bg-zinc-700 rounded-full h-7 w-7 flex justify-center items-center"
            >
              <DotsVertical className="stroke-white" />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>Publish</Dropdown.Item>
            <Dropdown.Item>Share</Dropdown.Item>
            <Dropdown.Item>Copy link</Dropdown.Item>
            <Dropdown.Item>
              <Trash className="stroke-yellow-600 dark:stroke-yellow-500 inline-block mr-2" size={16} />
              Delete
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>
      </div>
      <Breadcrumbs>
        <Anchor href={"/admin/projects"}>Projects</Anchor>
        <Anchor className="capitalize" href={`/admin/projects/${params.status}`}>
          {params.status}{" "}
        </Anchor>
        <Anchor href={`/admin/projects/${params.status}/1`}>My first project</Anchor>
      </Breadcrumbs>
      <div className="mt-2">
        <Editor projectData={project} />
      </div>
    </>
  );
}
