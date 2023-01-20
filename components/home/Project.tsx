import Image from "next/image";
import { Anchor } from "@components/shared";
import Link from "next/link";
import type { PinnedProject } from "@app/page";

export interface PropTypes {
  project: PinnedProject;
}

export function Project({ project }: PropTypes) {
  return (
    <Link
      className={`lg:col-span-4 lg:row-span-2 last-of-type:lg:row-span-1 last-of-type:lg:col-span-8 col-span-full bg-black flex items-end p-4 group  relative  h-full w-full`}
      href={`projects/${project.id}`}
    >
      <figure className={`h-full w-full flex items-end`}>
        <Image
          src={project.thumbnail || ""}
          width={1200}
          height={900}
          alt={""}
          className="h-full w-full object-cover  absolute top-0 left-0 duration-200 ease-out group-hover:opacity-20"
        />
        <figcaption className="space-y-5 z-10 block mt-auto opacity-0 group-hover:opacity-100 duration-200 ease-out">
          <p className="font-bold text-xl">{project.title}</p>
          <Anchor href={`/projects/${project.id}`}>View project →</Anchor>
        </figcaption>
      </figure>
    </Link>
  );
}
