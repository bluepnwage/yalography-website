import Image from "next/image";
import pixel from "@public/pixel.jpg";
import { Badge, Anchor, Card, Title } from "@components/shared";
import type { Projects } from "@prisma/client";

type PropTypes = {
  project: Projects;
};

export function Project({ project }: PropTypes) {
  return (
    <Card className="flex flex-col col-span-full shadow-md dark:shadow-none lg:col-span-3 gap-4 overflow-hidden ">
      <Anchor href={"/projects/random-project"} className="basis-1/3 -m-4">
        <figure className="w-full h-full">
          <Image src={pixel} alt={""} className="h-full w-full object-cover" />
        </figure>
      </Anchor>
      <div className="p-2 space-y-4">
        <div className="flex flex-wrap grow justify-between basis-2/3 items-center">
          <Title order={"h3"} className="text-2xl">
            {project.title}
          </Title>
          <Badge size={"sm"} color={"violet"}>
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
