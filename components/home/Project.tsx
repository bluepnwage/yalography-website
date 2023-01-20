import Image from "next/image";
import { Anchor } from "@components/shared";

import type { PinnedProject } from "@app/page";

export interface PropTypes {
  project: PinnedProject;
}

export function Project({ project }: PropTypes) {
  return (
    <figure
      className={`lg:col-span-4 lg:row-span-2 col-span-full bg-black flex items-end p-4 group  relative  h-full w-full`}
    >
      <Image
        src={project.thumbnail || ""}
        width={1200}
        height={900}
        alt={""}
        className="h-full w-full object-cover  absolute top-0 left-0 duration-200 ease-out group-hover:opacity-20"
      />
      <figcaption className="space-y-5 z-10 opacity-0 group-hover:opacity-100 duration-200 ease-out">
        <p className="font-bold text-xl">{project.title}</p>
        <Anchor href={`/projects/${project.id}`}>View project →</Anchor>
      </figcaption>
    </figure>
  );
}
