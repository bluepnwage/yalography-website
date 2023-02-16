import Image from "next/image";
import { Badge, Anchor, Card, Title } from "@components/shared";
import type { Projects } from "@prisma/client";

type PropTypes = {
  project: Projects;
};

export function Project({ project }: PropTypes) {
  return (
    <Card className="flex flex-col col-span-full shadow-md dark:shadow-none lg:col-span-3 gap-4 overflow-hidden ">
      <Anchor href={`/projects/${project.id}`} className="basis-1/3 -m-4">
        <figure className="w-full h-full">
          <Image src={project.thumbnail!} alt={""} className="h-full w-full object-cover" />
        </figure>
      </Anchor>
      <div className="p-2 space-y-4">
        <div className="flex  grow justify-between basis-2/3 items-center">
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
