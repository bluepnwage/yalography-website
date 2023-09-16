import { Anchor } from "@/components/shared";
import type { Projects } from "@prisma/client";
import { Card, Title, Badge } from "@aomdev/ui";
import Link from "next/link";

type PropTypes = {
  project: Projects;
};

export function Project({ project }: PropTypes) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="flex flex-col col-span-full min-h-[300px]  lg:col-span-3 gap-4 overflow-hidden group "
    >
      <figure className="w-full h-full relative overflow-hidden rounded-md">
        <img
          src={project.thumbnail!}
          loading="lazy"
          decoding="async"
          alt={""}
          className="h-full w-full object-cover  group-hover:scale-105 duration-500 ease-out"
        />
      </figure>
      <div className=" space-y-4 basis-1/3">
        <div className="space-y-2">
          <Badge className="w-fit h-fit truncate capitalize">{project.type}</Badge>
          <Title
            order={3}
            className="group-hover:dark:text-primary-300 group-hover:text-primary-500 duration-200 ease-out"
          >
            {project.title}
          </Title>
        </div>
        <p className={"line-clamp-3"}>{project.description}</p>
      </div>
    </Link>
  );
}
