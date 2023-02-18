import Image from "next/image";
import { Badge, Anchor, Card, Title } from "@components/shared";
import type { Projects } from "@prisma/client";

type PropTypes = {
  project: Projects;
};

export function Project({ project }: PropTypes) {
  return (
    <Card className="flex flex-col col-span-full h-96 shadow-md dark:shadow-none lg:col-span-3 gap-4 overflow-hidden ">
      <Anchor href={`/projects/${project.id}`} className="basis-2/3 -m-4 ">
        <figure className="w-full h-full relative overflow-hidden">
          <Image
            src={project.thumbnail!}
            loading="lazy"
            decoding="async"
            alt={""}
            className="h-full w-full absolute top-0 left-0 object-cover blur-sm"
          />
          <Image
            src={project.thumbnail!}
            loading="lazy"
            decoding="async"
            alt={""}
            className="h-full w-full absolute z-10 object-contain"
          />
        </figure>
      </Anchor>
      <div className="p-2 space-y-4 basis-1/3">
        <div className="flex  grow justify-between  items-center">
          <Title order={"h3"} size={"lg"}>
            {project.title}
          </Title>
          <Badge size={"sm"} className="w-fit h-fit truncate" color={"violet"}>
            {project.type}
          </Badge>
        </div>
        <p className={"line-clamp-3"}>{project.description}</p>
        <Anchor href={`projects/${project.id}`} className="block w-fit">
          View project
        </Anchor>
      </div>
    </Card>
  );
}
