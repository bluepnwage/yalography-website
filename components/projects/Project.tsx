import type { Projects } from "@prisma/client";
import { Title, Badge } from "@aomdev/ui";
import Link from "next/link";
import { SerializedProject } from "@/lib/prisma";

type PropTypes = {
  project: SerializedProject;
};

export function Project({ project }: PropTypes) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="flex flex-col col-span-full lg:col-span-4 gap-8 overflow-hidden group "
    >
      <figure className="relative overflow-hidden rounded-md aspect-video">
        <img
          src={project.thumbnail!}
          loading="lazy"
          decoding="async"
          alt={""}
          className="h-full w-full object-cover  group-hover:scale-105 duration-500 ease-out"
        />
      </figure>
      <div className=" space-y-4 ">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="dark:text-gray-300 text-gray-600 text-sm ">{project.createdAt}</span>

            <Badge className="w-fit h-fit truncate capitalize">{project.type}</Badge>
          </div>
          <Title
            order={2}
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
