import { Badge, Title, Breadcrumbs, Anchor } from "@components/shared";
import { Dropdown } from "@components/shared/Dropdown";
import { Button } from "@components/shared/Button";
import { Input } from "@components/shared/Input";
import { DotsVertical, Trash } from "@lib/icons";

import prisma from "@lib/prisma";
import { cache } from "react";
import { notFound } from "next/navigation";

const getProject = cache(async (id: number) => {
  await prisma.$connect();
  const project = await prisma.projects.findUnique({ where: { id } });
  await prisma.$disconnect();
  if (!project) notFound();
  return project;
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
            <Title order={"h2"}>{project.name}</Title>
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
              <DotsVertical />
            </button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item>{project.published ? "Unpublish" : "Publish"}</Dropdown.Item>
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
        <Anchor href={`/admin/projects/${params.status}/${project.id}`}>{project.name}</Anchor>
      </Breadcrumbs>
      <div className="flex flex-col mt-10 items-center">
        <form className="space-y-4">
          <Input label="Title" />
          <Input label="thumbnail" type={"file"} />
          <Input label="Description" />
          <Input label="Customer" />
          <Input label="Customer company" />
          <Input label="Testimonial" />
        </form>
        <Button intent="accept">Save</Button>
      </div>
    </>
  );
}
