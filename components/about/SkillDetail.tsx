import { Title } from "@components/shared";
import Image from "next/image";
import type { StaticImageData } from "next/image";

type PropTypes = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  img: StaticImageData;
};

export function SkillDetail({ children, subTitle, title, img }: PropTypes) {
  return (
    <article className="flex gap-10 flex-col-reverse col-span-full lg:col-span-1 lg:flex-row lg:even:flex-row-reverse">
      <div className="basis-1/2 grow">
        <header className="mb-5 space-y-2">
          <Title order="h2" size={"md"} color="red">
            {title}
          </Title>
          <Title order="h3">{subTitle}</Title>
        </header>
        <p className="text-lg">{children}</p>
      </div>
      <figure className="basis-1/2 grow">
        <Image src={img} className="w-full h-full object-cover" alt={""} />
      </figure>
    </article>
  );
}
