import Image from "next/image";
import Link from "next/link";
import type { PinnedProject } from "@/app/(marketing)/page";

export interface PropTypes {
  project: PinnedProject;
}

export function Project({ project }: PropTypes) {
  return (
    <Link
      className={`first-of-type:col-span-5 col-span-7 last-of-type:col-span-5 h-96 bg-black flex items-end p-4 group
        relative  w-full`}
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
        <figcaption className="z-10 block mt-auto opacity-0 group-hover:opacity-100 duration-200 ease-out">
          <p className="font-bold text-xl">{project.title}</p>
          <p className="text-yellow-600 dark:text-yellow-500">View project →</p>
        </figcaption>
      </figure>
    </Link>
  );
}
