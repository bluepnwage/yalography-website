import Image from "next/image";
import { Anchor } from "@components/shared";

import type { StaticImageData } from "next/image";

export interface PropTypes {
  image: StaticImageData;
  title: string;
  href: string;
  colSpan: "lg:col-span-4" | "lg:col-span-8";
  rowSpan: "lg:row-span-2" | "lg:row-span-1";
}

export function Project({ image, title, colSpan, rowSpan }: PropTypes) {
  return (
    <figure
      className={`${colSpan} ${rowSpan} col-span-full bg-black flex items-end p-4 group  relative  h-full w-full`}
    >
      <Image
        src={image}
        alt={""}
        width={20}
        height={20}
        className="h-full w-full object-cover  absolute top-0 left-0 duration-200 ease-out group-hover:opacity-20"
      />
      <figcaption className="space-y-5 z-10 opacity-0 group-hover:opacity-100 duration-200 ease-out">
        <p className="font-bold text-xl">{title}</p>
        <Anchor href={"/"}>View project →</Anchor>
      </figcaption>
    </figure>
  );
}
